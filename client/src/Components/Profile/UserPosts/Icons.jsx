import React from 'react'
import { comment, saved, message, unsaved, unlikeIconPath, likeIconPath } from "./SvgIcons";
import styled from 'styled-components'


const Icons = ({ handleLike, like, inputRef, handleSaveUnsave, savedPost, _id }) => {
  return (
    <div>
      <IconsContainer>
        <LikeIcon onClick={handleLike} like={like}>
          {like ? (
            <svg fill="#ed4956" height="24" viewBox="0 0 48 48" width="24" >
              <path d={unlikeIconPath}></path>
            </svg>
          ) : (
            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24" >
              <path d={likeIconPath}></path>
            </svg>
          )}

        </LikeIcon>

        <CommentIcon
          onClick={() => {
            inputRef.current.focus();
          }}
        >
          <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24" >
            <path clip-rule="evenodd" d={comment} fill-rule="evenodd"></path>
          </svg>
        </CommentIcon>

        <SendMsgIcon>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626">
            <path d={message}></path>
          </svg>
        </SendMsgIcon>

        <SavedPostIcon>
          <svg height="24" width="24" viewBox="0 0 48 48" fill="#262626" onClick={() => { handleSaveUnsave(_id) }}
          >
            <path d={savedPost ? saved : unsaved}></path>
          </svg>
        </SavedPostIcon>
      </IconsContainer>
    </div>
  )
}

export default Icons

const IconsContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  top: 0px;
`;

const LikeIcon = styled.button`
  color: ${(props) => (props.like === true ? "red " : "black")};
  border: none;
  background-color: transparent;
  margin: 6px 10px 2px;
  margin-left: 0px;
  cursor: pointer;
`;
const CommentIcon = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  margin: 6px 10px 2px;
`;

const SendMsgIcon = styled.button`
  margin: 6px 10px 2px;
  cursor: pointer;
  border: none;
  background-color: transparent;
`;

const SavedPostIcon = styled.button`
  margin: 6px 0px;
  cursor: pointer;
  border: none;
  position: absolute;
  right: 30px;
  background-color: transparent;
`;