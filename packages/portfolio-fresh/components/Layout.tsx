import { Head, asset } from "$fresh/runtime.ts";
import { type ComponentChildren } from "preact";

export default function Layout(props: { children?: ComponentChildren }) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href={asset("/global.css")} />
      </Head>
      {props.children}
    </div>
  );
}