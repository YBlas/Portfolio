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

  const [colorPage, setColorPage] = useState("");

  return (
    <div>
      <main>
        <h1 onMouseEnter={()=>{setActive(!active)}}>Home</h1>
        <input
          value={colorPage}
          onChange={(e)=>{
            setColorPage(e.target.value);
          }}
        />
        <button
          onClick={()=>{
            const hexColorCodePattern = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if(hexColorCodePattern.test(colorPage)){
              router.push(`/color/${colorPage}`);
            }else{
              alert("Not a valid color code");
            }
          }}
        >
          Go to color page
        </button>
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