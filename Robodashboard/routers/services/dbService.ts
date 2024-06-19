import {Unit} from "../../data/unit";
import {Participant} from "../../data/model/participant";
import {Race} from "../../data/model/race";

export class DbService {
    static async create(unit: Unit, race: Race, participants: Participant[]) {
        let stmt = await unit.prepare(
            'INSERT INTO Race (date, raceTimes) VALUES (?, ?)',
            [race.date, race.raceTimes]
        );

        let newRace = await stmt.run();
        const newRaceId = newRace.lastID;

        let newParticipant;
        let newParticipantId;

        // This looks very unoptimized.
        // If you know how to improve it, please do so.
        for (const participant of participants) {
            stmt = await unit.prepare(
                'INSERT INTO Participant (name) VALUES (?)',
                participant.name
            );

            newParticipant = await stmt.run();
            newParticipantId = newParticipant.lastID;

            stmt = await unit.prepare(
                'INSERT INTO Race_Participant (raceId, participantId) VALUES (?, ?)',
                [newRaceId, newParticipantId]
            );
        }
    }
}