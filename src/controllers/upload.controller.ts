import { Request, Response } from "express";

export const handleUpload = async (req: Request, res: Response) => {
  res.json({ message: "Upload endpoint hit" });
};
