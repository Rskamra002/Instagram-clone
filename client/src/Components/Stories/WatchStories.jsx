import React, { useState } from 'react'
import styled from "styled-components"
import { useParams} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getStory } from '../../Redux/Stories/action';
import styles from "./story.module.css"
import LinearProgress from '@material-ui/core/LinearProgress';
import { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    "& .MuiLinearProgress-barColorPrimary": {
        backgroundColor: "white",
    },
},

});

const WatchStories = () => {
  const classes = useStyles();
  const {index} = useParams()
  const [num, setNum] = useState(Number(index))
  const [progress, setProgress] = React.useState(0);
  const sliderRef = useRef()

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          sliderRef.current.slickNext()
          return 0
        }
        return oldProgress + 5;
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  },[])

  var settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: 0,
    focusOnChange: true,
    focusOnSelect: true,
    initialSlide: index,
    // beforeChange: (current, next) => setNum(next),
    beforeChange: (current, next) => {setNum(next); setProgress(0)},
    // afterChange: (current, next) =>  setProgress(0),
    
  };

  const story = useSelector((state) => state.story.story)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStory())
  },[dispatch])

    return (
      <Wrapper>
        <Container>
          <Slider {...settings} ref={sliderRef}>
            {
              story?.map((item, i) =>
              <div className={i === num ? `${styles.activeSlide}`: `${styles.slide}`} style={{backgroundImage:`url(${item.img})`}}>
                
                <img src={item.img} width="100%" height="100%"/>
                { i === num &&
                <>
                <TopDetails>
                  <LinearProgress className={classes.root} variant="determinate" value={progress}/>
                  <UserDescription>
                    <img src={item.ids}/>
                    <h6>{item.username}</h6>
                    <p>13m</p>
                  </UserDescription>
                </TopDetails>
                <BottomDetails>
                    <input placeholder={`Reply to ${item.username}`}/>
                    <img src="https://img.icons8.com/ios/2x/ffffff/sent.png" alt="" width="30px" height="30px" />
                </BottomDetails>
                </>
                }
              </div>
              )
            }
          </Slider>
        </Container>
      </Wrapper>
    )
}

export {WatchStories}

const Wrapper = styled.div`
    background-color: black;
    height: 100vh;
    width: 100%;
    padding: 25px;
    margin: auto; 
  .slick-arrow{
        margin: 0px 38%;
        z-index: 100;
    }

`
const Container = styled.div`
  height: 560px;
  max-width: 95%;
  margin-left: 2.5%;
  align-items: center;
  border-radius: 5px;
  padding-top: 2%;
`
const TopDetails = styled.div`
  margin-top: -480px;
  padding: 0px 10px;
`
const UserDescription = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px;
  color: white;
  p{
    font-size: 12px;
    color: whitesmoke
  }
`

const BottomDetails = styled.div`
  margin-top: 390px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  input {
    width: 80%;
    border: 1px solid white;
    background: transparent;
    padding: 10px;
    color: whitesmoke;
    border-radius: 20px;
    ::placeholder{
      color: whitesmoke;
    }
  }
`
