

const storeInSession = (key, value) => {
   return sessionStorage.setItem(key, value);
}

const lookInSession = (key) => {
    return sessionStorage.getItem(key)
} 


const removeFromSession = key => {
    return sessionStorage.removeItem(key);
}

const logOUtUser = () => {
    sessionStorage.clear();
}

export {storeInSession, lookInSession, removeFromSession, logOUtUser};