import styled from "styled-components"

export const Wrapper = styled.div`
    background: white;
    padding-top: 50px;
    height:100vh;
    `
export const Container = styled.div`
    width:68%;
    display: flex;
    gap: 50px;
    margin: auto;
    padding: 4% 0px;
    @media (max-width: 900px) {
        width: 95%;
    }
    
`
export const OptionsSide = styled.div`
    width: 77%;
    h1 {
        font-weight: 300;
        margin-bottom: 30px;
    }
    h4{
        font-weight: 600;
        margin-bottom: 8px;
    }
    p{
        color: #ADADAD;
        font-size: 12px;
    }
    button {
        background: transparent;
        border: none;
        outline: none;
        color: #3897F0;
        font-size: 12px;
        font-weight: 600;
    }
`

export const Bios = styled.input`
    border: 1px solid #EFEFEF;
    padding: 15px;
    width: 90%;
    border-radius: 5px;
    outline: none;
`

export const ChooseFile = styled.input`
    border:1px dashed #DBDBDB;
    width: 33%;
    background: #FAFAFA;
    height: 280px;
    display: flex;
    cursor: pointer;
    color: transparent;
    flex-direction: column;
    ::before{
        content: "+";
        border: none;
        font-size: 80px;
        width: 20%;
        padding-top: 70px;
        padding-left: 20px;
        background: transparent;
        color: #0095F6;
        font-weight:100;
        margin:auto;
        @media (max-width: 900px) {
            padding-left: 0px;
    }
        
    }
    ::-webkit-file-upload-button {
    visibility: hidden;
    }
    ::after{
        content: 'Drag and Drop an Image';
        width: 65%;
        margin: auto;
        font-weight:700;
        color: black;
        @media (max-width: 500px) {
        width: 90%;
    }
        /* visibility: hidden; */
    }
`

export const Preview = styled.div`
    margin: 10px 0px;
    width: 100px;
    height: 100px;
    background: #FAFAFA;
    border: 1px solid #DBDBDB;
`
export const PostButtons = styled.div`
    width: 24%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & * {
        cursor: pointer;
    }
    button {
        background: #0095F6;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }
    h5 {
        color: #0095F6;
    }
`