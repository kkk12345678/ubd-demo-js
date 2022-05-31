require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const sequelize = require('./config/db');
const router = require('./routers/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
      await sequelize.authenticate();
      await sequelize.sync();
      app.listen(PORT, () => console.log('Server is running at port ' + PORT));
  } catch (e) {
      console.log(e);
  }
}

start();


  
