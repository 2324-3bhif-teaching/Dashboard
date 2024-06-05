import { ServiceBase } from './service';
import { Unit } from '../../data/unit';
import bcrypt from 'bcryptjs';

interface User {
    id?: number;
    username: string;
    password: string;
}

export class UserService extends ServiceBase {

    constructor(unit: Unit) {
        super(unit);
    }

    public async addUser(username: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const stmt = await this.unit.prepare(`
            INSERT INTO User (username, password) 
            VALUES (?, ?)`, [username, hashedPassword]);
        await this.executeStmt(stmt);
    }

    public async findUserByUsername(username: string): Promise<User | null> {
        const stmt = await this.unit.prepare('SELECT * FROM User WHERE username = ?', [username]);
        const user = await stmt.get();
        return ServiceBase.nullIfUndefined(user);
    }

    public async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }
}
