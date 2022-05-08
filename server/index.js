const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

dotenv.config({path: path.join(__dirname, './config/config.env')});
const PORT = process.env.PORT || 8001;

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  '/tasks',
  require('./controller/auth').routeProtection,
  require('./routes/tasks')
);
app.use('/auth', require('./routes/auth'));

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    app.listen(PORT, () =>
      console.log(`Server is now live on port ${PORT}...`)
    );
  } catch (err) {
    console.log(err);
  }
})();
