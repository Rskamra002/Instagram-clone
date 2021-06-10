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
         likes.length} likes</button>
        </LikesBox>
  )
}

const LikesBox = styled.div`
  margin:4px 0px 12px;
  button{
    background-color:transparent;
    font-size:15px;
    border:none;
    font-weight:560;
    cursor: pointer;
  }
`


