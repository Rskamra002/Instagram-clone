import React from 'react'
import styled from 'styled-components'

export default function AddComment({ handleAddComment, inputRef, query, setQuery }) {
    return (
        <div>
            <CommentForm onSubmit={handleAddComment}>

                <svg aria-label="Emoji" class="_8-yf5 " fill="#262626" height="30" viewBox="0 0 48 48" width="30"><path d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"></path><path d="M34.9 24c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5zm-21.8 0c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5zM24 37.3c-5.2 0-8-3.5-8.2-3.7-.5-.6-.4-1.6.2-2.1.6-.5 1.6-.4 2.1.2.1.1 2.1 2.5 5.8 2.5 3.7 0 5.8-2.5 5.8-2.5.5-.6 1.5-.7 2.1-.2.6.5.7 1.5.2 2.1 0 .2-2.8 3.7-8 3.7z"></path></svg>

                <input type="text" ref={inputRef} placeholder="Add a comment..." value={query} onChange={(e) => setQuery(e.target.value)} />

                <button>Post</button>
            </CommentForm>
        </div>
    )
}

const CommentForm = styled.form`
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  svg{
    cursor: pointer;
  }
  input{
    display:block;
    width:100%;
    font-size:14px;
    margin-top:5px;
    padding:10px 10px 10px 14px;
    border:none;
    outline:none;
  }
  button{
    width:10%;
    cursor: pointer;
    border:none;
    font-size:18px;
    font-weight:bold;
    color:#55B7F7;
    opacity:0.7;
    background-color:transparent;
  }
  border-top:1px solid rgb(200,200,200);;
  display:flex;
  width:100%;
`