import React from 'react'
import Slider from './Slider/Slider'
import LoginInp from './LoginInput/LoginInp'
import styled from "styled-components"

function Login() {
    // justify-content: center;
    // margin: 32px auto 0;
    // max-width: 935px;
    // padding-bottom: 32px;
    // width: 100%;
    return (
    <Main>
        <Wrapper>
            <SlidingWraper>
                <Slider/>
            </SlidingWraper>
            <LoginWraper>
                <LoginInp/>
            </LoginWraper>
        </Wrapper>
    </Main>
    )
}

export default Login
const Main = styled.div`
    background:rgb(250,250,250)
`
const Wrapper = styled.div`
    background:rgb(250,250,250);
    width:100%;
    max-width:935px;
    display:flex;
    margin:auto;
    padding:2rem
`
const SlidingWraper = styled.div`
    width: 50%;
    @media (max-width: 900px) {
        display: none;
    }
`
const LoginWraper = styled.div`
    width: 40%;
    @media (max-width: 900px) {
        margin: auto;
        width:400px;
    }
`