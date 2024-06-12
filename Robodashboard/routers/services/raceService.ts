import { Race } from '../../data/model/race';
import { Participant } from '../../data/model/participant';
import {ServiceBase} from "./service";
import {Unit} from "../../data/unit";

export class RaceService extends ServiceBase{
    static async getAllRaces(unit: Unit): Promise<Race[]> {
        try {
            const racesData = await Race.getAll(unit);
            const races: Race[] = racesData.map(race => new Race(race.id, race.name, race.date, race.location));
            return races;
        } catch (error) {
            console.error('Error retrieving races:', error);
            throw new Error('Internal server error');
        }
    }

    static async getAllParticipants(unit: Unit): Promise<Participant[]> {
        try {
            const participantsData = await Participant.getAll(unit);
            const participants: Participant[] = participantsData.map(participant =>
                new Participant(participant.id, participant.raceId, participant.name, participant.age)
            );
            return participants;
        } catch (error) {
            console.error('Error retrieving participants:', error);
            throw new Error('Internal server error');
        }
    }
}
