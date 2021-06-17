import styled from "styled-components";

export const Wrapper = styled.div`
    height:54px;
    position: fixed;
    padding-top: 2px;
    width: 100%;
    top:0;
    z-index: 100;
    background: white;
    border-bottom: 1px solid rgb(219,219,219);
`
export const Container = styled.div`
    width: 68%;
    height:100%;
    margin: auto;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1000px) {
        width: 100%;
        padding:  0px 10px
    }
    @media (max-width: 550px) {
        display: 0px 20px;
    }

`
export const SearchBar = styled.div`
    background: #FAFAFA;
    border: 0.5px solid #DBDBDB;
    align-items: center;
    padding: 2px;
    height: 30px;
    display: flex;
    margin-left: 10%;
    width: 24%;
    border-radius: 3px;
    cursor: pointer;
    input {
        text-align: center;
        border: none;
        width: 90%;
        margin:auto;
        outline: none;
        background: transparent;
        :focus {
            text-align: left;
            padding-left: 5px;
        }
    }
    @media (max-width: 550px) {
        display: none;
    }
    
`
export const SuggestionBox = styled.div`
    display: ${({len}) => (len !== 0 ? "flex" : "none")};
    flex-direction: column;
    a{
        text-decoration: none;
        color: black;
    }
`
export const UsersProfile = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 10px;
    font-size: 15px;
    :hover{
        background: rgb(250,250,250);
    }
    img {
        border-radius: 25px;
        margin: 2px;
        width: 40px;
        height: 40px;
    }

`
export const Tabs = styled.div`
    display: flex;
    margin:10px 20px 0px 20px;
    justify-content: space-between;
    & * {
        font-weight: 600;
    }
    h4 {
        color: #0296F6;
    }
`