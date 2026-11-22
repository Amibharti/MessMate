import Logo from './Logo'

function Navbar({ activePage, setActivePage }) {
  return (
    <nav className="navbar">

      <div className="nav-brand">
        <Logo />
      </div>

      <div className="nav-links">

        <button
          className={
            activePage === 'home'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActivePage('home')
          }
        >
          🏠
          <span>Home</span>
        </button>

        <button
          className={
            activePage === 'add'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActivePage('add')
          }
        >
          ➕
          <span>Add</span>
        </button>

        <button
          className={
            activePage === 'calendar'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActivePage('calendar')
          }
        >
          📅
          <span>Calendar</span>
        </button>

        <button
          className={
            activePage === 'bill'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActivePage('bill')
          }
        >
          💰
          <span>Bill</span>
        </button>

        <button
          className={
            activePage === 'settings'
              ? 'active'
              : ''
          }
          onClick={() =>
            setActivePage('settings')
          }
        >
          ⚙️
          <span>Settings</span>
        </button>

      </div>
    </nav>
  )
}

export default Navbar