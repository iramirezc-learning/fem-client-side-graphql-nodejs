import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";

// START: logic to extend the server with a directive
const typeDefs = gql`
  extend type User {
    age: Int
  }

  extend type Pet {
    isVaccinated: Boolean
  }
`;

const resolvers = {
  User: {
    age() {
      // just for now return any random age
      return Math.floor(Math.random() * 60);
    },
  },
  Pet: {
    isVaccinated() {
      // just for now return any random boolean
      return Math.random() < 0.7;
    },
  },
};
// END: logic to extend the server with a directive

/**
 * Create a new apollo client and export as default
 */
const uri = "http://localhost:4000"; // "https://rickandmortyapi.com/graphql";
const httpLink = new HttpLink({ uri });

// START: logic to make te server slower
const delay = setContext((request) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
});
const link = ApolloLink.from([delay, httpLink]);
// END: logic to make te server slower

const cache = new InMemoryCache();
const client = new ApolloClient({ link, cache, typeDefs, resolvers });

// How to test it?
//
// const query = gql`
//   {
//     characters {
//       results {
//         name
//         gender
//         type
//       }
//     }
//   }
// `;
//
// client
//   .query({ query })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch(console.error);

export default client;
