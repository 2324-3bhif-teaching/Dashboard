import {Race} from '../../data/model/race';
import {Participant} from '../../data/model/participant';
import {ServiceBase} from "./service";
import {Unit} from "../../data/unit";
import {DbService} from "./dbService";

export class RaceService extends ServiceBase{
    static async getAllRaces(unit: Unit): Promise<Race[]> {
        try {
            const racesData = await Race.getAll(unit);
            return racesData.map(race => new Race(race.raceId, race.date, race.raceTimes));
        } catch (error) {
            console.error('Error retrieving races:', error);
            throw new Error('Internal server error');
        }
    }

    static async getAllParticipants(unit: Unit): Promise<Participant[]> {
        try {
            const participantsData = await Participant.getAll(unit);
            return participantsData.map(participant =>
                new Participant(participant.name)
            );
        } catch (error) {
            console.error('Error retrieving participants:', error);
            throw new Error('Internal server error');
        }
    }

    static async addRace(race: Race, participants: Participant[]) {
        const unit = await Unit.create(false);
        try {
            await DbService.create(unit, race, participants);
            await unit.complete(true);
            return race;
        } catch (error) {
            await unit.complete(false);
            throw error;
        }
    }
}
