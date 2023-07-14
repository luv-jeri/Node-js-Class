// const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://sanjay:luclasses@cluster0.ldnomgx.mongodb.net/space?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.on("connected", () => {
  console.log("Connected to database");
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose default connection disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to database", err);
});
