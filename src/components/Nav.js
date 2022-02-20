import { useAsync } from 'react-async'
import { fetchUser } from '../ck'
import './Nav.css'

function Nav() {
  function NavButton() {
    const { data } = useAsync(fetchUser)
    if (data) {
      const { user } = data
      if (user.isAuthenticated()) {
        return (
          <button className="button auth" onClick={user.logoutRedirect}>
            Log out
          </button>
        )
      } else {
        return (
          <button className="button auth" onClick={user.loginRedirect}>
            Log in
          </button>
        )
      }
    } else {
      return <div />
    }
  }
  return (
    <nav className="Nav">
      <NavButton />
    </nav>
  )
}

export default Nav
