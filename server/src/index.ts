import express from 'express';

import { indexRouter } from './routes';


const app = express();

const port = process.env.PORT || 3000;

app.use("/", indexRouter);


// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
