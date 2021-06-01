import React from 'react'
import styles from './ProfileFeatures.module.css'
import styled from 'styled-components'

function SavedPosts() {
    return (
        <Wrapper>
            <img src='./assets/svgs/save.svg' alt="" class={styles.icon} />
            <Title>Save</Title>
            <div>Save photos and videos that you want to see again. No <br />  one is notified, and only you can see what you've saved.</div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin:auto;
    text-align:center;
    font-size:0.8rem;
`;

const Title = styled.div`
    font-size:2rem;
    font-weight:lighter;
    margin:10px 0px;
    color:#262626;
`;

export default SavedPosts
