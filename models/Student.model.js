import mongoose from "mongoose";

const schema = mongoose.Schema;

const studentSchema = new schema({
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
    },
    location:{
        type:String,
        required:true
    },
    standard:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const Student = mongoose.model('Student',studentSchema);
export default Student;