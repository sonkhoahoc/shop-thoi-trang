import express, { Application, Request, Response } from 'express';
import swaggerUI from 'swagger-ui-express';
import router from "./routes/Router";
import swaggerDocument from '../swagger-output.json';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';

dotenv.config()

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/v1", router);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
})

createConnection().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.log('Error connecting to database', error);
})

