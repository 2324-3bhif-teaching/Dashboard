import { Unit } from '../unit';

export class Race {
    constructor(public id: number, public name: string, public date: string, public duration: number) {}

    static async getAll(unit: Unit): Promise<Race[]> {
        const races = await (await unit.prepare('SELECT * FROM Race')).all();
        return races.map(row => new Race(row.id, row.name, row.date, row.duration));
    }

    static async create(unit: Unit, name: string, date: string, location: string, duration: number) {
        const stmt = await unit.prepare(
            'INSERT INTO Race (name, date, location, duration) VALUES (?, ?, ?, ?)',
            [name, date, location, duration]
        );
        await stmt.run();
        const id = await unit.getLastRowId();
        return { id, name, date, location, duration };
    }

    static async updateDuration(unit: Unit, raceId: number, newDuration: string): Promise<void> {
        const stmt = await unit.prepare(`
            UPDATE Race
            SET duration = ?
            WHERE id = ?
        `);
        await stmt.run(newDuration, raceId);
        await stmt.finalize();
    }
}
