
import { model, Schema } from "mongoose";

const leaveSchema = new Schema ({
    leaveType:{
        type:String,
        required:true
        },
        startDate:{
            type:String,
            required:true,
            unique:true
        },
        endDate:{
            type:String,
            required:true
        },
        duration:{
            type:String,
            required:true
        },
        resumptionDate:{
            type:String,
            required:true
        },
        reliefOfficer:{
            type:String,
            required:true
        },
        reasonForLeave:{
            type:String,
            required:true
        },
        userEmail:{
            type:String,
            required:true
        }
    },{timestamps:true} );


const Leave = model("Leave",leaveSchema)
export default Leave

 
  