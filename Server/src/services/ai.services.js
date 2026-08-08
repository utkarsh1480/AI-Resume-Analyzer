import { GoogleGenAI } from "@google/genai";
import { z } from 'zod';
import puppeteer from 'puppeteer';
const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});

const interviewReportSchema = z.object({
    matchScore : z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
technicalQuestions: z.array(z.object({
        questions: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
behavioralQuestions: z.array(z.object({
        questions: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),

})
async function generateInterviewReport({ resume, selfDescription, jobDescription }) {


    const prompt = `
You are an experienced technical interviewer and ATS evaluator.

Evaluate the candidate ONLY using the information provided below.

Candidate Resume:
${resume || "Not Provided"}

Self Description:
${selfDescription?.trim() || "Not Provided"}

Job Description:
${jobDescription?.trim() || "Not Provided"}

IMPORTANT SCORING RULES:

1. DO NOT use any prior knowledge, assumptions, or previous conversation.
2. Evaluate ONLY based on the supplied resume, self description, and job description.
3. If the Job Description is missing or empty:
   - Do NOT assume any role or technology.
   - Maximum possible match score is 20/100.
   - Clearly mention that accurate evaluation is not possible without a job description.
4. If the Self Description is missing or empty:
   - Do not give any additional credit.
   - Evaluate only from the resume.
5. If both Resume and Job Description are missing or contain almost no useful information:
   - Return a match score between 0 and 10.
6. Never inflate scores.
7. A score above 80 should be given only when the resume strongly matches the job description.
8. If there are major missing skills, reduce the score accordingly.
9. If the resume has very little relevant information, the score should generally be below 40.
10. Be strict and objective. Do not reward missing information.

Generate:
- matchScore (0-100)
- summary
- strengths
- weaknesses
- technicalQuestions
- behavioralQuestions
- skillGaps
- preparationPlan

Return ONLY valid JSON matching the required schema.
`;

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: interviewReportSchema.toJSONSchema(),
        }
    })
   return JSON.parse(response.text);
}

async function generatePdfFromHtml({htmlContent}){
    // Accept string-like mistakes: if caller passed the raw string instead of an object
    if (typeof htmlContent !== 'string' && typeof htmlContent === 'object' && htmlContent?.html) {
        htmlContent = htmlContent.html;
    }

    if (typeof htmlContent !== 'string' || !htmlContent.trim()) {
        throw new Error('Empty or invalid htmlContent provided to generatePdfFromHtml');
    }

    // Some callers or upstream generators accidentally pass the literal string "undefined"
    // into the HTML; strip those tokens so the PDF doesn't render the word "undefined".
    if (htmlContent.includes('undefined')) {
        console.warn('generatePdfFromHtml: removing stray "undefined" tokens from HTML');
        htmlContent = htmlContent.replace(/undefined/g, '');
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
    await page.setContent(htmlContent, {
        waitUntil: "domcontentloaded",
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const pdfBuffer = await page.pdf({
        format: "A4",
        margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm",
        },
    });
    await browser.close();

    return pdfBuffer;
}

async function generateResumePdf({resume, jobDescription, selfDescription}){
     
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                         Job Description: ${jobDescription}
                        Self Description: ${selfDescription}
                       

                        the response should be a JSON object with a single field "html" which    contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.`

    const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: resumePdfSchema.toJSONSchema(),
        }
    })
        const jsonContent = JSON.parse(response.text)
        if (!jsonContent || typeof jsonContent.html !== 'string' || !jsonContent.html.trim() || jsonContent.html.trim() === 'undefined') {
            console.error('generateResumePdf: AI returned invalid html:', response.text);
            throw new Error('AI did not return valid HTML for resume generation');
        }

        const pdfBuffer = await generatePdfFromHtml({ htmlContent: jsonContent.html })
        return pdfBuffer;

}


export { generateInterviewReport,generateResumePdf }