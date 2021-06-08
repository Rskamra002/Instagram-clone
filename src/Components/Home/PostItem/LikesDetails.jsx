import {useEffect,useState} from 'react'
import axios from 'axios';
// import UserInfo from './UserInfo'
import {
  Container,
  makeStyles,
  Divider,
  Paper,
  Modal,
  Avatar,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useSelector } from "react-redux";
import styled from "styled-components";
// styling material ui elements

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
    right: 30,
    top: 20,
    color: "white",
    position: "absolute",
    "& :hover": {
      cursor: "pointer",
    },
  },
}));

// function getModalStyle() {
//   return {
//     top: `${50}%`,
//     left: `${50}%`,
//     transform: `translate(-${50}%, -${50}%)`,
//   };
// }

export default function LikesDetails({likes,showLikes,handleHideLikes}) {
  const classes = useStyles();
  const [likedUsers,setLikedUsers] = useState([]);
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    // setOpen(false);
    handleHideLikes(false);
  };

  useEffect(() => {
    likes.forEach((userId) => {
      axios.get(`https://json-server-mocker-neeraj-data.herokuapp.com/instaUsers/${userId}`).then((res) => {
      console.log(res.data)
        setLikedUsers(prev => [...prev,{"username":res.data.username, "profilePic":res.data.profile_pic}])
      })
    })
  },[])
  console.log(likedUsers)
  // return (
  //   <div style={modalStyle} className={classes.paper}>
  //     <h3 id="simple-modal-title">{likes.length} likes</h3>
  //     {likedUsers?.map(({username,profilePic}) => {
  //       return <UserInfo username={username} imgUrl={profilePic} />
  //     })}
  //   </div>
  // );
  return (
    <Container className={classes.container}>
      <Modal open={showLikes}>
        <Paper className={classes.paper}>
          <Wrapper>
            <Title>Likes</Title>
            <CloseIcon onClick={handleClose} />
          </Wrapper>
          <Divider />
          <Liked>
            {likedUsers?.map((user) => {
              return (
                <Wrapper>
                  <Avatar
                    src={user.profilePic}
                    alt={`${user.fullname}'s Profile Picture`}
                  ></Avatar>
                  <MainDiv>
                    <div>{user.username}</div>
                    <div>{user.fullname}</div>
                  </MainDiv>
                  <Button>Following</Button>
                </Wrapper>
              );
            })}
          </Liked>
        </Paper>
      </Modal>
    </Container>
  );
};

export const Title = styled.p`
  text-align: center;
  padding: 10px;
  font-weight: 500;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  margin: 14px;
`;

export const Button = styled.button`
  background: white;
  font-weight: bold;
  border: 1px solid rgb(231, 231, 231);
  border-radius: 5px;
  padding: 8px 18px;
  :hover {
    cursor: pointer;
  }
`;

export const MainDiv = styled.div`
  flex-grow: 1;
  margin-left: 14px;
  div:nth-child(1) {
    font-weight: 500;
  }
  div:nth-child(2) {
    color: grey;
  }
`;

export const Liked = styled.div`
  overflow-y: scroll;
  height: 400px;
`;

