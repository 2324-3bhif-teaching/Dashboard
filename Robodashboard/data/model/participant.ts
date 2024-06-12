import { Unit } from '../unit';

export class Participant {
    constructor(public id: number, public raceId: number, public name: string, public age: number) {}

    static async getAll(unit: Unit): Promise<Participant[]> {
        const participants = await (await unit.prepare('SELECT * FROM Participant')).all();
        return participants.map(row => new Participant(row.id, row.race_id, row.name, row.age));
    }
}
