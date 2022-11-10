
export const GetTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor(diff / (1000 * 3600));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);
    if(diffDays > 7)
        return `${date.getDate()>9 ? date.getDate() : "0"+date.getDate()}/${date.getMonth()>9 ?date.getMonth() : "0"+date.getMonth()}/${date.getFullYear()}`;
    if (diffDays > 0) 
        return `${diffDays} days ago`;
    if (diffHours > 0) 
        return `${diffHours} hours ago`;
    if (diffMinutes > 0) 
        return `${diffMinutes} minutes ago`;
    if (diffSeconds > 0) 
        return `${diffSeconds} seconds ago`;
   
    return "Just now";
    
    };