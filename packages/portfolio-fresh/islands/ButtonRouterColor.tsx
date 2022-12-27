import { useRef } from "preact/hooks";



export default function ButtonRouterColor() {

    const colorRef = useRef<HTMLInputElement>(null);

    return (
        <>
        <input ref={colorRef}/>
            <button
                onClick={() => {
                    const hexColorCodePattern = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                    if (hexColorCodePattern.test(colorRef.current?.value || "")) {
                        window.location.href = `/color/${colorRef.current?.value}`;
                    } else {
                        alert("Not a valid color code");
                    }
                }}
            >
                Go to color page
            </button>
        </>
    )
}