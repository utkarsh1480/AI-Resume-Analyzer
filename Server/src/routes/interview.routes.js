import express from "express";
const interviewRouter = express.Router();
import { interviewReportController , getinterviewReport, getAllInterviewReports, generateResumePdfController} from "../controllers/interview.controller.js";
import authenticate from '../middleware/auth.middleware.js'
import { uploadFile } from "../middleware/upload.middleware.js";


/**
 * @route /api/interview/
 * @description generate a report basis of resume , selfdescription and jobDescription
 * @access private
 */

interviewRouter.post('/', authenticate, uploadFile.any(), interviewReportController)


/**
 * @route /api/report/interview
 * @description get interview Report using interviewId
 * @access private
 */

interviewRouter.get('/report/:interviewId', authenticate, getinterviewReport)


/**
 * @route /api/interview
 * @description fetch all the report of logedin user
 * @access  private
 */

interviewRouter.get('/', authenticate, getAllInterviewReports)


/**
 *@route /api/interview/resume.pdf
 @access public
 */

interviewRouter.get('/resume/pdf/:interviewId',authenticate,generateResumePdfController)

export default interviewRouter;