import React from 'react'
import styles from "./Navbar.module.css"
import styled from "styled-components"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { timeConverter } from '../../Utils/timeConverter';
import {v4 as uuid} from 'uuid';
import { Link } from 'react-router-dom';

const Notifications = ({showNotifications}) => {

  const allNotifications = useSelector(state => state.notifications.allNotifications);



    return (
        <NotificationPannel showNotifications={showNotifications} className={styles.arrow_box_notify}>
            <div className={styles.overs_notify}>
                <List>
                {allNotifications?.length > 0 ? allNotifications?.map(item => {
                      return  <ListItem id={uuid()}>
                          <Left>
                            <ProfilePic src={item.fromUserSrc} alt="profilepic" /> 
                            <Text>
                                {/* taking his username */}
                                <Link to={`/${item.notification.split(" ")[0]}`}>
                                    {item.notification.split(" ")[0]} 
                                </Link>
                                {/* taking other info  */}
                                {item.notification.split(" ").slice(1).join(" ")}.</Text> <TimeAgo>{ timeConverter(item.timestamp) === 'just now' ? "now" :  timeConverter(item.timestamp).split(" ")[0] + timeConverter(item.timestamp).split(" ")[1][0]}</TimeAgo> 
                          </Left>
                          <Right>
                              {item.postSrc ? <PostItem src={item.postSrc} alt="post" /> : null}
                            
                          </Right>
                        </ListItem>
                    }): <Text style={{fontSize:"16px"}}>Sorry! you don't have any notifications</Text>}
                </List>
            </div>
            
        </NotificationPannel>
    )
}

const NotificationPannel = styled.div`
    z-index:500;
    display : ${({showNotifications}) => showNotifications ? "block" : "none"};
`

const List = styled.li`
    display:flex;
    flex-direction:column;
    justify-content:center;
    padding:20px;
`

const ListItem = styled.li`
    display:flex;
    justify-content:space-between;
    align-items:center;
    list-style:none;
    margin:3px 0px;
`
const Left = styled.li`
    display:flex;
    align-items:center;
    margin:6px 0px;
`
const Right = styled.li`
`

const ProfilePic = styled.img`
    width:42px;
    height:42px;
    border-radius:50%;
`
const Text = styled.span`
    font-size:14px;
    margin:0px 8px;
    a{
        text-decoration:none;
        font-weight:bold;
        color:black;
        margin:0px 4px;
    }
`
const TimeAgo = styled.span`
    font-size:13px;
`
const PostItem = styled.img`
    width:40px;
    height:40px;    
`



export {Notifications}
