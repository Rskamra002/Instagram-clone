import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import UserInfo from './UserInfo'
import Image from './Image'

const PostItem = ({photoId,userId,imgSrc,caption,likes,comments,dateCreation}) => {
  const [like,setLike] = useState(false);
    return (
      <Container>
          <UserInfo />
          <Image imgSrc={imgSrc} like={like} setLike={setLike}/>
      </Container>
    );
}

export {PostItem}

const Container = styled.div`
  width:30%;
  min-width:400px;
  min-height:700px;
  margin:30px auto;
  border:1px solid #333;
`