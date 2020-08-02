import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("Hi");
});

class Friend {
    constructor(id, {firstName, lastName, gender, language, email}){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.language = language;
        this.email = email;
    }
}

const friendDatabase = {};

const root = {
  friend: () => {
    return {
      id: 19999,
      firstName: "Amir",
      lastName: "Anjomshoaa",
      gender: "Man",
      language: "Farsi",
      emails: [{ email: "me@me.com" }, { email: "test@test.com" }],
    };
  },
  createFriend: ({input}) => {
      let id = require('crypto').randomBytes(10).toString('hex');
      friendDatabase[id] = input
      return new Friend(id,input)
  }
};
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080, () => {
  console.log("Running on 8080");
});
