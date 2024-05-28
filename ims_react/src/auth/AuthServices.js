 class AuthService{
    static setToken(token){
        sessionStorage.setItem('login',token)
    }
    static getToken(){
        sessionStorage.getItem("login")
    }
    static removeToken(){
        sessionStorage.removeItem("login")
    }
 }

 export default AuthService;