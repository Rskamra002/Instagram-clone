import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

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
        const data = tagPosts?.filter((item) => item.caption.includes("aesthetic"))
        setDisplayPosts(data)
    },[tagPosts])
    console.log(tagPosts)
    console.log(displayPosts)

    return (
        <div>
            
        </div>
    )
}

export default Tags
