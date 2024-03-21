const express = require("express");
const conn = require("./connection");
const app = express();
// //  main Connection
conn.connect((err) => {
  if (err) console.log(err);
  console.log("connection Created");
})

// // For the Whatsapp Feature 
// const qrcode = require("qrcode-terminal");
// const { Client } = require("whatsapp-web.js");
// const client = new Client();

// client.on("qr", (qr) => {
//   qrcode.generate(qr, { small: true });
// });
// client.on("ready", () => {
//   console.log("Client is ready!");
//   const hereMessage = "Shop is Live";
//   sendMessageToId(hereMessage, "923259491349@c.us");
// });

// client.initialize();
// ///// function
// async function sendMessageToId(messageContent, id) {
//   try {
//     // Send the message to the specified contact or group
//     const message = await client.sendMessage(id, messageContent);
//     console.log(` Message ==> ${messageContent}  <==  sent to ${id}. Message ID: ${message.id._serialized}`);

//   } catch (error) {
//     console.error("Error sending message:", error);
//   }
// }


//// midlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("html", require("ejs").renderFile);
app.use(express.static("Files"));

// // constants
const fs = require("fs");
const { log } = require("console");
const port = 3000;

// Routes 
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
app.get('/salesData', (req, res) => {

  let sql = "SELECT * FROM `sales`";

  conn.query(sql, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ status: err })
    }
    res.send(data)

  })
})
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
app.get("/refresh", (req, res) => {

  let sql = "SELECT * FROM `products`";

  conn.query(sql, (err, data) => {
    if (err) console.log("in 41");

    let products = `let products = ${JSON.stringify(data)} `;

    fs.writeFileSync("Files/product.js", products);
  });
  res.redirect("/products");
});
app.get("/setting", (req, res) => {


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

app.get("/upgrate", (req, res) => {

  let id = req.query.product;
  let type = req.query.type;
  let value = req.query.value;
  let quantity = req.query.quantity;
  let productname = req.query.productName;
  let price = req.query.price

  let dates = new Date()

  let sql = `SELECT * from sales WHERE date = '${dates.getMonth() + 1}'`
  conn.query(sql, (err, data) => {
    if (err) console.log(err);
    console.log(data[0].price);


    if (type == 'sell') {
      sql = `UPDATE sales SET sales = ${parseInt(data[0].sales) + parseInt(value)}, price = ${data[0].price + (value * price)} WHERE date = ${dates.getMonth() + 1}`;

      conn.query(sql, (err, data) => {
        if (err) console.log(err);
        console.log(data);
      })
    }


  })

  let newQuantity;
  if (type == 'sell') {
    newQuantity = parseInt(quantity) - parseInt(value)
  } else {
    newQuantity = parseInt(quantity) + parseInt(value)
  }



  if (newQuantity <= 0) {
    let statemenst = `the Product '${productname}' is Empty `
    console.log(statemenst);
    sendMessageToId(statemenst, "923259491349@c.us")
  }
  sql =
    "UPDATE `products` SET `id` = '" +
    id +
    "', `quantity` = '" +
    newQuantity +
    "' WHERE `id` = " +
    id;

  conn.query(sql, (err, data) => {
    if (err) { console.log(err); }
    else {
      res.redirect('/refresh')
    }
  });
});
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
