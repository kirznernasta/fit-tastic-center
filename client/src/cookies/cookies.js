import Cookies from "universal-cookie";

const cookies = new Cookies();

export const saveTokenToCookie = (token) => {
  cookies.set("TOKEN", token, { path: '/' });
};

export const getTokenFromCookie = () => {
  return cookies.get("TOKEN");
};

export const removeTokenFromCookie = () => {
  cookies.remove("TOKEN", { path: '/' });
};

export default {}