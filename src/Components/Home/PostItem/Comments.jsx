import React from 'react'
import styled from 'styled-components'

export default function Comments({allComments,viewMore,setViewMore}) {
  console.log(allComments)
  return (
    <>
      {allComments.length > 2 ? <ViewMoreComments >
            <button onClick={() => {setViewMore(!viewMore)}}>{viewMore ? "Hide comments": "View more comments"}</button>
            </ViewMoreComments> : null}
            <AllComments viewMore={viewMore}> 
              {allComments?.map(item => {
                return(
                  <div>
                    <span>
                      <span>{item.displayName}</span>
                      {item.comment}
                    </span>
                    <span>
                      {item.commentTime}
                    </span>
                  </div>
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
  overflow-y: ${props => props.viewMore ? "scroll" :"hidden"} ;
  div{
    font-size:15px;
    margin:6px 0px;
    display:flex;
    justify-content:space-between;
    & > span > span{
      font-weight:bold;
      display:inline-block;
      margin-right:4px;
    }

  }
`