interface HeaderProps {
  route: string;
  buttonText?: string;
  buttonType?: "button" | "submit" | "reset";
  formId?: string;
  onClick?: () => void;
}

function Header({
  route,
  buttonText,
  buttonType = "button",
  formId,
  onClick,
}: HeaderProps) {
  return (
    <div className="header-section">
      <p>Home / {route}</p>

      {buttonText && (
        <button
          className="action-button"
          type={buttonType}
          form={formId}
          onClick={onClick}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}

export default Header;