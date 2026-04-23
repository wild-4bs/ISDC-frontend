import Cookies from "js-cookie";

export const tokenStore = {
  setAccessToken(token: string) {
    // Expires in 1 day (adjust as needed)
    Cookies.set("accessToken", token, { expires: 1, path: "/" });
  },

  getAccessToken() {
    return Cookies.get("accessToken");
  },

  setRefreshToken(token: string) {
    // Expires in 7 days
    Cookies.set("refreshToken", token, { expires: 7, path: "/" });
  },

  getRefreshToken() {
    return Cookies.get("refreshToken");
  },

  clear() {
    Cookies.remove("accessToken", { path: "/" });
    Cookies.remove("refreshToken", { path: "/" });
  },
};
