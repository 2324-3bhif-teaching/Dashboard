import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { addUser, findUser, validatePassword } from '../data/model/user';

const router = Router();
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (findUser(username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    await addUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = findUser(username);

    if (!user || !(await validatePassword(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

export { router as userRouter };
