import { gql } from "@apollo/client";
import { NextPage } from "next";
import localClient from "../apollo/LocalClient";


export const getServerSideProps = async () => {
    const { data } = await localClient.query({
        query: gql`
            query GetPhotosSimple {
                test
            }
        `
    });
    return {
        props: {
            testString: data.test
        }
    }
}

const StaticPage: NextPage = (props) => {
    return (
        <div>
            <main>
                <h1>{(props as any).testString as string}</h1>
            </main>
        </div>
    );
};

export default StaticPage;
