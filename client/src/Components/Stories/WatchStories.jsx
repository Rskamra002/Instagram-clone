import React, { useState } from 'react'
import { useParams, Link} from "react-router-dom"
import {Wrapper, Topper, Container, TopDetails, UserDescription, BottomDetails} from "./WatchStoriesUI"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CloseIcon from "@material-ui/icons/Close";
import Slider from "react-slick";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getStory } from '../../Redux/Stories/action';
import styles from "./story.module.css"
import LinearProgress from '@material-ui/core/LinearProgress';
import { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { loadData } from '../../Utils/localStorage';

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
  const [id, setId] = useState(null)
  const [storyId, setStoryId] = useState(null)

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
    beforeChange: (current, next) => {setNum(next); setProgress(0)},
    
  };

  const story = useSelector((state) => state.story.story)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStory())
  },[dispatch])


  useEffect(() => {
    console.log(storyId)
    const self = loadData('users')._id
    console.log(self)
    axios.patch(`http://localhost:2511/story/${storyId}`, {userId: self})
  },[id])

    return (
      <Wrapper>
        <Topper>
            <img src="https://www.pngkey.com/png/full/1-13459_instagram-font-logo-white-png-instagram-white-text.png" alt="" width="100px" height="35px"/>
            <Link to="/">
              <CloseIcon
              style={{
                color:"white",
                fontSize:"30px"
              }}
              />
            </Link>
          </Topper>
        <Container>
          <Slider {...settings} ref={sliderRef}>
            {
              story?.map((item, i) =>
              <div className={i === num ? `${styles.activeSlide}`: `${styles.slide}`} style={{backgroundImage:`url(${item.img})`}}>
                {i === num && num !== id ? setId(i): null}
                {i === num && num !== id ? setStoryId(item._id): null}

                
                <img src={item.img} width="100%" height="100%"/>
                { i === num &&
                <>
                <TopDetails>
                  <LinearProgress className={classes.root} variant="determinate" value={progress}/>
                  <UserDescription>
                    <img src={item.userProfile}/>
                    <h6>{item.userName}</h6>
                    <p>13m</p>
                  </UserDescription>
                </TopDetails>
                <BottomDetails>
                    <input placeholder={`Reply to ${item.userName}`}/>
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


