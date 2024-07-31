import express from 'express';
import {registerStudent,loginStudent,verifyStudent} from '../controllers/student.controller.js';
const router = express.Router();

router.post('/register',registerStudent);
router.post('/login',loginStudent);
router.get('/verify/:email',verifyStudent);

export default router;