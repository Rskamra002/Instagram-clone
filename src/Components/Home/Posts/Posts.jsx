import axios from 'axios';
import { useEffect, useState } from 'react';
import {PostItem} from '../PostItem/PostItem'
import styled from "styled-components"
import { Spinner } from '../../Loader/Spinner';

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
      .get(`https://json-server-mocker-neeraj-data.herokuapp.com/instaPosts?_page=${page}&&_limit=2`)
      .then((res) => {
        console.log(res.data);
        setAllPosts([...allPosts, ...res.data])
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
      {allPosts?.map((item) => (
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
