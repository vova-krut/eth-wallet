import createServer from "./utils/createServer";
import { logJob } from "./utils/jobScheduler";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = createServer();

const start = async () => {
    logJob.start();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

start();
