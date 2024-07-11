import mongoose from "mongoose";

const schema = mongoose.Schema;

const teacherSchema = new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Teacher = mongoose.model('Teacher',teacherSchema);

export default Teacher;