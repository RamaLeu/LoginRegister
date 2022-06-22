const mongoose = require("mongoose");
const app = require("./app");


const DB =
  "mongodb+srv://root:CwSRDBXOBt93A0BT@cluster0.yvqlo.mongodb.net/LoginRegister?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
  });

const port = 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});