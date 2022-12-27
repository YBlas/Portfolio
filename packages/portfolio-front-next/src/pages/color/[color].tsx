import styled from "@emotion/styled"
import { NextPage } from "next"
import { useRouter } from "next/router"


const ColorPage: NextPage = () => {
    const router = useRouter()
    const color = router.query.color as string;

    return (
        <DivColorFull color={color ? color : "fffff"}/>
    )
}

export default ColorPage;

const DivColorFull = styled.div<{ color: string }>`
    width: 100vw;
    height: 100vh;
    background-color: ${props => "#" + props.color};
`;