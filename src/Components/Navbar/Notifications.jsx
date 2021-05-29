import React from 'react'
import styles from "./Navbar.module.css"
import styled from "styled-components"

const Notifications = ({showNotifications}) => {

    return (
        <NotificationPannel showNotifications={showNotifications} className={styles.arrow_box_notify}>
            <div className={styles.overs_notify}>
                
            </div>
        </NotificationPannel>
    )
}

const NotificationPannel = styled.div`
    display : ${({showNotifications}) => showNotifications ? "block" : "none"}
`



export {Notifications}
