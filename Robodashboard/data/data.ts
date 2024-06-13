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
                raceId INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL,
                raceTimes TEXT NOT NULL 
            );
        `);

        console.log('Created Race table');

        await connection.run(`
            CREATE TABLE IF NOT EXISTS Participant (
                participantId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            );
        `);

        console.log('Created Participant table')

        await connection.run(`
            CREATE TABLE IF NOT EXISTS Race_Participant (
                raceId INTEGER NOT NULL,
                participantId INTEGER NOT NULL,
                PRIMARY KEY (raceId, participantId),
                FOREIGN KEY (raceId) REFERENCES race(raceId),
                FOREIGN KEY (participantId) REFERENCES participant(participantId)
            );
        `);

        console.log('Created Race_Participant table');

        this.initialTableCreationDone = true;
    }
}