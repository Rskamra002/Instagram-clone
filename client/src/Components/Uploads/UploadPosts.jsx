import { LinearProgress, makeStyles } from "@material-ui/core"
import { lightGreen } from "@material-ui/core/colors"
import axios from "axios"
import { useEffect } from "react"
import { useRef, useState } from "react"
import { Redirect } from "react-router"
import { loadData } from "../../Utils/localStorage"
import { Bios, ChooseFile, Container, OptionsSide, PostButtons, Preview, Wrapper, TagBox } from "./uploadCss"

const useStyles = makeStyles((theme) => ({
    loader: {
      marginTop: theme.spacing(0.5),
    }
  }));

const UploadPosts = () => {

    const classes = useStyles();
    const [imgUrl, setImgUrl] = useState("")
    const [preview, setPreview] = useState(null)
    const [caption, setCaption] = useState("")
    const [state, setState] = useState(false)
    const [err, setErr] = useState(false)
    const [load, setLoad] = useState(false)
    const [typeofMedia, setTypeofMedia] = useState("")
    const [instaUsers, setInstaUsers] = useState([])

    const [suggestedTag,setSuggestedTag] = useState([])
    const [allTags,setAllTags] = useState([])
    const [isCheckingTags,setIsCheckingTags] = useState(false)

    const [tagUser, setTagUser] = useState([])
    const [taggedUser,setTaggedUser] = useState(false)
    const [suggestedTagUser, setSuggestedTagUser] = useState([])



    const imgRef = useRef()
    useEffect(() => {
        const endpoint = imgUrl?.name
        let ext = endpoint?.trim().split("").splice(endpoint.length-4).join("")
        let type = `${ext === '.mp4' ? 'video': 'image'}`
        setTypeofMedia(type)
    },[imgUrl])

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
        setLoad(true)
        const data = new FormData()
        data.append('file', imgUrl)
        data.append('upload_preset', 'Khushboo')
        

        await axios({
            method:"post",
            url: `https://api.cloudinary.com/v1_1/dbc71imie/${typeofMedia}/upload`,
            data:  data
        })
        .then((res) => postPictureToApi(res.data.secure_url))
        .catch((err) => setErr(true))

    }
    useEffect(() => {
        axios.get("http://localhost:2511/hashtags").then((res)=>setAllTags(res.data.data))
        axios.get("http://localhost:2511/users").then((res) => setInstaUsers(res.data.data))
    }, [])

    useEffect(() => {
        let x = caption?.trim().split(" ").filter((item) => item[0] == "#")[0]?.substring(1)
        let output = allTags?.filter((item) => item.hashtagName.toLowerCase().indexOf(x) !== -1 ? true : false).map(item => [item._id, item.hashtagName])
        setSuggestedTag(output)

        let u = caption?.trim().split(" ").filter((item) => item[0] == "@")[0]?.substring(1)
        let output2 = instaUsers?.filter((item) => item.username.toLowerCase().indexOf(u) !== -1 ? true : false).map(item => [item._id, item.username])
        setSuggestedTagUser(output2)

    },[caption])

    const handleCaption = (e)=>{
        setCaption(e.target.value)
        if(caption[caption.length-1] === "#"){
            setIsCheckingTags(true)
        }        
       else if(caption[caption.length-1] === " "){
        setIsCheckingTags(false)
        }else if(caption[caption.length-1] === "@"){
            setTaggedUser(true)
        }else if (caption[caption.length-1] === " "){
            setTaggedUser(false)
        }
    }

    const addHastagToCaption = (e) => {
        let tagss = e.target.textContent
        setCaption(prev => prev.trim().split("#").shift() + tagss)
        setIsCheckingTags(false)
    }
    const addUserToCaption = (e) => {
        let userss = e.target.textContent
        setCaption(prev => prev.trim().split("@").shift() + userss)
        setTaggedUser(false)
    }
    
    const postPictureToApi = (data) => {
        const userid = loadData("users")._id

        const payload = {
            userId: userid,
            src: data,
            caption: caption,
        }
        axios.post("http://localhost:2511/posts/addpost", payload)
        .then((res) => setState(true))
        .catch((err) => console.log(err))
        setLoad(false)
    }
    if(state){
        return <Redirect exact push to="/"/>
    }

    return (
        <>
        <Wrapper>
            {load && <LinearProgress className={classes.loader} />}
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
                            preview && typeofMedia === 'image' ?
                            
                            (<img src={preview} alt="preview" width="100%" height="100%"/>) : 
                            (<video src={preview} width="100%" height="100%"></video>)
                        }
                    </Preview>
                    {err && <p>Oops!. Failed in Loading the Image. Please try again.</p>}
                    <button>Edit</button>
                    <h4>Details</h4>
                    <Bios placeholder="Add a Caption" type="text" value={caption}
                    onChange={handleCaption}
                    />
                    <br/>
                    {
                        isCheckingTags && suggestedTag.length > 0 &&
                        <TagBox>
                            {
                                suggestedTag?.map((item) => 
                                    <div key={item[0]} onClick={addHastagToCaption}>{`#${item[1]}`}</div>
                                )
                            }
                        </TagBox>
                    }
                    {
                        taggedUser &&
                        <TagBox>
                            {
                                suggestedTagUser?.map((item) => 
                                <div key={item[0]} onClick={addUserToCaption}>{`@${item[1]}`}</div>
                            )
                            }
                        </TagBox>
                    }
                    <br/>
                    <PostButtons>
                        <button onClick={postPicturToImgur}>POST</button>
                        <h5>Save Draft</h5>
                    </PostButtons>
                </OptionsSide>
            </Container>
        </Wrapper>
        </>
    )
}

export {UploadPosts}


