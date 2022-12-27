import { Handlers, PageProps } from "https://deno.land/x/fresh@1.1.2/server.ts";
import Layout from "../components/Layout.tsx";

export const handler: Handlers = {
    async GET(req, ctx) {
        const data = await fetch("http://api:1963/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `query GetPhoto($id: ID!) {
                    getPhoto(_id: $id) {
                      _id
                      url
                      name
                      internalId
                      date
                    }
                  }`,
                variables: {
                    id: ctx.params.image
                }
            })
        })

        if (!data) {
            return new Response("response not found", { status: 404 });
        }

        const json = await data.json();
        console.log(json.data.getPhoto);
        return ctx.render(json.data.getPhoto);
    },
    async POST(req, ctx) {
        const formData = await req.formData();
        const json = Object.fromEntries(formData);

        const data = await fetch("http://api:1963/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                mutation UploadPhoto($url: String!, $name: String!, $internalId: String!, $date: String!) {
                    uploadPhoto(url: $url, name: $name, internalId: $internalId, date: $date) {
                      _id
                      url
                      name
                      internalId
                      date
                    }
                  }
                `,
                variables: {
                    url: json.url,
                    name: json.name,
                    internalId: json.internalId,
                    date: json.date
                }
            })
        })

        return ctx.render({ message: "success" });
    }
}

export default function YellowPage(props: PageProps) {
    return (
        <Layout>
            <p>{props.data.name}</p>
            <img src={props.data.url} />
            <p>{props.data.date}</p>
            <p>{props.data.internalId}</p>
            <br/>
            <form method="POST">
                <fieldset>
                    <input type="text" name="url" placeholder="url" />
                    <input type="text" name="name" placeholder="name" />
                    <input type="text" name="internalId" placeholder="internalId" />
                    <input type="text" name="date" placeholder="date" />
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        </Layout>
    )
}