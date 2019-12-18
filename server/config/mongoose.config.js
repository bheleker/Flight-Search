const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/FlightProject", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Successfully connected to the mongodb...."))
  .catch(reason => console.log("Something went wrong for some....", reason));