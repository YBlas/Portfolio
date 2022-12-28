import { ApolloProvider } from "@apollo/client";
import client from "../apollo/client";
import { AppProps } from "next/app";
import "../components/styles/general.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ApolloProvider client={client}>
    <Component {...pageProps}/>
  </ApolloProvider>
)

export default MyApp;