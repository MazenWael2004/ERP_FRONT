import { AppShell, Box, Stack } from "@mantine/core";
import Sidebar from "../shared/components/Sidebar";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import LanguageSwitcher from "../shared/components/LanguageSwitcher";
import JobIcon from "../assets/jobs2.png";
import locationIcon from "../assets/location.png";
import employeesIcon from "../assets/employees.png";
import userIcon from '../assets/user.png';
import ThemeSwitcher from "../shared/components/ThemeSwitcher";



export function MainLayout({ children, header }) {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  const sidebarLinks = [
    {
      label: t("JOBS"),
      to: "/jobs",
      icon: JobIcon,
    },
    {
      label: t("ZONES"),
      to: "/zones",
      icon: locationIcon,
    },
    {
      label: t("EMPLOYEES"),
      to: "/employees",
      icon: employeesIcon,
    },
    {
      label: t("USERS"),
      to: "/users",
      icon: userIcon,
    },
    // {
    //   label: "Users",
    //   children: [
    //     { label: "Employees", to: "/users/employees" },
    //     { label: "Roles", to: "/users/roles" },
    //   ],
    // },
    // {
    //   label: "Settings",
    //   children: [
    //     { label: "General", to: "/settings/general" },
    //     { label: "Security", to: "/settings/security" },
    //   ],
    // },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280, breakpoint: "sm" }}
      padding="md"
    >
      <AppShell.Navbar>
        <Sidebar links={sidebarLinks} />
        <div
          style={{
            marginTop: "auto",
            padding: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
      </AppShell.Navbar>

      <AppShell.Header p="md">{header}</AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
