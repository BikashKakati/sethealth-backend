import mongoose from "mongoose";

const doctorProfileSchema = new mongoose.Schema({
    degree:{
        type:String,
        require:[true,"Degree is required"],
    },
    speciality:{
        type:String,
        unique:[true,"Phone number is already exist"],
        require:[true,"Phone number required"],
    },
    email:{
        type:String,
        unique:[true,"Email is already exist"],
        require:[true,"Email is required"],
    },
    password:{
        type:String,
        require:[true,"Email is required"],
        select:false,
    },
    status:{
        type:Boolean,
        default:true,
    },

},{timestamps:true})

export const DoctorUser = mongoose.model("doctorProfile",doctorProfileSchema);