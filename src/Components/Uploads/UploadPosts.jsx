import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Redirect } from "react-router"
import {v4 as uuid} from "uuid"
import { loadData } from "../../Utils/localStorage"
import { Bios, ChooseFile, Container, OptionsSide, PostButtons, Preview, Wrapper } from "./uploadCss"

const UploadPosts = () => {

    const [imgURL, setImgUrl] = useState(null)
    const [preview, setPreview] = useState(null)
    const [caption, setCaption] = useState("")
    const [state, setState] = useState(false)
    const [err, setErr] = useState(false)

    const imgRef = useRef()

    const showPreview = (e) => {
        setImgUrl(e.target.files[0])
        if(!imgRef.current.files[0]){
            return;
        }
        //for preview
        const img = URL.createObjectURL(imgRef.current.files[0])
        setPreview(img)
        setErr(false)
    }

    const postPicturToImgur = async () => {
        await axios({
            method:"post",
            url: "https://api.imgur.com/3/image",
            headers: {
                'Authorization': 'Client-ID 75c7c822f1a27d0',
                'Content-Type': 'application/json',
            },
            data:  imgURL
        })
        .then((res) => postPictureToApi(res.data.data.link))
        .catch((err) => setErr(true))
    }

    
    const postPictureToApi = (data) => {
        const userid = loadData("users").id

        const payload = {
            id: uuid(),
            userId: userid,
            imgSrc: data,
            caption: caption,
            likes: [],
            comments: [],
            dateCreation: Date.now()
        }
        axios.post("https://json-server-mocker-neeraj-data.herokuapp.com/instaPosts", payload)
        .then((res) => setState(true))
        .catch((err) => console.log(err))
    }
    if(state){
        return <Redirect exact push to="/"/>
    }

    return (
        <Wrapper>
            <Container>
                <ChooseFile
                ref={imgRef}
                type="file"
                onChange={showPreview}
                />
                <OptionsSide>
                    <h1>Add New Post</h1>
                    <h4>Cover</h4>
                    <p>Must be a JPG or PNG file. The minimum recommended size is 492 x 762 pixels.</p>
                    <Preview>
                        {
                            imgURL && <img src={preview} alt="preview" width="100%" height="100%"/>
                        }
                    </Preview>
                    {err && <p>Oops!. Failed in Loading the Image. Please try again.</p>}
                    <button>Edit</button>
                    <h4>Details</h4>
                    <Bios placeholder="Add a Caption" type="text"
                    onChange={(e) => setCaption(e.target.value)}
                    />
                    <br/><br/>
                    <PostButtons>
                        <button onClick={postPicturToImgur}>POST</button>
                        <h5>Save Draft</h5>
                    </PostButtons>
                </OptionsSide>
            </Container>
        </Wrapper>
    )
}

export {UploadPosts}


