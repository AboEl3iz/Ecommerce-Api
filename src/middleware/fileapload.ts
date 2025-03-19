import path from "path";
import multer from "multer";
const imagepath = path.join(__dirname , "../image");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, imagepath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null,  uniqueSuffix)
    }
  })

  // File filter (accept only images)
const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: Error, arg1: boolean) => void) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  };
  const multerupload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
    fileFilter: fileFilter,
  });

  export { multerupload };