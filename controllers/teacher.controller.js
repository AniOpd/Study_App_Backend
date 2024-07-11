import teacher from '../models/teacher.model.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import cookieParser from 'cookie-parser';


const secret = process.env.JWT_SECRET;

export const registerTeacher = async (req,res)=>{
    try{
        const {name,email,mobile,location,subject,experience,qualification,password} = req.body;
        const existingTeacher = await teacher.findOne({email});
        if(existingTeacher){
            return res.status(400).json({message:"Teacher already exists"});
        }else{
            const hashedPassword = await bcrypt.hash(password,12);
            const newTeacher = new teacher({
                name,
                email,
                mobile,
                location,
                subject,
                experience,
                qualification,
                password:hashedPassword
            })
            await newTeacher.save();
            res.status(201).json({message:"Teacher registered successfully"});
        }
    }catch(err){
        console.error(err);
    }
}

export const loginTeacher = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existingTeacher = await teacher.findOne({email});
        if(existingTeacher){
            const isPasswordCorrect = await bcrypt.compare(password,existingTeacher.password);
            if(isPasswordCorrect){
                const token = jwt.sign({email:existingTeacher.email,id:existingTeacher._id,isTeacher:true},secret,{expiresIn:"90d"});
                res.cookie("token",token).status(200).json({message:"Login successful"});
            }else{
                return res.status(404).json({message:"Credentials not valid"});
            }
        }else{
            return res.status(404).json({message:"Credentials not valid"});
        }
    }catch(e){
        console.error(e);
    }
}

export const logoutTeacher = async (req,res)=>{
    res.cookie("token","").status(200).json({message:"Logged out successfully"});
}

export const getTeacher = async (req,res)=>{
    try{
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({message:"Teacher not found"});
        }else{
            const teacherDetails = await teacher.findById(id);
            res.status(200).json({
                name:teacherDetails.name,
                email:teacherDetails.email,
                mobile:teacherDetails.mobile,
                location:teacherDetails.location,
                subject:teacherDetails.subject,
                experience:teacherDetails.experience,
                qualification:teacherDetails.qualification
            });
        }
    }catch(e){
        console.error(e);
    }
}


