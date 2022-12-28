// deno-lint-ignore-file no-explicit-any
import { Handlers, PageProps } from '$fresh/server.ts';
import Layout from "../components/Layout.tsx";
import Image from "../islands/Image.tsx";

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

  const data = props.data.data;

  return (
    <Layout>
      <div className="LayoutPhoto">
        <img className="title" src="name.png" />
        <div className="Carrusel">
          {data &&
            data.getPhotos.filter((photo:any, index: number, self: any) =>
              index === self.findIndex((t: any) => (
                t?.internalId === photo?.internalId
              ))
            ).map((photo: any, index: number) => (
              <Image className="CarrouselImage" link={photo!.internalId} src={photo!.url}/>
            ))
          }
        </div>
      </div>
    </Layout>
  );
}
