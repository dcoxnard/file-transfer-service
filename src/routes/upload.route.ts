import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { handleUpload } from "../controllers/upload.controller";

const router = Router();
router.post("/", asyncHandler(handleUpload));
export default router;
