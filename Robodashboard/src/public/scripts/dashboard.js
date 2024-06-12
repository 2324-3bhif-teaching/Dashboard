const socket = io();

// Event handler for receiving race duration updates
socket.on('raceDuration', (data) => {
    // Update race duration in the UI
    document.getElementById('raceDuration').textContent = data;
});

// Event handler for receiving race participants updates
socket.on('raceParticipants', (data) => {
    // Update race participants in the UI
    const participantsList = document.getElementById('participantsList');
    participantsList.innerHTML = ''; // Clear previous data
    data.forEach((participant) => {
        const listItem = document.createElement('li');
        listItem.textContent = participant.name;
        participantsList.appendChild(listItem);
    });
});
