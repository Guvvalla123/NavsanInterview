export const logoutUser = (navigate) => {
  localStorage.removeItem("token")
  navigate("/")
}

export const isLoggedIn = () => {
  return !!localStorage.getItem("token")
}
