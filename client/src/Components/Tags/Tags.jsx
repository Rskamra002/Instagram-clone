import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from "styled-components"
import DisplayPost from "../Profile/UserPosts/DisplayPost"

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
    console.log(tagPosts)
    console.log(displayPosts)

    return (
        <Wrapper>
            <Container>
                <Header>
                    <img src={displayPosts[0]?.imgSrc} alt=""/>
                    <div>
                        <h1>#{tags}</h1>
                        <p>{displayPosts.length} {displayPosts.length == 1 ? 'post' : 'posts'}</p>
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

const Wrapper = styled.div`
    width: 100%;
    padding-top: 58px;
`

const Container = styled.div`
    width: 68%;
    padding-top: 30px;
    margin: auto;
    border: 1px solid black;
`
const Header = styled.div`
    height: 200px;
    border: 1px solid red;
    display: flex;
    gap: 40px;
    img {
        width: 160px;
        height: 160px;
        border-radius: 50%;
    }
`
const MappedPosts = styled.div`
    border: 1px solid green;

`



