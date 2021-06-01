import styled from "styled-components"

const UploadPosts = () => {
    return (
        <Wrapper>
            <Container>
                <ChooseFile type="file"/>
                <OptionsSide>
                    <h1>Add New Post</h1>
                    <h4>Cover</h4>
                    <p>Must be a JPG or PNG file. The minimum recommended size is 492 x 762 pixels.</p>
                    <Preview></Preview>
                    <button>Edit</button>
                    <h4>Details</h4>
                    <Bios placeholder="Add your bio" type="text"/>
                    <br/><br/>
                    <PostButtons>
                        <button>POST</button>
                        <h5>Save Draft</h5>
                    </PostButtons>
                </OptionsSide>
            </Container>
        </Wrapper>
    )
}

export {UploadPosts}

const Wrapper = styled.div`
    background: white;
    padding-top: 54px;
    height:100vh;
`
const Container = styled.div`
    width:68%;
    display: flex;
    gap: 50px;
    margin: auto;
    padding: 4% 0px;
    
`
const OptionsSide = styled.div`
    width: 77%;
    h1 {
        font-weight: 300;
        margin-bottom: 30px;
    }
    h4{
        font-weight: 600;
        margin-bottom: 8px;
    }
    p{
        color: #ADADAD;
        font-size: 12px;
    }
    button {
        background: transparent;
        border: none;
        outline: none;
        color: #3897F0;
        font-size: 12px;
        font-weight: 600;
    }
`

const Bios = styled.input`
    border: 1px solid #EFEFEF;
    padding: 15px;
    width: 90%;
    border-radius: 5px;
    outline: none;
`

const ChooseFile = styled.input`
    border:1px dashed #DBDBDB;
    width: 33%;
    background: #FAFAFA;
    height: 280px;
`

const Preview = styled.div`
    margin: 10px 0px;
    width: 100px;
    height: 100px;
    background: #FAFAFA;
    border: 1px solid #DBDBDB;
`
const PostButtons = styled.div`
    width: 24%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
        background: #0095F6;
        color: white;
        padding: 10px;
        border-radius: 5px;
    }
    h5 {
        color: #0095F6;
    }
`
