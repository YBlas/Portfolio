import { ApolloServer } from "apollo-server";
import { connectMongo } from "./functions";
import { Mutation, Query } from "./resolvers";
import { typeDefs } from "./Schema";


const resolvers = {
    Query,
    Mutation
}

const run = async () => {

    const Photos = (await connectMongo()).collection("Photos");

    const server = new ApolloServer({ typeDefs, resolvers, context: { Photos }});
    server.listen(1963).then(() => { console.log("Server is running on port 1963") })
}

run();