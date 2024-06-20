"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.get('/read', (req, res) => {
    const submissionsRaw = fs_1.default.readFileSync('./src/db.json', 'utf8');
    const submissions = JSON.parse(submissionsRaw);
    res.json(submissions);
});
app.get('/search', (req, res) => {
    const email = req.query.email;
    if (email) {
        const submissionsRaw = fs_1.default.readFileSync('./src/db.json', 'utf8');
        const submissions = JSON.parse(submissionsRaw);
        const filteredSubmissions = submissions.filter(submission => submission.email.toLowerCase() === email.toLowerCase());
        res.json(filteredSubmissions);
    }
    else {
        res.status(400).json({ message: 'Email query parameter is required' });
    }
});
app.post('/submit', (req, res) => {
    const { name, email, phone, githubLink, elapsedTime } = req.body;
    const newSubmission = {
        name,
        email,
        phone,
        githubLink,
        elapsedTime,
        timestamp: new Date().toISOString()
    };
    const submissionsRaw = fs_1.default.readFileSync('./src/db.json', 'utf8');
    const submissions = JSON.parse(submissionsRaw);
    submissions.push(newSubmission);
    fs_1.default.writeFileSync('./src/db.json', JSON.stringify(submissions, null, 2), 'utf8');
    res.status(201).json({ message: 'Submission successful' });
});
app.put('/update/:timestamp', (req, res) => {
    const { timestamp } = req.params;
    const { name, email, phone, githubLink, elapsedTime } = req.body;
    try {
        const submissionsRaw = fs_1.default.readFileSync('./src/db.json', 'utf8');
        let submissions = JSON.parse(submissionsRaw);
        const indexToUpdate = submissions.findIndex(submission => submission.timestamp === timestamp);
        if (indexToUpdate !== -1) {
            submissions[indexToUpdate].name = name;
            submissions[indexToUpdate].email = email;
            submissions[indexToUpdate].phone = phone;
            submissions[indexToUpdate].githubLink = githubLink;
            submissions[indexToUpdate].elapsedTime = elapsedTime;
            fs_1.default.writeFileSync('./src/db.json', JSON.stringify(submissions, null, 2), 'utf8');
            res.status(200).json({ message: 'Submission updated successfully' });
            console.log(`Submission with timestamp: ${timestamp} updated successfully`);
        }
        else {
            res.status(404).json({ message: 'Submission not found' });
        }
    }
    catch (error) {
        console.error(`Error updating submission with timestamp: ${timestamp}`, error);
        res.status(500).json({ message: 'Failed to update the submission' });
    }
});
app.delete('/delete/:timestamp', (req, res) => {
    const { timestamp } = req.params;
    const submissionsRaw = fs_1.default.readFileSync('./src/db.json', 'utf8');
    let submissions = JSON.parse(submissionsRaw);
    submissions = submissions.filter(submission => submission.timestamp !== timestamp);
    fs_1.default.writeFileSync('./src/db.json', JSON.stringify(submissions, null, 2), 'utf8');
    res.status(200).json({ message: 'Submission deleted successfully' });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
