import {loginTeacher,registerTeacher,logoutTeacher,getTeacher,GetTeachers} from '../controllers/teacher.controller.js';
import express from 'express';
import upload from '../middlewares/multer.js';
const router = express.Router();

router.post('/register',upload,registerTeacher);
router.post('/login',loginTeacher);
router.get('/logout',logoutTeacher);
router.get('/:id',getTeacher);
router.get('/',GetTeachers);


export default router;