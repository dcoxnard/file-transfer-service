import dotenv from "dotenv";
dotenv.config();
export const config = {
  port: process.env.PORT || 3000,
  s3Bucket: process.env.S3_BUCKET || "",
};
