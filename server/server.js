const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");

const PORT = process.env.PORT || "8080";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/images", express.static("./db/images"));

/// Route to fetch Movies /////
app.get("/", (req, res) => {
  const moviesCount = 54;
  let page = parseInt(req.query.page);
  // console.log(page);
  if (!page) {
    page = 1;
  }
  const pageCount = Math.ceil(moviesCount / 20);
  if (page > pageCount) {
    page = pageCount;
  }

  // I am just implimenting  data fetching from json files stored in server //
  //  db can be used implimant pagination to improve performace and privacy of data //

  fs.readFile(`./db/page${page}.json`, "utf8", (err, data) => {
    if (err) return res.status(500).json({ err });
    let pageData = JSON.parse(data);
    let { title, content_items } = pageData.page;
    // console.log(title, content_items);
    res.status(200).json({
      title,
      page: page,
      pageCount: pageCount,
      movies: content_items.content,
    });
  });
});

app.listen(PORT, () => {
  console.log(`API server is up on port ${PORT}`);
});
