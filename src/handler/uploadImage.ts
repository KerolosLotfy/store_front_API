import multer, { memoryStorage } from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//     destination: path.join(__dirname, "..", "..", "website", "images"),
//     filename: function (_req, file, cb) {
//         cb(null, file.originalname);
//     },
// });


const upload = multer({ storage:memoryStorage() });

const uploadImage = upload.single("image");

export default uploadImage;
