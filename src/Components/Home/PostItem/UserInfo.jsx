import React from 'react'
import styled from 'styled-components'

export default function UserInfo() {
  return (
      <User>
          <div>
            <img src="https://images.unsplash.com/photo-1621694837408-f751406fda86?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" alt=""/>
          </div>
          <h4>username</h4>
      </User>
  )
}

const User = styled.div`
  display:flex;
  align-items:center;
  padding:4px 0px;
  padding-left:10px;
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
`