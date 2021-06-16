import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'

const StoryItem = ({image, name, index}) => {

    return (
        <Link to={`/stories/${index}`}>
        <Circle >
            <img src={image} width="66px" height="66px" alt=""/>
            <p>{name}</p>
        </Circle>
        </Link>
    )
}

export {StoryItem}

const Circle = styled.div`
    height: 72px;
    width:72px;
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    padding: 2px;
    text-align: center;
    border: 1px solid gray;
    text-decoration: none;
    img {
        border-radius: 50%;
        padding: 1px
    }   
    p{
        color: black;
        font-size: 12px;
        overflow: hidden;
    } 
`
