import express from 'express';
import jwt from 'jsonwebtoken';
import { addUser, findUser, validatePassword } from '../data/model/user';

export const userRouter = express.Router();

const secretKey = process.env.SECRET_KEY || 'default_secret_key';

userRouter.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (findUser(username)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    await addUser(username, password);
    res.status(201).json({ message: 'User registered successfully' });
});

userRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = findUser(username);

    if (!user || !(await validatePassword(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
});

