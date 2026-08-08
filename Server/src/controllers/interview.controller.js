import {generateInterviewReport, generateResumePdf} from '../services/ai.services.js'
import InterviewReportSchemaModel from '../Model/interview.model.js'
import { PDFParse } from 'pdf-parse'

/**
 *@description generate the interview report from ai
 */

async function interviewReportController(req, res) {
    try {
        const file = Array.isArray(req.files) ? req.files[0] : req.file;
        if (!file?.buffer) {
            return res.status(400).json({
                success: false,
                message: 'Resume file is required.',
            });
        }

        const pdfResult = await new PDFParse(Uint8Array.from(file.buffer)).getText();
        const resumeContent = typeof pdfResult === 'string' ? pdfResult : pdfResult?.text;
        if (typeof resumeContent !== 'string' || !resumeContent.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Unable to parse resume text from uploaded file.',
                debug: typeof pdfResult === 'object' ? Object.keys(pdfResult) : typeof pdfResult,
            });
        }

        const { selfDescription, jobDescription } = req.body;

        const interviewReportByAi = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
            jobDescription,
        });
        const interviewReport = await InterviewReportSchemaModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription,
            jobDescription,
            ...interviewReportByAi,
        });

        return res.status(201).json({
            message: 'Interview Report Generated Successfully',
            interviewReport,
        });
    } catch (error) {
        console.error('interviewReportController error:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to generate interview report.',
            error: error.message,
        });
    }
}

/**
 * @description fetch all report using interviewId
 */

async function getinterviewReport(req,res){
    const { interviewId } = req.params;
    if(!interviewId){
      return res.status(400).json({ message: "Please provide the Id" });
    }

    const interviewReport = await InterviewReportSchemaModel.findOne({ _id: interviewId, user: req.user.id });
    if(!interviewReport){
       return res.status(404).json({ message: "No Report Available" });
    }
    return res.status(200).json({ message: "Success", interviewReport });
}

/**
 *@description get all the report of specific user
 */

 async function getAllInterviewReports(req,res){
    const interviewReports = await InterviewReportSchemaModel.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -technicalQuestions -behavioralQuestions -skillGaps -preprationPlan -__v");

    return res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports,
    });
 }


 /**
  *@description generate resume pdf using  Ai
  */
async function generateResumePdfController(req,res){

   const { interviewId } = req.params

    const interviewReport = await InterviewReportSchemaModel.findById(interviewId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }
    const {resume, jobDescription, selfDescription} = interviewReport;
    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`
    })

    res.send(pdfBuffer)
}



export { interviewReportController, getinterviewReport ,getAllInterviewReports, generateResumePdfController}