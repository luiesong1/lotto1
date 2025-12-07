import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: { hello: () => "Hello from Vercel GraphQL" }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  return apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: { bodyParser: false },
};
