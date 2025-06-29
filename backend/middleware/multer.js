import multer  from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");   //file name should exact same like in input file upload name