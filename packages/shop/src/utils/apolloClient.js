import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client"
import {setContext} from "@apollo/client/link/context"
// import { InMemoryCache } from "apollo-cache-inmemory"
// import { setContext } from "apollo-link-context"
import { CachePersistor } from "apollo-cache-persist"

import config from "./config"
import { resolvers, typeDefs } from "./localState"

const httpLink = createHttpLink({
  uri: config.debug ? config.graphQlUriDev : config.graphQlUri,
})

const cache = new InMemoryCache()

export const persistor = new CachePersistor({
  cache,
  storage: window.localStorage,
  debug: config.debug,
})
persistor.restore()

const authLink = setContext(async (_, { headers }) => {
  const token = window.localStorage.getItem("token")

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  }
})

// Purge persistor when the store was reset.
// persistor.purge(); // clear local storage

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  typeDefs,
  resolvers,
})

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

export default client
