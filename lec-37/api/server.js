const express = require('express');
const app = express();
const path = require('path');
app.use
const PORT = 3000;
app.use(express.json());
app.use("/api/v1/order", require('./routes/order'));




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});