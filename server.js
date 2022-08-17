const mongoose = require("mongoose");
const shortUrls = require("./models/shortUrls");
const express = require("express");
const app = new express();

mongoose
  .connect("mongodb://localhost:27017/urlShortner", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully..."))
  .catch(() => console.error("Unable to connect..", err));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortUrl = await shortUrls.find();
  res.render("index", { shortUrl: shortUrl });
});

app.post("/shortUrls", async (req, res) => {
  await shortUrls.create({
    full: req.body.fullUrl,
  });
  res.redirect("/");
});

const port = process.env.port || 3000;
app.listen(port, () => console.log(`listening on port: ${port}..`));
