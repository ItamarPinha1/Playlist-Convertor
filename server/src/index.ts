import express from 'express';
import cors from 'cors';
import { indexRouter } from './routes';


const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use("/", indexRouter);


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
