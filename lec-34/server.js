const express = require("express");
const { Queue } = require("bullmq");
const { Worker } = require("bullmq");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let prediction_Queue = new Queue("predict", {
  connection: {
    host: "localhost",
    port: 6379, 
  },
})
async function addJobs() {
  let job = await prediction_Queue.add("predict", { foo: "bar" });
  return job;
}
// addJobs()
//   .then((job) => {
//     console.log("Job added:", job.id);
//   })

  //consumer----------->worker

  const myWorker = new Worker('predict', async job => {
    console.log(job.id);
  }, {
  connection: {
    host: 'localhost',
    port: 6379,
  },
});

app.listen(3000, () => {
  console.log("Server started at 3000");
});
