import axios from 'axios';
import { useEffect, useState } from 'react';
import {PostItem} from '../PostItem/PostItem'
import styled from "styled-components"
import { Spinner } from '../../Loader/Spinner';
import { Stories } from '../../Stories/Stories';

function Posts() {
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const scrollToEnd = () => {
    setPage((prev) => prev +1)
  }

  useEffect(() => {
    setLoading(true)
    axios
      .get(`http://localhost:2511/posts?_page=${page}&&_limit=5`)
      .then((res) => {
        console.log((res.data.data));
        setAllPosts([...allPosts, ...res.data.data])
        setLoading(false)
      });
  }, [page]);

  window.onscroll= () => {
    if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
      scrollToEnd()
    }
  }


  return (
    <Wrapper>
      <Stories/>
      {allPosts?.sort((a,b) => b-a).map((item) => (
        <>
          <PostItem key={item.id} {...item} />
        </>
      ))}
      {
        loading && <div><Spinner/></div>
      }
    </Wrapper>
  );
}

export {Posts};

const Wrapper = styled.div`
  width:65%;
`
