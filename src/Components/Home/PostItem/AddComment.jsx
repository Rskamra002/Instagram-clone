import React from 'react'
import styled from 'styled-components'

export default function AddComment({handleAddComment,inputRef,query,setQuery}) {
  return (
    <div>
      <CommentForm onSubmit={handleAddComment}>
             <input type="text" ref={inputRef} placeholder="Add a comment..." value={query} onChange={(e) => setQuery(e.target.value)}/>
             <button>Post</button>
      </CommentForm>
    </div>
  )
}

const CommentForm = styled.form`
  input{
    display:block;
    width:90%;
    padding:10px;
    border:none;
    border-right:1px solid black;
    outline:none;
  }
  button{
    width:10%;
    cursor: pointer;
    border:none;
    background-color:transparent;
  }
  border-top:1px solid black;
  display:flex;
 
  width:100%;
`