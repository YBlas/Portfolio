export default function BackButton() {

    return (
        <button className="BackButton" onClick={() => {
            window.location.href = "/"
        }} >
            <p>Get Back</p>
        </button>
    );
}