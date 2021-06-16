import styled from "styled-components"

export const ChooseIGTVFile = styled.input`
    border:1px dashed #DBDBDB;
    border-radius: 8px;
    width: 42%;
    background: #FAFAFA;
    height: 580px;
    display: flex;
    color: transparent;
    cursor: pointer;
    flex-direction: column;
    ::before{
        content: "+";
        border: none;
        font-size: 80px;
        width: 20%;
        padding-top: 60%;
        padding-left: 20px;
        background: transparent;
        color: #0095F6;
        font-weight:100;
        margin:auto
    }
    ::-webkit-file-upload-button {
    visibility: hidden;
    }
    ::after{
        content: "Drag and Drop an Video File";
        color: black;
        width: 55%;
        margin: auto;
        font-weight:700;
    }
`

export const Preview = styled.div`
    margin: 10px 0px;
    width: 70px;
    border-radius: 5px;
    border: 1px solid lightgrey;
    height: 120px;
    background: #FAFAFA;
`