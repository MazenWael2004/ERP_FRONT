
interface HeaderProps {
  route: string;
  onClick?: () => void; // ? means optional...
}

function Header({ route,onClick }: HeaderProps) {
  return <div className="header-section">
    <p>Home / {route}</p>
    <button className="action-button" onClick={onClick}>
        Add a {route}
    </button>
  </div>
}

export default Header;