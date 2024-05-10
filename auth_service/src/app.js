import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes/index.routes';

const { errors } = require('celebrate');

const port = process.env.PORT || 3001;
dotenv.config();

const app = express();

app.use(helmet());

app.use(cors());

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    console.log(`Server successfully started on port ${port}`)
    res.status(200).json({ message: 'Server Up and Running' })
});

app.use('/api', routes);
app.use(errors())

connectDB();


app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})
