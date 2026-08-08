import app from './src/index.js';
import dotenv from 'dotenv'
dotenv.config()
const Port = process.env.PORT || 3000;


app.listen(Port, () => {
  console.log(`server connected at ${Port}`);
});