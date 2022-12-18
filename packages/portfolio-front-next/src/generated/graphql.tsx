import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  deletePhoto: Photo;
  uploadPhoto: Photo;
  uploadPhotos: Scalars['String'];
};


export type MutationDeletePhotoArgs = {
  _id: Scalars['ID'];
};


export type MutationUploadPhotoArgs = {
  date: Scalars['String'];
  internalId: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};


export type MutationUploadPhotosArgs = {
  internalId: Scalars['String'];
  photos: Array<InputMaybe<SimplePhoto>>;
};

export type Photo = {
  __typename?: 'Photo';
  _id: Scalars['ID'];
  date: Scalars['String'];
  internalId: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getPhoto: Photo;
  getPhotos: Array<Maybe<Photo>>;
  test: Scalars['String'];
};


export type QueryGetPhotoArgs = {
  _id: Scalars['ID'];
};


export type QueryGetPhotosArgs = {
  internalId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type SimplePhoto = {
  date: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type GetPhotosQueryVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  internalId?: InputMaybe<Scalars['String']>;
}>;


export type GetPhotosQuery = { __typename?: 'Query', getPhotos: Array<{ __typename?: 'Photo', _id: string, url: string, name: string, internalId: string, date: string } | null> };


export const GetPhotosDocument = gql`
    query GetPhotos($name: String, $internalId: String) {
  getPhotos(name: $name, internalId: $internalId) {
    _id
    url
    name
    internalId
    date
  }
}
    `;

/**
 * __useGetPhotosQuery__
 *
 * To run a query within a React component, call `useGetPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPhotosQuery({
 *   variables: {
 *      name: // value for 'name'
 *      internalId: // value for 'internalId'
 *   },
 * });
 */
export function useGetPhotosQuery(baseOptions?: Apollo.QueryHookOptions<GetPhotosQuery, GetPhotosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPhotosQuery, GetPhotosQueryVariables>(GetPhotosDocument, options);
      }
export function useGetPhotosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPhotosQuery, GetPhotosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPhotosQuery, GetPhotosQueryVariables>(GetPhotosDocument, options);
        }
export type GetPhotosQueryHookResult = ReturnType<typeof useGetPhotosQuery>;
export type GetPhotosLazyQueryHookResult = ReturnType<typeof useGetPhotosLazyQuery>;
export type GetPhotosQueryResult = Apollo.QueryResult<GetPhotosQuery, GetPhotosQueryVariables>;