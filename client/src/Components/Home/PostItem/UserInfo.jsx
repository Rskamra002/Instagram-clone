import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

export default function UserInfo({username,imgUrl}) {
  return (
      <User>
        <div>
          <Link to={`/${username}`}>
            <div>
              <img src={imgUrl} alt=""/>
            </div>
            <h4>{username}</h4>
          </Link>
        </div>
      </User>
  )
}

const User = styled.div`
  padding:6px 4px;
  & > div{
    display:inline-block;
  }
  a{
  display:flex;
  align-items:center;
  padding-left:10px;
  text-decoration:none;
  color:black;
  font-size:15px;
  div{
    width:36px;
    height:36px;
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
      color: #2D2D2D;
      font-weight: 600;
      font-size: 14px;
      :hover{
        text-decoration: underline;
      }
    }
}

`