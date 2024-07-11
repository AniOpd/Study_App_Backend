import {loginTeacher,registerTeacher,logoutTeacher,getTeacher} from '../controllers/teacher.controller.js';
import express from 'express';
const router = express.Router();

router.post('/register',registerTeacher);
router.post('/login',loginTeacher);
router.get('/logout',logoutTeacher);
router.get('/:id',getTeacher);


export default router;