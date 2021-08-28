import { ApolloServer } from "apollo-server-micro"
import { PageConfig } from "next"
import { schema } from "../../graphql/schema"
import { createContext } from "../../graphql/context"

const apolloServer = new ApolloServer({
  context: createContext,
  schema: schema,
  debug: true,
  introspection: true,
})

const startServer = apolloServer.start()

export default async (req, res) => {
  await startServer

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res)
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}
