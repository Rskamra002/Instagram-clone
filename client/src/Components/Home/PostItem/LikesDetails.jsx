import {useEffect,useState} from 'react'
import axios from 'axios';
import {
  Container,
  makeStyles,
  Paper,
  Modal,
  Avatar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import UnfollowPopUpModal from './UnfollowPopUp';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
  },
  paper: {
    width: "30%",
    margin: "auto",
    marginTop: "20vh",
    outline: "none",
    borderRadius: "15px",
  },

  close: {
    fontSize:"30px",
    padding:"4px",
    "& :hover": {
      cursor: "pointer",
    },
  },
}));

export default function LikesDetails({likes,showLikes,handleHideLikes,loggedInUserFollowing,loggedInUserId}) {
  const classes = useStyles();

  const [likedUsers,setLikedUsers] = useState([]);

  const [allLoggedInUserFollowing,setAllLoggedInUserFollowing] = useState(loggedInUserFollowing);

  const loggedInUser = useSelector(state => state.login.user);


  // unfollow pop up model
  const [openModel2, setOpenModel2] = useState(false);

  const [goingToUnfollow,setGoingToUnfollow] = useState({});
  const handleOpenModel2 = (user) => {
    setGoingToUnfollow(user)
    setOpenModel2(true);
  };
  const handleCloseModel2 = () => {
    setOpenModel2(false);
  };
  
  const handleClose = () => {
    handleHideLikes(false);
  };

  const handleFollow = (userId) => {
    const payload ={
        userId: userId
    }
    axios.patch(`http://localhost:2511/users/follow/${loggedInUserId}`,payload).then(() => {
      setAllLoggedInUserFollowing([...allLoggedInUserFollowing,userId])
    })
  }

  const handleUnFollow = (userId) => {
    const payload ={
        userId: userId
    }
    axios.patch(`http://localhost:2511/users/unfollow/${loggedInUserId}`,payload).then(() => {
      const updatedAllLoggedInUserFollowing = allLoggedInUserFollowing.filter((item) => userId !== item);
      setAllLoggedInUserFollowing(updatedAllLoggedInUserFollowing)
    }).finally(() => {
      handleCloseModel2()
    })
  }

  console.log(likedUsers);

  useEffect(() => {
    likes.forEach((userId) => {
      if(userId === loggedInUser._id){
        setLikedUsers(prev => [{"userId":loggedInUser._id, "username":loggedInUser.username, "profilePic":loggedInUser.profilePic, "fullname": loggedInUser.fullname},...prev])
      } else{
        axios.get(`http://localhost:2511/users/${userId}`).then((res) => {
          setLikedUsers(prev => [...prev,{"userId":res.data.data._id, "username":res.data.data.username, "profilePic":res.data.data.profilePic, "fullname": res.data.data.fullname}])
        })
      }
    })
  },[])
  return (
    <Container className={classes.container}>
      <Modal open={showLikes}>
        <Paper className={classes.paper}>
          <Wrapper1>
            <Title>Likes</Title>
            <CloseIcon className={classes.close} onClick={handleClose} />
          </Wrapper1>
          <Liked>
            {likedUsers?.map((user) => {
              return (
                <Wrapper2 key={user.id}> 
                  <Link to={`/${user.username}`}>
                    <Avatar
                      src={user.profilePic}
                      alt={`${user.fullname}'s Profile Picture`}
                    ></Avatar>
                  </Link>
                  <MainDiv>
                    <Link to={`/${user.username}`}>
                      <div>{user.username}</div>
                    </Link>
                    <div>{user.fullname}</div>
                  </MainDiv>
                  {user.userId === loggedInUser._id ? null : allLoggedInUserFollowing.includes(user.userId) ? <Button onClick={() => handleOpenModel2(user)}>Following</Button> :<Button onClick={() => handleFollow(user.userId)} style={{backgroundColor:"#0095F7", color:"white", marginRight:"10px"}}>Follow</Button>} 
                </Wrapper2>
              );
            })}
          </Liked>
        </Paper>
      </Modal>


      {/* unfollow confirm pop up model */}
      <UnfollowPopUpModal openModel2={openModel2} goingToUnfollow={goingToUnfollow} handleCloseModel2={handleCloseModel2} handleUnFollow={handleUnFollow}/>
    </Container>
  );
};

const Title = styled.h4`
  text-align: center;
  width:100%;
  font-weight:bold;
  padding: 10px;
`;

const Wrapper1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom:1px solid lightgrey;
  padding: 4px 10px;
  margin: 14px;
`;


const Wrapper2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  margin: 14px;
  border-top:3px solid white;
`;

const Button = styled.button`
  background: white;
  font-weight: bold;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  padding: 8px 18px;
  :hover {
    cursor: pointer;
  }
`;

const MainDiv = styled.div`
  flex-grow: 1;
  margin-left: 14px;
  a{
    text-decoration:none;
    color:black;
    font-weight: 500;

    &:hover{
      text-decoration:underline;
    }
  }
  
  div:nth-child(1) {
    margin-left:2px;
    margin-bottom:1px;
  }
  div:nth-child(2) {
    color: grey;
    font-size:15px;
  }
`;

const Liked = styled.div`
  overflow-y: scroll;
  height: 400px;
`;

