import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {Wrapper, Container, Header, MappedPosts} from "./TagStyle"
import { Grid} from "@material-ui/core";
import DisplayPost from "../Profile/UserPosts/DisplayPost"




const Tags = () => {
    const {tags} = useParams()
    console.log(tags)

    const [tagPosts, setTagPosts] = useState([])
    const [allPosts, setAllposts] = useState([])
    const [displayPosts, setDisplayPosts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:2511/hashtag/posts/${tags}`)
        .then((res) => setTagPosts(res.data.data.postIds))
        .catch((err) => console.log("error"))


        axios.get("http://localhost:2511/posts")
        .then((res) => setAllposts(res.data.data))
        .catch((err) => console.log("error"))
    },[tags])
    useEffect(() => {
        const data = allPosts?.filter((item) => tagPosts.includes(item._id))
        setDisplayPosts(data)
    },[allPosts])

    

    return (
        <Wrapper>
            <Container>
                <Header>
                    <img src={displayPosts[0]?.src} alt=""/>
                    <div>
                        <h1>#{tags}</h1>
                        <p><span>{tagPosts.length}</span> {tagPosts.length === 1 ? 'post' : 'posts'}</p>
                        <button>Follow</button>
                    </div>
                </Header>
                <MappedPosts>
                    <p style={{marginBottom:"15px", fontSize:"16px"}}>Top posts</p>
                    <Grid container spacing={3}>

                    {displayPosts?.map((post, id) => (
                        <DisplayPost key={id} {...post} />
                    ))}
                    </Grid>
                </MappedPosts>
            </Container>
        </Wrapper>
    )
}

export default Tags



