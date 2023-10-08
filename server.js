const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

let highscores = [ ]; // Hier speichern wir die Highscores

console.log(highscores);
// Endpunkt zum Abrufen der Highscores
app.get('/getHighscores', (req, res) => {
    console.log("Hallo");
    res.json(highscores);
});

// Endpunkt zum Speichern des Spielstarts
app.post('/saveGameStart', (req, res) => {
    // Hier können Sie die Spielerdaten speichern, wenn nötig
    res.json({ message: 'Spiel gestartet' });
});

// Endpunkt zum Speichern des Highscores
app.post('/saveHighscore', (req, res) => {
    const { playerName, score } = req.body;
    highscores.push({ playerName, score });

    // Sortieren der Highscores nach der höchsten Punktzahl
    highscores.sort((a, b) => b.score - a.score);

    // Begrenzen Sie die Liste auf die besten 5 Highscores
    highscores = highscores.slice(0, 5);

    // Hier können Sie die Highscores in eine Datei oder Datenbank speichern, wenn nötig

    res.json({ message: 'Highscore gespeichert' });
});



// Starten Sie den Server
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
