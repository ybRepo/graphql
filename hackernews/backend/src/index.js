const { GraphQLServer } = require('graphql-yoga')
const {prisma} = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Vote = require('./resolvers/Vote')


//Assign imported resolvers to "const resolvers"
const resolvers = {
    Query,
    Mutation,
    Subscription,
    User,
    Link,
    Vote
}

//initialize server
const server = new GraphQLServer({
    typeDefs: 'schema.graphql', //the Schema is defined in its own file and referenced in the constructor of the GraphQLServer below
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    },
})

server.start(() => console.log(`Server is running on http://localhost:4000`))