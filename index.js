const express = require("express");
const conn = require("./connection");
const app = express();
const path = require("path");
const wbm = require('wbm');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);

app.use(express.static("Files"));
const fs = require("fs");
const { Console, log } = require("console");
const port = 3000;

app.get("/", (req, res) => {
  res.send(
    fs.readFileSync("Components/navbar.html", "utf-8") +
      fs.readFileSync("Files/home.html", "utf-8")
  );
});

app.get("/products", (req, res) => {
  res.send(
    fs.readFileSync("Components/navbar.html", "utf-8") +
      fs.readFileSync("Files/products.html", "utf-8")
  );
});

app.get("/growth", (req, res) => {
  res.send(
    fs.readFileSync("Components/navbar.html", "utf-8") +
      fs.readFileSync("Files/growth.html", "utf-8")
  );
});

app.get("/insert", (req, res) => {
  res.send(
    fs.readFileSync("Components/navbar.html", "utf-8") +
      fs.readFileSync("Files/insert.html", "utf-8")
  );
});

app.post("/insert", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let detail = req.body.detail;
  let price = req.body.price;
  let quantity = req.body.quantity;
  console.log(
    "Product name is " +
      name +
      " Image is on " +
      image +
      " detail is " +
      detail +
      " price is " +
      price +
      " quantity available is " +
      quantity
  );

  conn.connect((err) => {
    if (err) console.log(err);

    let sql =
      "INSERT INTO `products`(`id`, `name`, `price`, `details`, `image`, `quantity`) VALUES ('','" +
      name +
      "','" +
      price +
      "','" +
      detail +
      "','" +
      image +
      "','" +
      quantity +
      "')";

    conn.query(sql, (err, data) => {
      if (err) console.log(err);
      else {
        res.redirect("/refresh");
      }
    });
  });
});

app.get("/refresh", (req, res) => {
  conn.connect((err) => {
    if (err) console.log("Line x" + err);
    let sql = "SELECT * FROM `products`";

    conn.query(sql, (err, data) => {
      if (err) console.log("in 41");

      console.log(data);
      let products = `let products = ${JSON.stringify(data)} `;

      fs.writeFileSync("Files/product.js", products);
    });
    res.redirect("/");
  });
});

app.get("/setting", (req, res) => {
  conn.connect((err) => {
    if (err) console.log(err);

    let sql = "SELECT * FROM `products` WHERE id = '" + req.query.id + "'";
    conn.query(sql, (err, data) => {
      if (err) console.log(err);
      else {
        res.redirect(
          `/edit?id=${data[0].id}&name=${data[0].name}&price=${data[0].price}&detail=${data[0].details}&image=${data[0].image}&quantity=${data[0].quantity}`
        );
      }
    });
  });
});

app.get("/edit", (req, res) => {
  let data = req.query;
  data = JSON.stringify(req.query);
  console.log(data);

  data = `var data=${data}`;
  fs.writeFileSync("Files/ProductToEdit.js", data);

  res.send(
    fs.readFileSync("Components/navbar.html", "utf-8") +
      fs.readFileSync("Files/edit.html", "utf-8")
  );
});

app.post("/edit", (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let image = req.body.image;
  let detail = req.body.detail;
  let price = req.body.price;
  let quantity = req.body.quantity;

  conn.connect((err) => {
    if (err) console.log(err);

    let sql =
      "UPDATE `products` SET `id` = " +
      id +
      ", `name` = '" +
      name +
      "', `price` = '" +
      price +
      "', `details` = '" +
      detail +
      "', `image` = '" +
      image +
      "', `quantity` = '" +
      quantity +
      "' WHERE `id` = " +
      id;

    conn.query(sql, (err, data) => {
      if (err) console.log(err);
      else {
        res.redirect("/refresh");
        // res.send("/refresh");
      }
    });
  });
});

app.get("/Message", (req, res) => {
  res.send('ok')

  wbm.start().then(async () => {
      const phones = ['+923259491349'];
      const message = 'Good Morning.';
      await wbm.send(phones, message);
      await wbm.end();
  }).catch(err => console.log(err));

});

app.listen(port, () => {
  console.log("https://localhost:" + port);
});
