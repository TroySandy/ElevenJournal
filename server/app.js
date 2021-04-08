require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

app.use(require('./middleware/headers'));

const controllers = require("./controllers");

app.use(Express.json())
// app.use("/test", (req, res) => {  (to test if the endpoint is working)
//   res.send("This is a message from the test endpoint on the server!");
// });
app.use("/user", controllers.userController);

// app.use(require("./middleware/validate-jwt"));  will allow user to be public and journal to be private
app.use("/journal", controllers.journalController); //creates base url

dbConnection
  .authenticate()
  .then(() => dbConnection.sync())
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`[Server]: App is listening on ${process.env.PORT}.`);
    });
  })
  .catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
  });
