const express = require("express");
const app = express();
const cron = require("node-cron");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const customCron = require('./cron/cron');

customCron.senMailAllUser();

const port = process.env.PORT;

let cronTask;

app.get("/", (req, res) => {
  res.send("Hello World");
});

//cron job example
// job schedule example
/* cronTask = cron.schedule("* * * * * *", () => {
  const data = "Hii cron job running\n";
  fs.appendFile("logs.txt", data, (err) => {
    if (err) throw err;
  });
}); */

// for stop cronjob
function stopCronJob() {
  if (cronTask) {
    cronTask.stop();
    console.log("Cron job stopped.");
  } else {
    console.log("No cron job is running.");
  }
}

// databse connectivity
const connectDB = require('./config/connectdb');
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

// stop cron job api
app.get("/stopcron", (req, res) => {
  stopCronJob();
  res.send("Cron job stopped.");
});

app.listen(port, () => {
  console.log(`Server running on 3000 ${port}`);
});
