import { Menu } from "@mantine/core";
import MenuIcon from "../../assets/menu.png";
import { useTranslation } from "react-i18next";

export default function ActionButton({isRowSelected,onClick}) {
  const {t} = useTranslation();
  if (!isRowSelected) return null;

  return (
    <Menu shadow="md" width={180}>
      <Menu.Target>
        <button
          className="action-button"
          style={{ backgroundColor: "#000000" }}
        >
          <p>{t("ACTIONS")}</p>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item >Edit</Menu.Item>

      <Menu.Item >Enable</Menu.Item>

       <Menu.Item >Disable</Menu.Item>

       
          <Menu.Item color="red" onClick={onClick} >
            Delete
          </Menu.Item>
       
      </Menu.Dropdown>
    </Menu>
  );
}