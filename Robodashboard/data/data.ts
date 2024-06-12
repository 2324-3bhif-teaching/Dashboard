import { Database as Driver} from "sqlite3";
import { open, Database } from "sqlite";

export const dbFileName = 'dashboard.db';

export class DB {
    private static initialTableCreationDone: boolean = false;

    public static async createDBConnection(): Promise<Database> {
        const db = await open({
            filename: `./${dbFileName}`,
            driver: Driver,
        });
        await db.get('PRAGMA foreign_keys = ON');

        await DB.ensureTablesCreated(db);

        return db;
    }

    public static async beginTransaction(connection: Database): Promise<void> {
        await connection.run('begin transaction;');
    }

    public static async commitTransaction(connection: Database): Promise<void> {
        await connection.run('commit;');
    }

    public static async rollbackTransaction(connection: Database): Promise<void> {
        await connection.run('rollback;');
    }

    private static async ensureTablesCreated(connection: Database): Promise<void> {
        if (this.initialTableCreationDone) {
            return;
        }

        await connection.run(`
            CREATE TABLE IF NOT EXISTS Race (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                date TEXT NOT NULL,
                duration INTEGER NOT NULL, 
            );
        `);

        await connection.run(`
            CREATE TABLE IF NOT EXISTS Robot (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                type TEXT NOT NULL,
                manufacturer TEXT NOT NULL,
                race_id INTEGER NOT NULL,
                user_id INTEGER NOT NULL, 
                FOREIGN KEY (race_id) REFERENCES Race(id)
            );
        `);

        await connection.run(`
            CREATE TABLE IF NOT EXISTS User (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                device_id TEXT NOT NULL 
            );
        `);

        await connection.run(`
            CREATE TABLE IF NOT EXISTS RaceLog (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                race_id INTEGER NOT NULL,
                robot_id INTEGER NOT NULL,
                event TEXT NOT NULL,
                timestamp TEXT NOT NULL,
                FOREIGN KEY (race_id) REFERENCES Race(id),
                FOREIGN KEY (robot_id) REFERENCES Robot(id)
            );
        `);

        await connection.run(`
            CREATE TABLE IF NOT EXISTS RaceResult (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                race_id INTEGER NOT NULL,
                robot_id INTEGER NOT NULL,
                time TEXT NOT NULL,
                status TEXT NOT NULL, 
                FOREIGN KEY (race_id) REFERENCES Race(id),
                FOREIGN KEY (robot_id) REFERENCES Robot(id)
            );
        `);

        this.initialTableCreationDone = true;
    }
}