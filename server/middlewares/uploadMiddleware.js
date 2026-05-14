import multer from "multer";
import path from "path";

// storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName =
      Date.now() + "-" + file.originalname;

    cb(null, uniqueName);
  }
});

// file filter
const fileFilter = (req, file, cb) => {

  const allowedFileTypes = [
    "application/pdf",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF and DOCX files are allowed"),
      false
    );
  }
};

// multer middleware
const upload = multer({
  storage,
  fileFilter
});

export default upload;