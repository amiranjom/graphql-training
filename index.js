import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import schema from './schema';

const app = express()

app.get('/', (req,res) => {
    res.send("Hi")
});

const root = { friend: () => {
    return {
        "id": 19999,
        "firstName": "Amir",
        "lastName": "Anjomshoaa",
        "gender": "Man",
        "language": "Farsi",
        "email": "me@me.com"
    }
}};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));


app.listen(8080,()=>{console.log("Running on 8080")});