import { useState, useEffect, useContext } from 'react'
import { useHistory } from "react-router";
import { CurrentUser } from './contexts/CurrentUser';

function UserName() {
  const { currentUser } = useContext(CurrentUser)
  if (currentUser) {
    return (
      <span style={{ float: 'right' }}>
        Logged in as {currentUser.firstName} {currentUser.lastName}
      </span>
    )
  }
  return null
}

function Navigation() {
  const history = useHistory()
  const { currentUser, setCurrentUser } = useContext(CurrentUser)

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    history.push("/login");
  }

  let loginActions = (
    <>
      <li style={{ float: 'right' }}>
        <a href="#" onClick={() => history.push("/sign-up")}>
          Sign Up
        </a>
      </li>
      <li style={{ float: 'right' }}>
        <a href="#" onClick={() => history.push("/login")}>
          Login
        </a>
      </li>
    </>
  )

  if (currentUser) {
    loginActions = (
      <>
        <li style={{ float: 'right' }}>
          <a href="#" onClick={handleLogout} style={{ textDecoration: 'none', backgroundColor: 'blue', color: 'white', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer' }}>
            Logout
          </a>
        </li>
        <li style={{ float: 'right' }}>
          <UserName />
        </li>
      </>
    )
  }

  return (
    <nav>
      <ul>
        <li>
          <a href="#" onClick={() => history.push("/")}>
            Home
          </a>
        </li>
        <li>
          <a href="#" onClick={() => history.push("/places")}>
            Places
          </a>
        </li>
        <li>
          <a href="#" onClick={() => history.push("/places/new")}>
            Add Place
          </a>
        </li>
        {loginActions}
      </ul>
    </nav>
  )
}

export default Navigation;
