import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";


const IndexPage: NextPage = () => {

  const [active, setActive] = useState(false);

  const GET_ALL_PHOTOS = gql`
    query GetPhotos($name: String) {
      getPhotos(name: $name) {
        _id
        url
        name
        internalId
        date
      }
    }
  `;

  const {data, loading, error} = useQuery(GET_ALL_PHOTOS);

  const router = useRouter();

  return (
    <div>
      <main>
        <h1 onMouseEnter={()=>{setActive(!active)}}>Home</h1>
        <input
          onChange={(e)=>{
            if(e.target.value === 'pink'){
              router.push('/pink');
            }
          }}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && data.getPhotos.map((photo: any) => (
          <div key={photo._id}>
            <h2>{photo.name}</h2>
            <img src={photo.url} alt={photo.name} />
          </div>
        ))}
        <TestButtonEmotion active={active}>Test</TestButtonEmotion>
      </main>
    </div>
  )
}

export default IndexPage;

const TestButtonEmotion = styled.button<{active: boolean}>`
  background-color: ${props => props.active ? 'red' : 'blue'};
`;