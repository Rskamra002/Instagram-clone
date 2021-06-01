import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default function UserInfo({postOwnerUserName,postOwnerPic}) {
  return (
      <User>
        <div>
          <Link to={`/${postOwnerUserName}`}>
            <div>
              <img src={postOwnerPic} alt="profile"/>
            </div>
            <h4>{postOwnerUserName}</h4>
          </Link>
        </div>
      </User>
  )
}

const User = styled.div`
  & > div{
    display:inline-block;
  }
  a{
  display:flex;
  align-items:center;
  padding:8px 0px;
  padding-left:10px;
  text-decoration:none;
  color:black;
  div{
    width:16px;
    border-radius:50%;
    margin-right:12px;
    overflow:hidden;
    img{
      max-width:100%;
      max-height:100%;
      cursor: pointer;
    }
  }
  h4{
      cursor: pointer;
    }
}

`