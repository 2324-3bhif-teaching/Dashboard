import express, { Request, Response } from 'express';
import { RaceService } from './services/raceService';
import { Unit } from '../data/unit';
import { Race } from '../data/model/race';
import { Participant } from '../data/model/participant';

export const dashboardRouter = express.Router();

dashboardRouter.get('/races', async (req: Request, res: Response) => {
    const unit = await Unit.create(true);
    try {
        const racesData = await Race.getAll(unit);
        const races: Race[] = racesData.map(race => new Race(race.raceId, race.date, race.raceTimes));
        res.json(races);
    } catch (error) {
        console.error('Error retrieving races:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await unit.complete();
    }
});

dashboardRouter.get('/participants', async (req: Request, res: Response) => {
    const unit = await Unit.create(true);
    try {
        const participantsData = await Participant.getAll(unit);
        const participants: Participant[] = participantsData.map(participant =>
            new Participant(participant.name)
        );
        res.json(participants);
    } catch (error) {
        console.error('Error retrieving participants:', error);
        res.status(500).json({ error: 'Internal server error' });
    } finally {
        await unit.complete();
    }
});

dashboardRouter.post('/races', async (req: Request, res: Response) => {
    const { raceId, date, raceTime, names } = req.body;
    try {
        const newRace = new Race(raceId, date, raceTime);

        const participants: Participant[] = [];

        let splitNames = names.split(";");

        for (const name of splitNames) {
            participants.push(new Participant(name));
        }

        await RaceService.addRace(newRace, participants);
        res.status(201).json(newRace);
    } catch (error) {
        console.error('Error adding race:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
