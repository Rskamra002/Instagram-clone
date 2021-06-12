import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {  makeStyles} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  
    close: {
      right: 30,
      top: 20,
      color: "white",
      position: "absolute",
      outline: 'none',
      "& :hover": {
        cursor: "pointer",
      },
    },  
}));


const WatchStories = () => {
  const classes = useStyles();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  useEffect(() => {
    
  })

    return (
      <Wrapper>
          <Slider {...settings}>
            {

            }
          </Slider>
      </Wrapper>
    )
}

export {WatchStories}

const Wrapper = styled.div`
    background-color: black;
    height: 100vh;
    overflow: hidden;
    width: 100%;
    padding-top: 25px;
`
const Container = styled.div`
  height: 580px;
  border-radius: 5px;
  border: 1px solid gray;
  margin: auto;
`
