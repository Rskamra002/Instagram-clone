import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from "styled-components"
import { loadData } from '../../Utils/localStorage'
import { StoryItem } from './StoryItem'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { getStory } from '../../Redux/Stories/action'


const Stories = () => {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 6.5,
        slidesToScroll: 3
      };
    const [storyUsers, setStoryUsers] = useState([])

    const user = useSelector((state) => state.user.user)
    const story = useSelector((state) => state.story.story)
    const self = loadData('users')
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getStory())
    },[dispatch])
    useEffect(() => {    
        story?.forEach((item) => {
            let data = user?.filter((it) => it.username === item.username) || []
            if(story?.length !== storyUsers.length){
                setStoryUsers((prev) => [...prev, ...data])
            }
        })
    },[user ,story])

    return (
        <Wrapper>
            <Slider {...settings}>
            <StoryItem image={self.profilePic} name={self.username} index ={0}/>
            {
                storyUsers?.filter((item) => item._id !== self._id).map((el, i) => <StoryItem key={el._id} image={el.profilePic} name={el.username} index={i+1}/>) 
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


