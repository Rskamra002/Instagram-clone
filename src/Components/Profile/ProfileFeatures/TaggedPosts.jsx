import React from 'react'
import styles from './ProfileFeatures.module.css'
import styled from 'styled-components'

function TaggedPosts() {
    return (
        <Wrapper>
            <img src='./assets/svgs/tag.svg' alt="" class={styles.icon} />
            <Title>Photos of you</Title>
            <div>When people tag you in photos, they'll appear here</div>
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

export default TaggedPosts
