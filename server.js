const express = require("express");
const path = require('path');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use(require('./controllers'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}



app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});


