import 'dotenv/config';
import app from './src/index.js';

const Port = process.env.PORT || 3000;

app.listen(Port, () => {
  console.log(`server connected at ${Port}`);
});