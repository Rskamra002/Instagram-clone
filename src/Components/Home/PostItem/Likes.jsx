import React from 'react'
import styled from 'styled-components'
import Modal from '@material-ui/core/Modal';
import LikesData from './LikesData'

export default function Likes({likes}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
       <LikesBox>
         <div>
           
        <Modal
          open={open}
          onClose={handleClose}
         >
          <LikesData likes={likes} />
        </Modal>
        </div>
        <button type="button" onClick={handleOpen}>{likes.length === 0 ? "No" : 
         likes.length} Likes</button>
        </LikesBox>
  )
}

const LikesBox = styled.div`
  margin:6px 0px;
  button{
    background-color:transparent;
    border:none;
    font-weight:bold;
    cursor: pointer;
  }
`


