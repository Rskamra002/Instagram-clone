import React from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'

const NotViewedStoryItem = ({image, name, index}) => {

    return (
        <Link to={`/stories/${index}`}>
        <Circle >
            <img src={image} width="66px" height="66px"/>
            <p>{name}</p>
        </Circle>
        </Link>
    )
}

export {NotViewedStoryItem}

const Circle = styled.div`
    height: 70px;
    width:70px;
    background: linear-gradient( #da3394, #e03c67, #f3753b, #f99b4a);
    border-radius: 50%;
    display: inline-block;
    cursor: pointer;
    padding: 2px;
    text-align: center;
    text-decoration: none;
    span {
        background: #fff;
    }
    img {
        border-radius: 50%;
        border: 2px solid white;
    }   
    p{
        color: black;
        font-size: 12px;
        overflow: hidden;
    } 
`
