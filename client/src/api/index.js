const URL = "http://localhost:5000/"

export const fetchFriends = async (id)=>{
    const usersURL = URL+"users/friends"
    const res = await fetch(usersURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id})
    })
    const data = await res.json()
    return data;
}
export const fetchFavorites = async (id)=>{
    const usersURL = URL+"users/favorites"
    const res = await fetch(usersURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id})
    })
    const data = await res.json()
    return data;
}

export const fetchUserByName = async (firstName,lastName)=>{
    const userURL = URL+"users/fetch-by-name"
    const res = await fetch(userURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({firstName,lastName})
    })
    const data = await res.json()
    return data;
}

export const sendMessage = async (message)=>{
    const messageURL = URL+"messages/send"
    await fetch(messageURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(message)
    })
}
    
export const getConversation = async (from,to)=>{
    const messageURL = URL+"messages/get-conversation"
    const res = await fetch(messageURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({from,to})
    })
    const data = await res.json()
    return data;
}
    