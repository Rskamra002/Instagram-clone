import React from 'react'
import styled from "styled-components"
import {Link} from "react-router-dom"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {  Container,  makeStyles,Paper, Modal,} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    paper: {
      width: "10%",
      margin: "auto",
      background: 'gray',
      height: "570px",
      marginTop: theme.spacing(5),
      outline: "none",
    },
  
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
    slidesToShow: 1,
    slidesToScroll: 1
  };


    return (
        <Wrapper>
            <Container>
                <Modal open={true} className={classes.container}>
                    <Slider {...settings}>
                        <Paper className={classes.paper}>
                            <Link to="/">
                            <CloseIcon
                                fontSize="large"
                                className={classes.close}
                            /></Link>
                        </Paper>
                    </Slider>
                </Modal>
            </Container>
        </Wrapper>
    )
}

export {WatchStories}

const Wrapper = styled.div`
    background-color: black;
    height: 100vh;
    width: 100%;
`
