function handler(req, res) {
  const mysql = require("mysql");
  const connactionDB = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nextshoping",
  });

  connactionDB.connect((err) => {
    if (err) {
      console.log("database error :(");
    } else {
      console.log("database connect successful :)");
      if (req.method === "GET") {
        const getProductQuery = `SELECT * FROM products`;
        connactionDB.query(getProductQuery, (err, result) => {
          if (err) {
            console.log("query error :(");
          } else {
            res.send(result);
          }
        });
      }
    }
  });
}
export default handler;
