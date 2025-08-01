import {jwtDecode} from "jwt-decode"
//The unit of exp is always seconds since Unix epoch so diving by thousand;

export const isTokenExpired = (token) => {
    try{
        const decoded = jwtDecode(token);
        const curr_time =  Date.now() / 1000; // in seconds
        return decoded.exp < curr_time;
    }catch(err){
        return true; // token is invalid or not decodable
    }

}