import { Unit } from '../unit';

export class Participant {
    constructor(public name: string) {}

    static async getAll(unit: Unit): Promise<Participant[]> {
        const participants = await (await unit.prepare('SELECT * FROM Participant')).all();
        return participants.map(row => new Participant(row.name));
    }
}
