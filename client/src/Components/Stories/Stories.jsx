import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import { loadData } from '../../Utils/localStorage'
import { StoryItem } from './StoryItem'
import { NotViewedStoryItem } from './NotViewedStoryItem'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getStory } from '../../Redux/Stories/action'
import { Spinner } from '../Loader/Spinner'


const Stories = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6.5,
        slidesToScroll: 3
      };

    const [selfId, setSelfId] = useState("")
    const story = useSelector((state) => state.story.story)
    const {isLoading} = useSelector((state) => state.story)
    const self = loadData('users')
    const dispatch = useDispatch()
    
    useEffect(() => {
    const self = loadData('users')._id
    setSelfId(self)
    dispatch(getStory())
    },[dispatch])
    

    return isLoading ? (
        <Wrapper>
            <Spinner/>
        </Wrapper>
    ) : (
        <Wrapper>
            <Slider {...settings}>
            <StoryItem image={self.profilePic} name={self.username} index ={0}/>
            {
                story?.filter((item) => item.userName !== self.username && !item.view.includes(selfId)).map((el, i) => <NotViewedStoryItem key={el._id} image={el.userProfile} name={el.userName} index={i+1}/>) 
            }
            {
                story?.filter((item) => item.userName !== self.username && item.view.includes(selfId)).map((el, i) => <StoryItem key={el._id} image={el.userProfile} name={el.userName} index={i+1}/>) 
            }
            </Slider>
        </Wrapper>
    )
}

export {Stories}

const Wrapper = styled.div`
    height:120px;
    overflow: hidden;
    background-color: white;
    border: 1px solid lightgrey;
    margin-top: 40px;
    border-radius: 3px;
    align-items: center;
    padding: 20px 0px 20px 10px;
    .slick-arrow{
        margin: 0px 25px;
        background-color: transparent;
        z-index: 100;
    }
`


