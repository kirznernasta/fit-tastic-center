import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {getTokenFromCookie, removeTokenFromCookie} from "../cookies/cookies";

export default function AccountComponent() {

    const [isLogin, setIsLogin] = useState(false);
    const router = useNavigate();

    useEffect(() => {
        const token = getTokenFromCookie("TOKEN");
        console.log("TOKEN");
        console.log(token);
        setIsLogin(!!token);
    }, []);

    const handleLinkClick = () => {
        removeTokenFromCookie();
        setIsLogin(false);
        router("/");
    };

    return (
        isLogin ? <a className="navigation-item" href="#" onClick={handleLinkClick}>Logout</a> :
            <NavLink className="navigation-item" style={({isActive}) => {
                console.log(`isActive: ${isActive}`)
                return {color: (isActive ? "#f4f4f4" : "#a2a9b9")};
            }
            } to="/login">Login</NavLink>
    );
}