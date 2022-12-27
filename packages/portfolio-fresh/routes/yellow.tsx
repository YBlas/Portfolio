import { PageProps } from "https://deno.land/x/fresh@1.1.2/server.ts";
import Layout from "../components/Layout.tsx";

export default function YellowPage(props: PageProps) {
    return (
    <Layout>
        <div className="yellow" style={{backgroundColor: "#fabada"}}>
            <p>TestPage</p>
        </div>
    </Layout>
    )
}