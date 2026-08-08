import mongoose from "mongoose";

/**
 * JobDescription : Stirng
 * jobTitle : String
 * jobLocation : String
 * resume : String
 * selfDescription : String
 * matchScore : Number
 * technicalquestions : [
 *.      question,
 *       answer
 *        intention
 * ]
 * BehavioralQuestions : [{
 *      question,
 *       answer
 *       intention
 * }]
 * skillGaps : [{
 *      skill,
 *      severity
 * }]
 * preprationplan : [{
 *       day,
 *      focous ,
 *       paln
 * }]
 */

const technicalQuestionsSchema = new mongoose.Schema({
    questions :{
        type : String,
        required : [true, "Please provide the questions"]
    },
    intention :{
        type : String,
        required : [true, "Please provide the intention"]
    },
    answer :{
        type : String,
        required : [true, "Please provide the answer"]
    }
}, {id : false})

const behavioralQuestionsSchema = new mongoose.Schema({
    questions :{
        type : String,
        required : [true, "Please provide the questions"]
    },
    intention :{
        type : String,
        required : [true, "Please provide the intention"]
    },
    answer :{
        type : String,
        required : [true, "Please provide the answer"]
    }
}, {id : false})

const skillgapsSchema = new mongoose.Schema({
    skill:{
        type : String,
         required: [ true, "Skill is required" ]
    },
    severity: {
        type: String,
        enum: [ "low", "medium", "high" ],
        required: [ true, "Severity is required" ]
    }
}, {id : false})

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [ true, "Day is required" ]
    },
    focus: {
        type: String,
        required: [ true, "Focus is required" ]
    },
    tasks: [ {
        type: String,
        required: [ true, "Task is required" ]
    } ]
})

 const InterviewReportSchema = new mongoose.Schema({
    jobDescription:{
        type: String,
        required: true
    },
    resume:{
        type: String,
    },
   title:{
        type: String,
        required: true
    },
    selfDescription:{
        type: String,
        required: true
    },
    matchScore:{
        type: Number,
        required: true
    },
    technicalQuestions:[technicalQuestionsSchema],
    behavioralQuestions:[behavioralQuestionsSchema],
    skillGaps:[skillgapsSchema],
    preparationPlan:[ preparationPlanSchema ],
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'userModel'
    }
    
 },{timeStamp : true})


 const InterviewReportSchemaModel = mongoose.model("InterviewReportSchemaModel",InterviewReportSchema );
 export default InterviewReportSchemaModel ;