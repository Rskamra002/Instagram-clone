import axios from 'axios';
import { useEffect, useState } from 'react';
import {PostItem} from '../PostItem/PostItem'

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
    <div>
      {allPosts?.map((item) => (
        <>
          <PostItem {...item} />
        </>
      ))}
    </div>
  );
}

export {Posts};
