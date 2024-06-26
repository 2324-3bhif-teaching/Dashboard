import {Database, Statement} from "sqlite";
import { DB } from "./data";

export class Unit {

    private db: Database | null;
    private readonly statements: Statement[];
    private completed: boolean;

    private constructor(public readonly readOnly: boolean) {
        this.db = null;
        this.statements = [];
        this.completed = false;
    }

    private async init(): Promise<void> {
        this.db = await DB.createDBConnection();
        if (!this.readOnly) {
            await DB.beginTransaction(this.db);
        }
    }

    public async prepare(sql: string, bindings: any | null = null): Promise<Statement> {
        const stmt = await this.db!.prepare(sql);
        if (bindings !== null) {
            await stmt!.bind(bindings);
        }
        this.statements.push(stmt);
        return stmt!;
    }

    public async getLastRowId(): Promise<number> {
        const result = await this.db!.get('SELECT last_insert_rowid() as "id"');
        return result.id;
    }

    public async complete(commit: boolean | null = null): Promise<void> {
        if (this.completed) {
            return;
        }
        this.completed = true;

        if (commit !== null) {
            await (commit ? DB.commitTransaction(this.db!) : DB.rollbackTransaction(this.db!));
        } else if (!this.readOnly) {
            throw new Error('transaction has been opened, requires information if commit or rollback needed');
        }
        for (const stmt of this.statements) {
            await stmt.finalize();
        }
        await this.db!.close();
    }

    public static async create(readOnly: boolean): Promise<Unit> {
        const unit = new Unit(readOnly);
        await unit.init();
        return unit;
    }
}