import { Link, NavLink } from 'react-router'

function Navbar({ user, setUser }) {


  function logOut(){
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <nav>
      {/* Routes seen by everyone */}
      <Link to='/' id='logo'>Track<span>MySpend</span></Link>
      
      <div id='destinations'>
        <NavLink to='/' end className={({isActive})=> isActive ? 'active' : ''}>Homepage</NavLink>

        {user ? (
          // Links for protected routes only for logged in users
          <>
            <NavLink to='/dashboard' className={({isActive})=> isActive ? 'active' : ''}>Dashboard</NavLink>
            <NavLink to='/spends/form' className={({isActive})=> isActive ? 'active' : ''}>Create Spend</NavLink>
            <NavLink to='/spends' className={({isActive})=> isActive ? 'active' : ''}>All Spends</NavLink>
            <NavLink to='/category/new' className={({isActive})=> isActive ? 'active' : ''}>Create Category</NavLink>
          </>
        ) : (
          // links for not logged in users
          <>
            <NavLink to='/sign-up' className={({isActive})=> isActive ? 'active' : ''}>Sign up</NavLink>
            <NavLink to='/sign-in' className={({isActive})=> isActive ? 'active' : ''}>Sign in</NavLink>
          </>
        )}
      </div>

      {user && (
        <div id='actions'>
          <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: 'bold' }}>{user.username}</span>
          <button onClick={logOut}>Log Out</button>
        </div>
      )}
    </nav>
  )
}

export default Navbar