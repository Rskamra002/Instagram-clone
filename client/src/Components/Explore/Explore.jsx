import React from 'react'
import styled from "styled-components"

const Explore = () => {
    return (
        <ExploreWrapper>
            <GridRows>
                <SmallBox>
                    <div></div>
                    <div></div>
                </SmallBox>
                <LargeBox></LargeBox>
            </GridRows>
            <FlexRows>
                <div></div>
                <div></div>
                <div></div>
            </FlexRows>
            <FlexRows>
                <div></div>
                <div></div>
                <div></div>
            </FlexRows>
        </ExploreWrapper>
    )
}

export {Explore}

const ExploreWrapper = styled.div`
    width:69%;
    margin:auto;
`

const FlexRows = styled.div`

`
const GridRows = styled.div`
    display: flex;
    gap:30px;
    height:600px;
    border:1px solid black
`
const LargeBox = styled.div`
    width:70%;
    /* width: 570px; */
    border:1px solid black;
    height:570px;
`
const SmallBox = styled.div`
    border:1px solid black;
    height:50%;
    width:35%;
    height:570px;
    display:flex;
    flex-direction: column;
    gap:30px;
    div {
        width:100%;
        height:50%;
    }
`

