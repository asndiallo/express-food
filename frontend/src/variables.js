export const domain = "http://localhost:8000";

export const isConnected = () => {
    return localStorage.getItem("id") !== 'null' 
           && localStorage.getItem("token") !== 'null'
}

export const clearLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
}