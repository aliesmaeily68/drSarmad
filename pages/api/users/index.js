function handler(req, res) {
  const mysql = require("mysql");
  const bcrypt = require("bcryptjs");
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
      if (req.method === "POST") {
        const newUser = JSON.parse(req.body);
        console.log(bcrypt.hashSync(toString(newUser.password)));
        const postUserQuery = `INSERT INTO users VALUES (null,'${
          newUser.name
        }','${newUser.userId}','${bcrypt.hashSync(
          toString(newUser.password)
        )}','${newUser.email}',${newUser.isAdmin})`;
        connactionDB.query(postUserQuery, (err, result) => {
          if (err) {
            console.log("query error :(");
          } else {
            res.send(result);
            console.log("send user data successful :)");
          }
        });
      }

      // const getUserQuery = `SELECT * FROM users`;
      // connactionDB.query(getUserQuery, (err, result) => {
      //   if (err) {
      //     console.log("query error :(");
      //   } else {
      //     result.map((user) => console.log(`${user.name}=>${user.id}`));
      //     // console.log("result=>", result);
      //     res.send(result);
      //     console.log("send user data successful :)");
      //   }
      // });
    }
  });
}
export default handler;
