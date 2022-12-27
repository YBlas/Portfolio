import { PageProps } from "$fresh/server.ts";

export default function ColorPage(props: PageProps) {
    const color = props.params.color;
    return (
        <div style={
            {
                backgroundColor: `#${color}`,
                height: "100vh",
                width: "100vw"
            }} />
    );
}