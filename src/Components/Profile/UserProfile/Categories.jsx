import React from "react";
import styled from "styled-components";
import { posts, igtv, saved, tagged } from "../UserPosts/SvgIcons";
import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  option: {
    justifyContent: "center",
    display: "flex",
    gap: 50,
    margin: theme.spacing(2, 0),
  },
}));

const Categories = ({ handleActivePage }) => {
  const classes = useStyles();
  return (
    <>
      <Container className={classes.option}>
        <Box>
          <svg width="12" height="12" viewBox="0 0 48 48">
            <path d={posts} />
          </svg>
          <button onClick={() => handleActivePage("posts")}>POSTS</button>
        </Box>

        <Box>
          <svg width="12" height="12" viewBox="0 0 48 48">
            <path d={igtv} />
          </svg>
          <button onClick={() => handleActivePage("igtv")}>IGTV</button>
        </Box>

        <Box>
          <svg width="12" height="12" viewBox="0 0 48 48">
            <path d={saved} />
          </svg>
          <button onClick={() => handleActivePage("saved")}>SAVED</button>
        </Box>

        <Box>
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
