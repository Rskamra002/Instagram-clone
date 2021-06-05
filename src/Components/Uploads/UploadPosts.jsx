import axios from "axios"
import { useRef, useState } from "react"
import {v4 as uuid} from "uuid"
import { loadData } from "../../Utils/localStorage"
import { Bios, ChooseFile, Container, OptionsSide, PostButtons, Preview, Wrapper } from "./uploadCss"



const UploadPosts = () => {

    const [imgURL, setImgUrl] = useState(null)
    const [caption, setCaption] = useState("")

    const imgRef = useRef()

    console.log(imgURL)
    const showPreview = () => {
        if(!imgRef.current.files[0]){
            return;
        }
        const img = URL.createObjectURL(imgRef.current.files[0])
        setImgUrl(img)
    }

    const postPicture = () => {
        const userid = loadData("users").id

        const payload = {
            id: uuid(),
            userId: userid,
            imgSrc: imgURL,
            caption: caption,
            likes: [],
            comments: [],
            dateCreation: Date.now()
        }
        axios.post("https://json-server-mocker-neeraj-data.herokuapp.com/instaPosts", payload)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err))
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
                            imgURL && <img src={imgURL} alt="preview" width="100%" height="100%"/>
                        }
                    </Preview>
                    <button>Edit</button>
                    <h4>Details</h4>
                    <Bios placeholder="Add a Caption" type="text"
                    onChange={(e) => setCaption(e.target.value)}
                    />
                    <br/><br/>
                    <PostButtons>
                        <button onClick={postPicture}>POST</button>
                        <h5>Save Draft</h5>
                    </PostButtons>
                </OptionsSide>
            </Container>
        </Wrapper>
    )
}

export {UploadPosts}


