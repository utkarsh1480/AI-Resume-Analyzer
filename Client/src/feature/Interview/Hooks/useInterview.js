import { useContext, useEffect } from "react";
import { interviewContext } from "../Interview.context.jsx";
import {
  generateReport as generateReportService,
  getInterviewReportById,
  getAllInterviewReports,
  generateResumePdf
} from "../Services/interview.api.js";
import { useParams } from "react-router-dom";

export const useInterviewHook = () => {
  const context = useContext(interviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;
  let response = null;

  /**
   *@description also setReport to generated report
   * @returns interview report
   */
  const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
    setLoading(true);
    try {
      response = await generateReportService({ jobDescription, selfDescription, resumeFile });
      setReport(response.interviewReport);
      return response.interviewReport;
    } catch (err) {
      console.error('generateReport error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetch the report by reportId
   */
  const getReportById = async (id) => {
    if (!id) return null;
    setLoading(true);
    try {
      response = await getInterviewReportById(id);
      setReport(response.interviewReport);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReport;
  };

  /**
   *@description get all Reports
   */
  const getReport = async () => {
    setLoading(true);
    try {
      response = await getAllInterviewReports();
      setReports(response.interviewReports);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    return response?.interviewReports;
  };

  /**
   *@description get Ai generated Resume 
   */

  const generateResmue = async (interviewId)=>{
      setLoading(true);
     try {
     const response = await generateResumePdf({interviewId});
     const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
     } catch (error) {
      console.log(error)
     }finally{
      setLoading(false)
     }
  }

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    } else {
      getReport();
    }
  }, [interviewId]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReport,
   generateResmue
  };
};