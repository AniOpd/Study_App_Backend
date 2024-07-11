import student from "../models/Student.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const secret = process.env.JWT_SECRET;


export const registerStudent = async (req,res)=>{
    try{
        const {name,email,mobile,location,standard,password} = req.body;
        const existingStudent = await student.findOne({email});
        if(existingStudent){
            return res.status(400).json({message:"Student already exists"});
        }else{
            const hashedPassword = await bcrypt.hash(password,12);
            const newStudent = new student({
                name,
                email,
                mobile,
                location,
                standard,
                password:hashedPassword
            })
            await newStudent.save();
            res.status(201).json({message:"Student registered successfully"});
        }
    }catch(e){
        console.error(e);
    }
}

export const loginStudent = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const existingStudent = await student.findOne({email});
        if(existingStudent){
            const isPasswordCorrect = await bcrypt.compare(password,existingStudent.password);
            if(isPasswordCorrect){
                const token = jwt.sign({email:existingStudent.email,id:existingStudent._id,isTeacher:false},secret,{expiresIn:"90d"});
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