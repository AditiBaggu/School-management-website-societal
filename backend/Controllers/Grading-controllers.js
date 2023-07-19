const HttpError = require("../Models/http-error");
const { validationResult } = require("express-validator");
const Grading = require("../Models/Gradings");

const mongoose = require("mongoose");

const getGrades=async(req,res,next)=>{
    let grades;
    try{
        grades= await Grading.find()
    }catch(err){
        const error=new HttpError("Something went wrong, could not fetch the grades, please try again ",500)
        return next(error)
    }
    res.json({grades:grades})
}
const getGradesById=async(req,res,next)=>{
    const id=req.params.id
    let grades;
    try{
        grades=await Grading.findOne({_id:id})
    }catch(err){
        const error=new HttpError("Something went wrong, could not fetch the grades with the given id, please try again ",500)
        return next(error)
    }
    res.json({grades:grades})
}
const getGradesByClass=async(req,res,next)=>{
    const classNumber=req.params.classNumber
    let grades;
    try{
        grades=await Grading.find({classNumber:classNumber})
    }catch(err){
        const error=new HttpError("Something went wrong, could not fetch the grades with the given id, please try again ",500)
        return next(error)
    }
    res.json({grades:grades})
}
const createGrades=async(req,res,next)=>{
    const errors=validationResult(req)
   
    if(!errors.isEmpty()){
        return next(
            new HttpError("Invalid inputs, please try again",422)
        )
    }
    const {student,studentName,rollNumber,examName,classNumber,subjects,totalMarks,percentage}=req.body
    const createdGrades=new Grading({
        student,
        studentName,
        rollNumber,
        examName,
        classNumber,
        subjects,
        totalMarks,
        percentage
    })
try{
    await createdGrades.save()
}catch(err){
    console.log(err)
    const error=new HttpError("Something went wrong, could not save results,please try again",500)
    return next(error)
}
res.status(201).json({grades:createdGrades})
}
exports.getGrades=getGrades
exports.getGradesById=getGradesById
exports.getGradesByClass=getGradesByClass
exports.createGrades=createGrades