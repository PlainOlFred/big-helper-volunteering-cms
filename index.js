const express = require("express");


const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());

app.use(require('./controllers'));

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});


