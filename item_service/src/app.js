import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database';
import routes from './routes/index.routes';
import path from 'path';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const { errors } = require('celebrate');

dotenv.config();

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

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

// app.listen(port, () => {
//     console.log(`Server successfully started on port ${port}`)
// })

// Start the server only if we're not in a test environment
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server successfully started on port ${port}`);
    });
}
export default app;
