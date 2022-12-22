


export default function ButtonRouter(props: { link: string }) {
    return (
        <button
            onClick={() => {
                window.location.href = "/" + props.link
            }}
        >
            {props.link}
        </button>
    )
}