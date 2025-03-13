import Cookies from "js-cookie"

export default function clearCookies() {
    Cookies.remove('authToken')
    Cookies.remove('cart')
    Cookies.remove('user')
    Cookies.remove('cupom')
    Cookies.remove('addressData')
    // window.location.reload()
}