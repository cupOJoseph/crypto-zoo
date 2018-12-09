const express = require('express');

var app = express();
// app.set('port', process.env.PORT || 3001);

// if (process.env.NODE_ENV === 'production') {
app.set('port', 80);
app.use(express.static('build'));
app.use('*', express.static('build'));
// }
app.listen(app.get('port'), () => {
  console.log(
    `_______________________________________________________________`
  );
  console.log(` `);
  console.log(`################# Server Started ####################`);
  console.log(` `);
  console.log(`Started on port ${app.get('port')}`);
  console.log(`______________________________________________________________`);
  console.log(` `);
});
module.exports = { app };
