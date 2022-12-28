export default function Image(props: {
    className: string,
    link: string,
    src: string
 }) {
  
    return (
      <img className={props.className} src={props.src} onClick={()=>{
        window.location.href = "/" + props.link
      }} />
    );
  }