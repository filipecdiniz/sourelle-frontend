import Cookies from "js-cookie"

export default function handleLogout() {
    Cookies.remove('authToken')
    Cookies.remove('cart')
    // window.location.reload()
}