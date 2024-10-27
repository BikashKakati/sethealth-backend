import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      require: [true, "service name is required"],
      unique: [true, "service name already exist"],
    },
    serviceType: {
      type: [
        {
          name: String,
          availability: {
            type: Boolean,
            default: false,
          },
        },
      ],
      // already defined service types, no need to send from frontend for every request...
      default:[
        {name:"Video consultancy"},
        {name:"Home visit"},
        {name:"Clinic visit"}
      ]
    },
    symptoms:{
        type:[String],
        minlength:[1,"Atlead one symptoms requried"],
    },
    
  },
  { timestamps: true }
);

export const Services = mongoose.model("services", servicesSchema);
