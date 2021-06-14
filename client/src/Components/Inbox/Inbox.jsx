import React from 'react'
import styled from 'styled-components'
import Users from './User/Users'
import ChatBox from './Chat/ChatBox'

const Inbox = () => {
    return (
        <Wrapper>
            <Container>
                <Users/>
                <ChatBox/>
            </Container>
        </Wrapper>
    )
}

export {Inbox}
const Wrapper = styled.div`
    padding-top:70px;
    padding-bottom:70px;
    background: #FAFAFA;
`
const Container = styled.div`
    background-color: white;
    display: flex;
    justify-content:space-between;
    width:70%;
    margin:auto;
`