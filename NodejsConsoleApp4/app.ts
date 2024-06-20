import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import { Submission } from './src/types';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
});



app.get('/read', (req: Request, res: Response) => {
    const submissionsRaw = fs.readFileSync('./src/db.json', 'utf8');
    const submissions: Submission[] = JSON.parse(submissionsRaw);
    res.json(submissions);
});

app.get('/search', (req: Request, res: Response) => {
    const email = req.query.email as string | undefined;

    if (email) {
        const submissionsRaw = fs.readFileSync('./src/db.json', 'utf8');
        const submissions: Submission[] = JSON.parse(submissionsRaw);
        const filteredSubmissions = submissions.filter(submission => submission.email.toLowerCase() === email.toLowerCase());
        res.json(filteredSubmissions);
    } else {
        res.status(400).json({ message: 'Email query parameter is required' });
    }
});


app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, githubLink, elapsedTime } = req.body;
    const newSubmission: Submission = {
        name,
        email,
        phone,
        githubLink,
        elapsedTime,
        timestamp: new Date().toISOString()
    };

    const submissionsRaw = fs.readFileSync('./src/db.json', 'utf8');
    const submissions: Submission[] = JSON.parse(submissionsRaw);

    submissions.push(newSubmission);

    fs.writeFileSync('./src/db.json', JSON.stringify(submissions, null, 2), 'utf8');

    res.status(201).json({ message: 'Submission successful' });
});

app.put('/update/:timestamp', (req: Request, res: Response) => {
    const { timestamp } = req.params;
    const { name, email, phone, githubLink, elapsedTime } = req.body;

    try {
        const submissionsRaw = fs.readFileSync('./src/db.json', 'utf8');
        let submissions: Submission[] = JSON.parse(submissionsRaw);

        const indexToUpdate = submissions.findIndex(submission => submission.timestamp === timestamp);

        if (indexToUpdate !== -1) {
            submissions[indexToUpdate].name = name;
            submissions[indexToUpdate].email = email;
            submissions[indexToUpdate].phone = phone;
            submissions[indexToUpdate].githubLink = githubLink;
            submissions[indexToUpdate].elapsedTime = elapsedTime;

            fs.writeFileSync('./src/db.json', JSON.stringify(submissions, null, 2), 'utf8');

            res.status(200).json({ message: 'Submission updated successfully' });
            console.log(`Submission with timestamp: ${timestamp} updated successfully`);
        } else {
            res.status(404).json({ message: 'Submission not found' });
        }
    } catch (error) {
        console.error(`Error updating submission with timestamp: ${timestamp}`, error);
        res.status(500).json({ message: 'Failed to update the submission' });
    }
});

app.delete('/delete/:timestamp', (req: Request, res: Response) => {
    const { timestamp } = req.params;

    const submissionsRaw = fs.readFileSync('./src/db.json', 'utf8');
    let submissions: Submission[] = JSON.parse(submissionsRaw);

    submissions = submissions.filter(submission => submission.timestamp !== timestamp);

    fs.writeFileSync('./src/db.json', JSON.stringify(submissions, null, 2), 'utf8');

    res.status(200).json({ message: 'Submission deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});