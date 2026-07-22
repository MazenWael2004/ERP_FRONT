interface LauncherAppItemProps {
  icon: string;
  name: string;
  iconClass?: string;
  onClick?: () => void;
}

function LauncherAppItem({
  icon,
  name,
  iconClass = "",
  onClick,
}: LauncherAppItemProps) {
  return (
    <div className="app-item" onClick={onClick}>
      <div className={`app-item-icon ${iconClass}`}>
        <img src={icon} alt={name} className="app-icon" />
      </div>

      <p className="app-item-name">{name}</p>
    </div>
  );
}

export default LauncherAppItem;