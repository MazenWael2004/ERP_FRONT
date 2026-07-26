import { NavLink, Stack } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import {
  IconGauge,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";
import classes from '../../styles/Sidebar.module.css';
import companyLogoIcon from '../../assets/b_connect_egypt_logo-removebg-preview.png';

const links = [
  {
    label: "Jobs",
    icon: IconGauge,
    to: "/jobs",
  },
  {
    label: "Users",
    icon: IconUsers,
    children: [
      { label: "Employees", to: "/users/employees" },
      { label: "Roles", to: "/users/roles" },
    ],
  },
  {
    label: "Settings",
    icon: IconSettings,
    children: [
      { label: "General", to: "/settings/general" },
      { label: "Security", to: "/settings/security" },
    ],
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <Stack className={classes.sidebar} gap={2}>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
 <img src={companyLogoIcon} alt="B-Connect" style={{width:180,height:180}} />
        </div>
        
  {links.map((item) => {
    const Icon = item.icon;

    if (!item.children) {
      return (
        <NavLink
          key={item.label}
          className={classes.link}
          classNames={{
            label: classes.linkLabel,
          }}
          component={Link}
          to={item.to!}
          label={item.label}
          leftSection={<Icon size={18} />}
          active={pathname === item.to}
        />
      );
    }

    return (
      <NavLink
        key={item.label}
        className={classes.link}
        classNames={{
          label: classes.linkLabel,
        }}
        label={item.label}
        leftSection={<Icon size={18} />}
        defaultOpened={item.children.some((c) =>
          pathname.startsWith(c.to)
        )}
      >
        {item.children.map((child) => (
          <NavLink
            key={child.to}
            className={classes.link}
            classNames={{
              label: classes.linkLabel,
            }}
            component={Link}
            to={child.to}
            label={child.label}
            active={pathname === child.to}
          />
        ))}
      </NavLink>
    );
  })}
</Stack>
  );
}