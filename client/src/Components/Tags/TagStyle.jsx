
import styled from "styled-components"

export const Wrapper = styled.div`
    width: 100%;
    padding-top: 58px;
`

export const Container = styled.div`
    width: 68%;
    padding-top: 30px;
    margin: auto;
`
export const Header = styled.div`
    height: 200px;
    display: flex;
    gap: 40px;
    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
    }
    h1{
        font-weight: 100;
        color: #6e6e6e;
    }
    span{
        font-weight: 500;
    }
    button {
        width: 80%;
        padding: 5%;
        border-radius: 4px;
        cursor: pointer;
        margin: 15% 0%;
        border: none;
        outline: none;
        color: white;
        font-weight: 500;
        background: #0095F6;
    }
`
export const MappedPosts = styled.div`
    p{
        color: gray;
        font-weight: 500;
        font-size: 14px;
    }
`