import React from "react"
import {Container,Paper,Modal, makeStyles } from "@material-ui/core";
import styled from "styled-components"
import CloseIcon from '@material-ui/icons/Close';
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
      width: "30%",
      margin: "auto",
      height: "400px",
      marginTop: theme.spacing(14),
      outline: "none",
      borderRadius: '12px'
    }
}));

const SearchPopUp = ({open, close}) => {
  const classes = useStyles();
  const [query, setQuery] = useState("")

    return (
        <>
         <Container>
            <Modal open={true}
                >
                <Paper className={classes.paper}>
                    <Head>
                        <CloseIcon onClick={close}/>
                        <h4>New Message</h4>
                        <p>Next</p>
                    </Head>
                    <Search>
                        <h5>To: </h5>
                        <input placeholder="Search..." value={query} 
                        onChange={(e) => setQuery(e.target.value)}
                        />
                    </Search>
                    <Suggest>
                        <h5>Suggested</h5>
                        {
                            !query && 
                            <p>No account found.</p>
                        }
                    </Suggest>
                    
                </Paper>
            </Modal>
        </Container>   
        </>
    )
}

export {SearchPopUp}

const Head = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid lightgrey;
    padding: 2% 3%;
    h4{
        color: #454545;
        font-weight: 600
    }
    p{
        color: #D3EDFE;
        font-weight: 600
    }
    
`
const Search = styled.div`
    display: flex;
    border-bottom: 1px solid lightgrey;
    padding: 4% 3%;
    h5{
        color: #454545;
        font-weight: 600
    }
    input {
        width: 100%;
        outline: none;
        border: none;
        padding-left:10%;
        ::placeholder{
            color: lightgrey
        }
    }
`
const Suggest = styled.div`
    padding: 3%;
    overflow-y: scroll;
    height: 290px;
    h5{
        color: #454545;
        font-weight: 600
    }
    p{
        color: lightgrey;
        padding-top: 6%;
        font-size: 14px;
    }
`
