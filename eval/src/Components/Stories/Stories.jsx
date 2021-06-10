import React from 'react'
import { useSelector } from 'react-redux'
import styled from "styled-components"
import { loadData } from '../../Utils/localStorage'
import { StoryItem } from './StoryItem'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Stories = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    const user = useSelector((state) => state.user.user)
    const self = loadData('users')

    return (
        <Wrapper>
            <Slider {...settings}>
            {/* <StoryItem image={self.profile_pic} name={self.username}/>
            {
                user?.filter((item) => item.id != self.id).map((el) => <StoryItem image={el.profile_pic} name={el.username}/>)
            } */}
            <div>
                <h3>1</h3>
            </div>
            <div>
                <h3>2</h3>
            </div>
            <div>
                <h3>3</h3>
            </div>
            <div>
                <h3>4</h3>
            </div>
            <div>
                <h3>5</h3>
            </div>
            <div>
                <h3>6</h3>
            </div>
            </Slider>
        </Wrapper>
    )
}

export {Stories}

const Wrapper = styled.div`
    height:120px;
    overflow: hidden;
    gap:15px;
    display: flex;
    background-color: white;
    border: 1px solid lightgrey;
    margin-top: 40px;
    border-radius: 3px;
    align-items: center;
    padding: 20px;
`

const storywrapper = styled.div`
    
`


