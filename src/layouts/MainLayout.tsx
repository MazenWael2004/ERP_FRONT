import { AppShell, Box, Stack } from "@mantine/core";
import Sidebar from "../shared/components/Sidebar";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import LanguageSwitcher from "../shared/components/LanguageSwitcher";

export function MainLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
    const { i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  useEffect(() => {
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = isArabic ? "ar" : "en";
  }, [isArabic]);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 280,breakpoint:"sm" }}
      padding="md"
    >
      <AppShell.Navbar>
        <Sidebar />
        <LanguageSwitcher />
        
      </AppShell.Navbar>

      <AppShell.Header p="md">
        {header}
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}