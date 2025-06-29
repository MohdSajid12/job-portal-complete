import express from "express";
import  {register ,login ,logout ,updateProfile} from "../controllers/userController.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.route('/register').post( singleUpload ,register);     // POST /api/v1/user/register
router.route('/login').post(login);           // POST /api/v1/user/login
router.route('/logout').post(logout);         // POST /api/v1/user/logout
router.route('/profile/update').post(singleUpload,isAuthenticated ,updateProfile);   //POST /api/v1/user/profile/update (auth protected)

export default router;
