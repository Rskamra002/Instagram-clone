import React, { useEffect, useState } from "react";
import DisplayPost from "../UserPosts/DisplayPost";
import axios from 'axios'

const DisplaySavedPosts = ({ postId }) => {
    const [postInfo, setPostInfo] = useState()
    useEffect(() => {
        axios.get(`http://localhost:2511/posts/${postId}`)
            .then(res => setPostInfo(res.data.data))
    }, [])
    return (
        <>
            {postInfo && <DisplayPost {...postInfo} />}
        </>
    )
}

export default DisplaySavedPosts
