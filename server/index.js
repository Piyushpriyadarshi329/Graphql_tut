const express= require("express");
const {ApolloServer} = require("@apollo/server")
const {expressMiddleware} = require("@apollo/server/express4")
const cors= require("cors")
const bodyParser=require("body-parser")




async function startServer(){

    const app= express();
    const server=new ApolloServer({
        typeDefs: `
        type Todo {
        id: ID!,
        title: String!,
        completed:Boolean
        }
        type User {
        id:ID!,
        name:String!,
        email:String!,

        }
        type Query {
        getTodos:[Todo]
        getUser :[User]
        getUserById(id:ID!) :User
        }
        `,
        resolvers:{
            Query: {
                getTodos:   ()=> [{id:1,title:"hello",completed:true}],
                getUser:    ()=> [{id:1,name:"piyush",email:"Piyush@123"}],
                // getUserById:  async (parent,{id}) => 
        }}
    });
    app.use(cors());
    app.use(bodyParser.json());
    await server.start();
    app.use("/graphql",expressMiddleware(server))

    app.listen(4002,()=>{console.log("server start at 4002")})


}

startServer()