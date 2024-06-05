import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from './services/userService';
import { Unit } from '../data/unit';
import { authenticateJWT } from './middleware/userAuth';
import bcrypt from "bcryptjs";

const router = Router();
const secretKey = process.env.SECRET_KEY || 'default_secret_key';

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const unit = await Unit.create(false);
    const userService = new UserService(unit);

    try {
        if (await userService.findUserByUsername(username)) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        await userService.addUser(username, password);
        await unit.complete(true);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        await unit.complete(false);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const unit = await Unit.create(true);
    const userService = new UserService(unit);

    try {
        const user = await userService.findUserByUsername(username);

        if (!user || !(await userService.validatePassword(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await unit.complete();
    }
});

router.get('/profile', authenticateJWT, async (req, res) => {
    const { username } = (req as any).user;

    const unit = await Unit.create(true);
    const userService = new UserService(unit);

    try {
        const user = await userService.findUserByUsername(username);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    } finally {
        await unit.complete();
    }
});

router.put('/change-password', authenticateJWT, async (req, res) => {
    const { username } = (req as any).user;
    const { oldPassword, newPassword } = req.body;

    const unit = await Unit.create(false);
    const userService = new UserService(unit);

    try {
        const user = await userService.findUserByUsername(username);

        if (!user || !(await userService.validatePassword(oldPassword, user.password))) {
            return res.status(400).json({ message: 'Invalid old password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const stmt = await unit.prepare('UPDATE User SET password = ? WHERE username = ?', [hashedPassword, username]);
        await userService.executeStmt(stmt);

        await unit.complete(true);
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        await unit.complete(false);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { router as userRouter };
