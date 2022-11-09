
export const GetTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 3600 * 24));
    const diffHours = Math.floor(diff / (1000 * 3600));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);
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