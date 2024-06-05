import bcrypt from 'bcryptjs';

interface User {
    username: string;
    password: string;
}

const users: User[] = [];

export const addUser = async (username: string, password: string): Promise<void> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
};

export const findUser = (username: string): User | undefined => {
    return users.find(user => user.username === username);
};

export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword);
};
