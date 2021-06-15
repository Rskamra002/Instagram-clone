import styled from "styled-components"


export const Wrapper = styled.div`
    background-color: black;
    height: 100vh;
    width: 100%;
    padding: 25px;
    margin: auto; 
  .slick-arrow{
        margin: 0px 38%;
        z-index: 100;
    }

`
export const Container = styled.div`
  height: 560px;
  max-width: 95%;
  margin-left: 2.5%;
  align-items: center;
  border-radius: 5px;
  padding-top: 2%;
`
export const TopDetails = styled.div`
  margin-top: -480px;
  padding: 0px 10px;
`
export const UserDescription = styled.div`
  display: flex;
  gap: 5px;
  padding: 5px;
  color: white;
  p{
    font-size: 12px;
    color: whitesmoke
  }
  img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
  }
`

export const BottomDetails = styled.div`
  margin-top: 390px;
  padding: 0px 10px;
  display: flex;
  justify-content: space-between;
  input {
    width: 80%;
    border: 1px solid white;
    background: transparent;
    padding: 10px;
    color: whitesmoke;
    border-radius: 20px;
    ::placeholder{
      color: whitesmoke;
    }
  }
`
export const Topper = styled.div`
  display: flex; 
  justify-content: space-between;
`