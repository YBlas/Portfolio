import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.2/server.ts";
import Layout from "../components/Layout.tsx";
import BackButton from "../islands/BackButton.tsx";

export const handler: Handlers = {
    async GET(_req, ctx) {
        const response = await fetch("http://api:1963/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                    query GetPhotos($internalId: String) {
                        getPhotos(internalId: $internalId) {
                        _id
                        url
                        name
                        internalId
                        date
                        }
                    }
            `,
                variables: {
                    internalId: ctx.params.image
                }
            }),
        });



        if (!response) {
            return new Response("response not found", { status: 404 });
        }

        const data = await response.json();

        return ctx.render(data);
    },
};


export default function ImagePage(props: PageProps) {

    const data = (props.data.data.getPhotos);

    return (
        <Layout>
            <div className="LayoutSingle">
                <div className="Cabeza">
                    <BackButton/>
                </div>
                {data.map((photo: { url: string|undefined; }) => (
                    <img src={photo?.url} />
                ))}
            </div>
        </Layout>
    )
}