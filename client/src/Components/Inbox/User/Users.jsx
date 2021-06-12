import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../Redux/Suggestions/Action';
import { loadData } from '../../../Utils/localStorage';

function Users() {
    const loggedInUser = loadData("users");
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    return (
        <div style={{border:"1px solid black",width:"30%"}}>
            <div>
                {/* user name  */}
                {/* svg */}
            </div>
            <div>
                {
                    user?.map(item=>(
                        <div>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Users
