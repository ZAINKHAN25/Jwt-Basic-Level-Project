import jwt from 'jsonwebtoken';
import express from 'express';

const app = express();
const Port = 4000;
const secretKey = 'mysecretkey';

app.use(express.json());


app.post('/generate-token', (req, res) => {
    const token = jwt.sign(req.body.user, secretKey, { expiresIn: '1h' });
    console.log('Generated Token:', token);
    res.send(token);
});

app.post('/verify-token', async (req, res) => {
    try {
        const decoded = await jwt.verify(req.body.token, secretKey);
        console.log('Decoded Token:', decoded);
        res.status(200).send(decoded);
    } catch (err) {
        console.error('Token verification failed:', err.message);
        res.status(404).send(err.message);
    }
});

app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`);
});
