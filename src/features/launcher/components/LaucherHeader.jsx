import React from "react";
import notificationIcon from "../../../assets/notification.png";
import logOutIcon from "../../../assets/logout.png";
import profileIcon from "../../../assets/profile.png";
import companyLogoIcon from "../../../assets/b_connect_egypt_logo-removebg-preview.png";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useDisclosure } from "@mantine/hooks";
import AppModal from "../../../shared/components/Modal";



function LauncherHeader({name,role}) {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const {logout} = useAuth();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div
      className={`launcher-header-container ${
        isArabic ? "rtl-header" : "ltr-header"
      }`}
    >
      <div className="header-content">
        <div className="header-log-out">
          <img src={logOutIcon} style={{ width: 25, height: 25 }} alt="" onClick={open} />
          <AppModal
        opened={opened}
        onClose={close}
        title="Logout"
      >
       <div className="logout-container">
  <p className="logout-text">Are you sure you want to logout?</p>

  <div className="logout-actions">
    <button
      className="logout-btn cancel-btn"
      onClick={close}
    >
      No
    </button>

    <button
      className="logout-btn confirm-btn"
      onClick={logout}
    >
      Yes
    </button>
  </div>
</div>
      </AppModal>
        </div>
        <div className="header-notification">
          <img
            src={notificationIcon}
            style={{ width: 25, height: 25 }}
            alt=""
          />
        </div>
        <div
          className={`header-profile ${isArabic ? "rtl-header" : "ltr-header"}`}
        >
          <div className="profile-picture">
            <img src={profileIcon} alt="" />
          </div>
          <div className="header-profile-description">
            <p className="profile-name">{name}</p>
            <p className="profile-role">{role}</p>
          </div>
        </div>
      </div>
      <img src={companyLogoIcon} style={{ width: 80, height: 80 }} alt="" />
    </div>
  );
}

export default LauncherHeader;
