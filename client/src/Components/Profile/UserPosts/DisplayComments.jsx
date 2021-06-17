import { Avatar, makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { timeConverter } from "../../../Utils/timeConverter";
import { likeIconPath } from "../../Home/PostItem/svgIcons";

const useStyles = makeStyles(() => ({
    avatar: {
        marginRight: "10px",
    },
}));

const DisplayComments = ({ userId, comment, commentTime }) => {
    const classes = useStyles();
    const [commentedUser, setCommentedUser] = useState();

    // get user data (the user who commented)
    useEffect(() => {
        axios.get(`http://localhost:2511/users/${userId}`).then((res) => {
            setCommentedUser(res.data.data);
        });
    }, []);

    return (
        <Container>
            <Box>
                <Avatar
                    className={classes.avatar}
                    alt={`${commentedUser?.fullname}'s Profile Picture`}
                    src={commentedUser?.profilePic}
                ></Avatar>

                <div>
                    <div>
                        <span>{commentedUser?.username}</span>
                        {` ${comment}`}
                        <svg
                            aria-label="Unlike"
                            class="_8-yf5 "
                            height="12"
                            viewBox="0 0 48 48"
                            width="12"
                        >
                            <path d={likeIconPath}></path>
                        </svg>
                    </div>

                    <Info>
                        <div>
                            {timeConverter(commentTime).split(" ")[0] +
                                timeConverter(commentTime).split(" ")[1][0]}
                        </div>
                        <div>like</div>
                        <div>Reply</div>
                    </Info>

                </div>
            </Box>
        </Container>
    );
};

export default DisplayComments;

const Info = styled.div`
  display: flex;
  gap: 15px;
  font-size: 0.8rem;
  color: grey;
  margin-top: 10px;
  font-weight: 600;
`;

const Box = styled.div`
  margin-bottom: 0px;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  position: relative;
  svg {
    position: absolute;
    right: 30px;
  }
`;
