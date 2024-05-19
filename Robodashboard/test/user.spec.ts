import bcrypt from 'bcryptjs';
import { addUser, findUser, validatePassword } from '../data/model/user';

jest.mock('bcryptjs');

describe('User Functions', () => {
    const users = [
        { username: 'testuser', password: 'hashedpassword' }
    ];

    beforeAll(() => {
        (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');
        (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    });

    describe('addUser', () => {
        it('should add a new user with hashed password', async () => {
            await addUser('newuser', 'password');

            const user = findUser('newuser');
            expect(user).toBeDefined();
            expect(user!.password).toBe('hashedpassword');
        });
    });

    describe('findUser', () => {
        it('should return undefined for a non-existing user', () => {
            const user = findUser('nonexistent');
            expect(user).toBeUndefined();
        });
    });

    describe('validatePassword', () => {
        it('should return true for valid password', async () => {
            const isValid = await validatePassword('password', 'hashedpassword');
            expect(isValid).toBe(true);
        });

        it('should return false for invalid password', async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);
            const isValid = await validatePassword('wrongpassword', 'hashedpassword');
            expect(isValid).toBe(false);
        });
    });
});
