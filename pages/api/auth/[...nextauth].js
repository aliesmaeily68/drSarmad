import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default NextAuth({
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, users }) {
      if (users?.userId) token.userId = users.userId;
      if (users?.isAdmin) token.isAdmin = users.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?.userId) session.users.userId = token.userId;
      if (token?.isAdmin) session.users.isAdmin = token.isAdmin;
      return token;
    },
    providers: [
      credentialsProvider({
        async authorize(credentials) {
          const mysql = require("mysql");
          const connactionDB = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "nextshoping",
          });
          connactionDB.connect((err) => {
            if (err) {
              console.log("database connected error ):");
            } else {
              console.log("db connected successful :)");
              const getUserQuery = `SELECT * FROM users`;
              connactionDB.query(getUserQuery, (err, result) => {
                if (err) {
                  console.log("query error :(");
                } else {
                  console.log("query successful :)");
                  const user = result.find(
                    (user) => user.email === credentials.email
                  );
                  if (
                    user &&
                    bcrypt.compareSync(credentials.password, user.password)
                  ) {
                    return {
                      id: user.id,
                      userId: user.userId,
                      name: user.name,
                      email: user.email,
                      Image: "124",
                      password: user.password,
                      isAdmin: user.isAdmin,
                    };

                    throw new Error("invalid email or password");
                  }
                }
              });
            }
          });
        },
      }),
    ],
  },
});
