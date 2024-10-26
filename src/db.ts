import mongoose from "mongoose";

const connectDb = async (mongoDbUrl: string) => {
  try {
    const res = await mongoose.connect(mongoDbUrl!, {
      dbName: "health-management",
    });
    console.log("successfully connected to mongodb");
  } catch (err) {
    console.log("error connecting mongodb");
  }
};

export default connectDb;
