const URL = "http://localhost:5000/"

export const fetchFriends = async ()=>{
    const friendsURL = URL+"friends"
    console.log(friendsURL);
    const res = await fetch(friendsURL);
    console.log(res);
    const data = await res.json()
    return data;
}