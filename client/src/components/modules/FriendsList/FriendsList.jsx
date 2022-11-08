import React from 'react'
import { fetchFriends } from '../../../api'
import FriendItem from '../../cores/FriendItem/FriendItem'
import "./FriendsList.scss"

const FriendsList = () => {
    let [friends,setFriends] = React.useState([])

    React.useEffect(()=>{
        fetchFriends().then(data=> setFriends(data))
    },[])
    console.log(friends);
  return (
    <div className='friends-list'>
        <div className="friends-list-header">
            <FriendItem friend={friends[0]} />
        </div>
        <div className="friends-list-content">
            {
                friends.map((friend,key)=> <FriendItem friend={friend} key={key} />)
            }
        </div>
    </div>
  )
}

export default FriendsList