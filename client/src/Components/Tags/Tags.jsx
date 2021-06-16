import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Wrapper, Container, Header, MappedPosts} from "./TagStyle"

const Tags = () => {
    const {tags} = useParams()
    console.log(tags)

    const [tagPosts, setTagPosts] = useState([])
    const [displayPosts, setDisplayPosts] = useState([])

    useEffect(() => {
        // axios.get("http://localhost:2511/posts")
        axios.get("https://json-server-mocker-neeraj-data.herokuapp.com/instaPosts")
        .then((res) => setTagPosts(res.data))
        .catch((err) => console.log("error"))
        
    },[])
    useEffect(() => {
        const data = tagPosts?.filter((item) => item.caption.includes(tags))
        setDisplayPosts(data)
    },[tagPosts])

    return (
        <Wrapper>
            <Container>
                <Header>
                    <img src={displayPosts[0]?.imgSrc} alt=""/>
                    <div>
                        <h1>#{tags}</h1>
                        <p><span>{displayPosts.length}</span> {displayPosts.length === 1 ? 'post' : 'posts'}</p>
                        <button>Follow</button>
                    </div>
                </Header>
                <MappedPosts>
                    <p>Top posts</p>
                    {
                        displayPosts?.map((item, id) => (
                            <h1>post</h1>
                        ))
                    }
                </MappedPosts>
            </Container>
        </Wrapper>
    )
}

export default Tags



