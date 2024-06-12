import { Server, Socket } from 'socket.io';
import { Unit } from '../../data/unit';
import { Race } from '../../data/model/race';

let io: Server;
let raceDurations: Record<number, NodeJS.Timeout> = {};

export function initWebSocket(server: any) {
    io = new Server(server);

    io.on('connection', (socket: Socket) => {
        console.log('Client connected');

        // Handle client disconnection
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });

    // Handle update race duration event from client
    io.on('updateRaceDuration', async ({ raceId, newDuration }: { raceId: number, newDuration: string }) => {
        try {
            // Update the race duration in the database
            const unit = await Unit.create(false);
            await Race.updateDuration(unit, raceId, newDuration);
            await unit.complete();

            // Broadcast the updated race duration to all clients
            io.emit(`raceDuration:${raceId}`, newDuration);
        } catch (error) {
            console.error('Error updating race duration:', error);
        }
    });
}

export function startRaceDurationUpdates(raceId: number) {
    // Clear existing interval, if any
    clearInterval(raceDurations[raceId]);
    // Start interval to update race duration every second
    raceDurations[raceId] = setInterval(() => {
        const newDuration = calculateNewDuration(raceId); // Implement your logic to calculate the new duration
        updateRaceDuration(raceId, newDuration);
    }, 1000);
}

export function stopRaceDurationUpdates(raceId: number) {
    // Clear interval for race duration updates
    clearInterval(raceDurations[raceId]);
}

function calculateNewDuration(raceId: number): string {
    // Implement your logic to calculate the new duration for the race with the given raceId
    // This could involve querying the database for the race start time and calculating the elapsed time
    // Return the new duration as a string (e.g., 'HH:MM:SS')
    return '00:00.00'; // Placeholder for demonstration
}

function updateRaceDuration(raceId: number, newDuration: string) {
    io.emit(`raceDuration:${raceId}`, newDuration);
}
