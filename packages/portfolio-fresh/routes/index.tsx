import { Head } from "$fresh/runtime.ts";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from '$fresh/server.ts';



export const handler: Handlers = {
  async GET(_req, ctx) {
    const response = await fetch("http://api:1963/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query GetPhotosSimple {
          getPhotos {
            _id
            url
            name
            internalId
            date
          }
        }
      `,
      }),
    });



    if (!response) {
      return new Response("response not found", { status: 404 });
    }

    const data = await response.json();
    
    return ctx.render(data);
  },
};


export default function Home(props: PageProps) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      {props.data.data.getPhotos.map((photo: {name: string, _id: string, url: string, internalId: string, date: string}) => {
        return (
          <div>
            <p>{photo.name}</p>
            <img src={photo.url
            } />
            <p>{photo.date}</p>
          </div>
        );
      })
      }
      <div>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
        <p>
          Welcome to `fresh`. Try updating this message in the ./routes/index.tsx
          file, and refresh.
        </p>
        <Counter start={3} />
      </div>
    </>
  );
}
