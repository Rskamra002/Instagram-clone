import React from 'react'
import styled from "styled-components"

const Details = () => {
    return (
        <InstaDetails>
            <p>About . Help . Press . API . Jobs . Privacy . Terms . Locations . Top . Accounts . Hashtags . Language . English</p>  
            <br/>
            <h6>© 2021 INSTAGRAM FROM FACEBOOK</h6>
        </InstaDetails>
    )
}

export {Details}

const InstaDetails = styled.div`
    margin-top: 40px;
    color: rgb(209,209,209);
    p {
        font-size: 11px;
    }
    h6 {
        font-weight: 400;
    }
`
