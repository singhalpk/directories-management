import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from '$root/sequelize';
import router from './routes';
import appConfig from '$root/config/appConfig';
import { errorHandler } from '$root/middlewares/errorHandler';
import { AppError } from './utils/appError';
import { ERROR_CODES } from './constants/responseCodes';
import { successResponseMiddleware } from '$root/middlewares/successHandler';

const PORT = appConfig.port;
const app = express();
app.use(cors());

app.use(successResponseMiddleware);
// Middleware
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({ message: "all good" }));

app.use('/api', router); // Attach your API routes

app.all('*', (req, res, next) => {
    next(new AppError(ERROR_CODES.PATH_NOT_FOUND.code));
});
app.use(errorHandler);
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
});
