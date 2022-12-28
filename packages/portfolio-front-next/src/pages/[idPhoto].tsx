import { gql } from "@apollo/client";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import localClient from "../apollo/LocalClient";
import { useGetPhotosQuery } from "../generated/graphql";


const StaticPage: NextPage = () => {

    const router = useRouter();

    const { data } = useGetPhotosQuery({
        variables: {
            internalId: router.query.idPhoto as string
        },
    });

    return (
        <Layout>
            <Header>
                <BackButton onClick={() => router.back()} >
                    <p>Get Back</p>
                </BackButton>
            </Header>
            {data && data.getPhotos.map((photo) => (
                <img src={photo?.url} /> 
            ))}
        </Layout>
    );
};

export default StaticPage;

const Header = styled.div`
    position: relative;
    top: 0;
    left: 0;
    background-color: #4e4e4e;
    border-bottom: 1px solid #ffff;
    box-shadow: 0 0 10px #000000;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 50px;
    width: 100%;
`

const BackButton = styled.div`
    padding: 0 15px;
    margin-left: 15px;
    height: 40px;
    border-radius: 50px;
    background-color: #ffff;
    display: flex;
    align-items: center;
    @font-face {
        font-family: AbrilOwn;
        src: url("abril.ttf");
    }
    p {
        font-family: AbrilOwn;
        letter-spacing: 1px;
    }
    &:hover {
        cursor: pointer;
        box-shadow: 0 0 10px #c4c4c4;
    }
    `

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #191919;
    width: 100%;

    img {
        width: 100%;
    }
`;
