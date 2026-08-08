import axios, { Axios } from "axios";


const api = axios.create({
    baseURL :'http://localhost:3000',
    withCredentials : true
})

/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */

export const generateReport = async ({jobDescription, selfDescription, resumeFile}) =>{


     const formData = new FormData();
     formData.append("jobDescription", jobDescription)
     formData.append("selfDescription", selfDescription)
     formData.append("resume", resumeFile);


    const response = await api.post('/api/interview', formData, {
       headers: {
         'Content-Type': 'multipart/form-data'
       }
     })

     return response.data
}

/**
 *@description get all reports by interviewId
 */

 export const getInterviewReportById = async (interviewId) => {
   const response = await api.get(`/api/interview/report/${interviewId}`);
   return response.data;
 } 

 /**
 * @description Service to get all interview reports of logged in user.
 */


export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")

    return response.data
}

/**
 *@description genereate pdf using resume , jobDescription, selfDescrip[tion
 */

export const generateResumePdf = async ({ interviewId }) => {
  const response = await api.get(
    `/api/interview/resume/pdf/${interviewId}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};
