require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



require('./db'); // ✅ Trigger DB connection (no need for `db.on(...)`)
const foodRouter = require('./routes/food-router');
const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');








const app = express();
const apiPort = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use('/api', authRouter); // 👈 Make sure this is before other /api routes
app.use('/api/user', userRouter);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', foodRouter);

app.listen(apiPort, () => console.log(`🚀 Server running on http://localhost:${apiPort}`));
