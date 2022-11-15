const URL = "http://localhost:5000/"

export const init = async ()=>{
    const usersURL = URL+"users/init"
    await fetch(usersURL)
   
}
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
export const fetchUsers = async (id)=>{
    const usersURL = URL+"users/"
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
        mode:'cors',
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
    const res = await fetch(messageURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(message)
    })
    const data = await res.json()
    return data;
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
    
export const updateStatus = async (id,status)=>{
    const messageURL = URL+"users/update-status"
    await fetch(messageURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id,status})
    })
}
    
export const removeMessage = async (id)=>{
    const messageURL = URL+"messages/remove"
    await fetch(messageURL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({id})
    })
}
    