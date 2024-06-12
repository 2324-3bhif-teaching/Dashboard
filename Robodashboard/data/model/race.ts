import { Unit } from '../unit';

export class Race {
    constructor(public id: number, public name: string, public date: string, public location: string) {}

    static async getAll(unit: Unit): Promise<Race[]> {
        const races = await (await unit.prepare('SELECT * FROM Race')).all();
        return races.map(row => new Race(row.id, row.name, row.date, row.location));
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
