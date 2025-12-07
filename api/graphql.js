import { ApolloServer, gql } from 'apollo-server-micro';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: { 
    hello: () => "Hello from GraphQL on Vercel" 
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");

  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  return apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: { bodyParser: false }
};
