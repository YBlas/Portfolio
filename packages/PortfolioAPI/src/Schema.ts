import { gql } from "apollo-server";

export const typeDefs = gql`
    type Photo {
        _id: ID!,
        url: String!,
        name: String!,
        internalId: String!,
        date: String!
    }

   input SimplePhoto {
        url: String!,
        name: String!,
        date: String!
    }
    
    type Query {
        test: String!,
        getPhotos(name: String, internalId: String): [Photo]!,
        getPhoto(_id: ID!): Photo!
    }

    type Mutation {
        deletePhoto(_id: ID!): Photo!,
        uploadPhoto(url: String!, name: String!, internalId: String!, date: String!): Photo!,
        uploadPhotos(photos: [SimplePhoto]!, internalId: String!): String!
    }
`