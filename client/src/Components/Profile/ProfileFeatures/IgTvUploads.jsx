import React from "react";
import styles from "./Features.module.css";
import styled from "styled-components";
import {Link} from "react-router-dom";
function IgTvUploads() {
  return (
    <Wrapper>
      <img src="./assets/svgs/igtv.svg" alt="Igtv Icon" class={styles.icon} />
      <Title>Upload a Video</Title>
      <div>Videos must be between 1 and 60 minutes long.</div>
      <Link to={"/tv/upload"}>
      <Button>Upload</Button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: auto;
  text-align: center;
  font-size: 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: lighter;
  margin: 10px 0px;
  color: #262626;
`;

const Button = styled.button`
  background: #0095f6;
  color: white;
  outline: none;
  border: none;
  font-weight: bold;
  margin: 20px 0px;
  padding: 8px 25px;
  border-radius: 5px;
  cursor: pointer;
`;

export default IgTvUploads;
