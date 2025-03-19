
const router = require("express").Router();
const {multerupload} = require("../middleware/fileapload");
import {Request , Response} from "express";
router.post("/", multerupload.single("image"), (req : Request , res : Response) => {
      if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ message: "File uploaded successfully", file: req.file.filename });
});

export default router