import {useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import UserInfo from './UserInfo'


function getModalStyle() {
  return {
    top: `${50}%`,
    left: `${50}%`,
    transform: `translate(-${50}%, -${50}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    height:'60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



export default function LikesData({likes}) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [likedUsers,setLikedUsers] = useState([])

  useEffect(() => {
    likes.forEach((userId) => {
      axios.get(`https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${userId}`).then((res) => {
      console.log(res.data)
        setLikedUsers(prev => [...prev,{"username":res.data.username, "profilePic":res.data.profile_pic}])
      })
    })
  },[])
  console.log(likedUsers)
  return (
    <div style={modalStyle} className={classes.paper}>
      <h3 id="simple-modal-title">{likes.length} likes</h3>
      {likedUsers?.map(({username,profilePic}) => {
        return <UserInfo username={username} imgUrl={profilePic} />
      })}
    </div>
  );
}
