import React from "react";
import styled from "styled-components";
import { posts, igtv, saved, tagged, unsaved } from "../UserPosts/SvgIcons";
import { Container, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./UserProfile.module.css";
const useStyles = makeStyles((theme) => ({
  option: {
    justifyContent: "center",
    display: "flex",
    gap: 50,
    margin: theme.spacing(2, 0),
  },
  active: {
    borderTop: "1px solid black",
    "& svg": {
      fill: "black",
    },
    "& button": {
      color: "black",
    },
  },
}));

const Categories = ({ handleActivePage, activePage }) => {
  const activeUser = useSelector((state) => state.login.user);
  const profile = useParams();
  const classes = useStyles();
  console.log("activeuser", activeUser);
  console.log("profile", profile);
  return (
    <>
      <Container className={classes.option}>
        <Box
          className={activePage === "posts" && classes.active}
        >
          <svg width="12" height="12" viewBox="0 0 48 48">
            <path d={posts} />
          </svg>
          <button onClick={() => handleActivePage("posts")}>POSTS</button>
        </Box>

        <Box
          className={activePage === "igtv" && classes.active}
        >
          <svg width="12" height="12" viewBox="0 0 48 48">
            <path d={igtv} />
          </svg>
          <button onClick={() => handleActivePage("igtv")}>IGTV</button>
        </Box>

        {
          activeUser.username === profile.username &&
          <Box
            className={activePage === "saved" && classes.active}
          >
            <svg width="12" height="12" viewBox="0 0 48 48">
              <path d={unsaved} />
            </svg>
            <button onClick={() => handleActivePage("saved")}>SAVED</button>
          </Box>
        }

        <Box
          className={activePage === "tagged" && classes.active}
        >
          <svg width="12" height="12" viewBox="0 0 48 48">
            <path d={tagged} />
          </svg>
          <button onClick={() => handleActivePage("tagged")}>TAGGED</button>
        </Box>
      </Container>
    </>
  );
};

const Box = styled.div`
  svg {
    fill: #8e8e8e;
  }

  button {
    border-radius: 3px;
    padding: 0.5rem 0;
    background: transparent;
    margin: 0.5rem 0.4rem;
    font-weight: 400;
    color: #8e8e8e;
    font-size: 0.8rem;
    border: none;
    cursor: pointer;
  }

  :active {
    svg {
      fill: black;
    }
    button {
      color: black;
    }
    border-top: 1px solid black;
  }
  margin-top: -17px;
`;

export default Categories;
