import styled from "@emotion/styled";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useGetPhotosQuery } from "../generated/graphql";



const IndexPage: NextPage = () => {

  const router = useRouter();

  const { data } = useGetPhotosQuery({
    variables: {
      name: null,
      internalId: null
    }
  });

  const [Segment, setSegment] = useState(false);
  const [Segment2, setSegment2] = useState(false);
  const [Segment3, setSegment3] = useState(false);
  const [Segment4, setSegment4] = useState(false);
  const [Segment5, setSegment5] = useState(false);

  setTimeout(() => {
    setSegment(true);
  }, 10);
  setTimeout(() => {
    setSegment2(true);
  }, 1500);
  setTimeout(() => {
    setSegment3(true);
  }, 2500);
  setTimeout(() => {
    setSegment4(true);
  }, 3000);
  setTimeout(() => {
    setSegment5(true);
  }, 4000);

  return (
    <>
      <Layout on={Segment5}>
        <img className="title" src="name.png" />
        <Carrusel>
          {data &&
            data.getPhotos.filter((photo, index, self) =>
              index === self.findIndex((t) => (
                t?.internalId === photo?.internalId
              ))
            ).map((photo, index) => (
              <CarrouselImage onClick={()=>{router.push(photo?.internalId as string)}} url={photo!.url}>
                <h1>
                  {photo?.internalId}
                </h1>
              </CarrouselImage>
            ))
          }
        </Carrusel>
      </Layout>
      <Background move4={Segment4} />
      <Blue move={Segment} move2={Segment2} move3={Segment3} move4={Segment4} />
      <Red move={Segment} move2={Segment2} move3={Segment3} move4={Segment4} />
      <Orange move={Segment} move2={Segment2} move3={Segment3} move4={Segment4} />
      <Green move={Segment} move2={Segment2} move3={Segment3} move4={Segment4} />
      <Yellow move2={Segment2} move3={Segment3} move4={Segment4} />
    </>
  )
}

export default IndexPage;

const Layout = styled.div<{ on: boolean }>`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${props => props.on ? '#cc98b2' : '#ffeaf5'};
  position: fixed;
  top: 0;
  margin: 0;
  transition: background-color 1.5s;
  .title {
    position: fixed;
    left: 50%;
    top: 10%;
    height: 10%;
    transform: translate(-50%, -50%);
    @media (max-width: 1000px) {
      position: relative;
      width: 90vw;
      height: auto;
    }
  }
  overflow-y: hidden;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1000px) {
    overflow: scroll;
  }
`;

const Carrusel = styled.div`
  position: relative;
  left: 0;
  display: flex;
  align-items: center;
  width: max-content;
  margin-top: 20vh;
  @media(max-width: 1000px) {
    flex-direction: column;
    padding-left: 0;
    height: fit-content;
    width: 100vw;
  }
`

const CarrouselImage = styled.div<{ url: string }>`
  width: 1000px;
  height: 700px;
  margin: 0 40px 60px 40px;
  background-size: 130%;
  background-position: center;
  background-image: url(${props => props.url});
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.5);
  @font-face {
    font-family: AbrilOwn;
    src: url("abril.ttf");
  }
  h1 {
    margin: 550px 0 0 50px;
    font-size: 3rem;
    color: #fff;
    text-shadow: 0 0 10px rgba(0,0,0,0.5);
    font-family: AbrilOwn;
    letter-spacing: 0.1em;
    transition: all 0.5s;
    @media (max-width: 1000px) {
      margin: 150px 0 0 20px;
      font-size: 1rem;
    }
  }
  :hover {
    box-shadow: 0 0 20px 0 rgba(0,0,0,0.5);
    background-image: linear-gradient(rgba(255,0,255,0.1), #00ccff47), url(${props => props.url});
    background-size: 140%;
    cursor: pointer;
    h1 {
      margin: 550px 0 0 60px;
      font-size: 3.2rem;
      text-shadow: 0 0 20px rgba(0,0,0,0.5);
      @media (max-width: 1000px) {
      margin: 150px 0 0 20px;
      font-size: 1.2rem;
    }
    }
  }
  transition: all 0.5s;
  @media (max-width: 1000px) {
    width: 300px;
    height: 200px;
    margin: 40px 0;
  }
`

const Background = styled.div<{ move4: boolean }>`
  position: fixed;
  ${props => props.move4 ? 'display: none;' : "background-color: #000"};
  width: 100vw;
  height: 100vh;
`

const Yellow = styled.div<{ move2: boolean, move3: boolean, move4: boolean }>`
  position: fixed;
  top: ${props => props.move4 ? '-100%' : '50%'};
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FF0;
  ${props => props.move3 ? 'width: 40vw;' : 'width: 10vw;'}
  ${props => props.move2 ? 'height: 100%;' : 'height: 5vh;'}
  transition: height 0.3s, width 0.5s, top 0.8s;
`
const Orange = styled.div<{ move: boolean, move2: boolean, move3: boolean, move4: boolean }>`
  position: fixed;
  top: ${props => props.move4 ? '-100%' : '50%'};
  ${props => props.move ? 'left: 40%;' : 'left: 50%;'}
  transform: translate(-50%, -50%);
  background-color: #FFA500;
  ${props => props.move3 ? 'width: 60vw;' : 'width: 10vw;'}
  ${props => props.move2 ? 'height: 100%;' : 'height: 5vh;'}
  transition: left 1s, height 0.7s, width 0.5s, top 0.8s;
`

const Green = styled.div<{ move: boolean, move2: boolean, move3: boolean, move4: boolean }>`
  position: fixed;
  top: ${props => props.move4 ? '-100%' : '50%'};
  ${props => props.move ? 'left: 60%;' : 'left: 50%;'}
  transform: translate(-50%, -50%);
  background-color: #0F0;
  ${props => props.move3 ? 'width: 60vw;' : 'width: 10vw;'}
  ${props => props.move2 ? 'height: 100%;' : 'height: 5vh;'}
  transition: left 1s, height 0.7s, width 0.5s, top 0.8s;
`

const Blue = styled.div<{ move: boolean, move2: boolean, move3: boolean, move4: boolean }>`
  position: fixed;
  top: ${props => props.move4 ? '-100%' : '50%'};
  ${props => props.move ? 'left: 70%;' : 'left: 50%;'}
  transform: translate(-50%, -50%);
  background-color: #00F;
  ${props => props.move3 ? 'width: 60vw;' : 'width: 10vw;'}
  ${props => props.move2 ? 'height: 100%;' : 'height: 5vh;'}
  transition: left 1.5s, height 1s, width 0.5s, top 0.8s;
`

const Red = styled.div<{ move: boolean, move2: boolean, move3: boolean, move4: boolean }>`
  position: fixed;
  top: ${props => props.move4 ? '-100%' : '50%'};
  ${props => props.move ? 'left: 30%;' : 'left: 50%;'}
  transform: translate(-50%, -50%);
  background-color: #F00;
  ${props => props.move3 ? 'width: 60vw;' : 'width: 10vw;'}
  ${props => props.move2 ? 'height: 100%;' : 'height: 5vh;'}
  transition: left 1.5s, height 1s, width 0.5s, top 0.8s;
`