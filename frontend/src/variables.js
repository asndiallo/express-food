export const domain = "http://localhost:8000";

export const isConnected = () => {
    return localStorage.getItem("idUser") !== 'null' 
           && localStorage.getItem("token") !== 'null'
}

export const clearLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('idUser');
}