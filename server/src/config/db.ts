import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(mongoUri);
    console.log("Database Connected Successfully");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Error";

    console.error("Database Connection Error:", message);
    process.exit(1);
  }
};
export default connectDB;
