import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes/index.routes';
import path from 'path';

const { errors } = require('celebrate');

dotenv.config();

const app = express();

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}
 
app.use(cors(corsOptions)) 

app.use(express.json({ limit: '1mb' }));

app.use(express.urlencoded({ extended: true }));

app.use("/icon", express.static(path.join(__dirname, "../icon")));

app.get('/', (req, res) => res.status(200).json({ message: 'Server Up and Running' }));

app.use('/api', routes);
app.use(errors())

connectDB();

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server successfully started on port ${port}`)
})
