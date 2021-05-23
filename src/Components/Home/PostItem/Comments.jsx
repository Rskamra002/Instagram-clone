import React from 'react'
import styled from 'styled-components'

export default function Comments({allComments,viewMore,setViewMore}) {
  return (
    <>
      {allComments.length > 3 ? <ViewMoreComments >
            <button onClick={() => {setViewMore(!viewMore)}}>{viewMore ? "Hide comments": "View more comments"}</button>
            </ViewMoreComments> : null}
            <AllComments viewMore={viewMore}> 
              {allComments?.map(item => {
                return(
                  <div><span>{item.displayName}</span>{item.comment}</div>
                )
              })}
            </AllComments>
    </>
  )
}
const ViewMoreComments = styled.div`
  button{
    cursor: pointer;
    border:none;
    background-color:transparent;
  }
`
const AllComments = styled.div`
  max-height:58px;
  overflow: ${props => props.viewMore ? "scroll" :"hidden"} ;
  div{
    font-size:15px;
    margin:6px 0px;
    span{
      font-weight:bold;
      display:inline-block;
      margin-right:4px;
    }
  }
`