import axios from 'axios';
import { useEffect, useState } from 'react';
import {PostItem} from '../PostItem/PostItem'
import styled from "styled-components"

function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  useEffect(() => {
    axios
      .get('https://json-server-mocker-neeraj-data.herokuapp.com/instaPosts')
      .then((res) => {
        console.log(res.data);
        setAllPosts(res.data);
      });
  }, []);
  return (
    <Wrapper>
      {allPosts?.map((item) => (
        <>
          <PostItem key={item.id} {...item} />
        </>
      ))}
    </Wrapper>
  );
}

export {Posts};

const Wrapper = styled.div`
  width:65%;
`
