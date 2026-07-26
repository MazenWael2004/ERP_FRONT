import React from "react";
import notificationIcon from "../../../assets/notification.png";
import logOutIcon from "../../../assets/logout.png";
import profileIcon from "../../../assets/profile.png";
import companyLogoIcon from "../../../assets/b_connect_egypt_logo-removebg-preview.png";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

interface LauncherHeaderProps {
  name: string;
  role: string;
}

function LauncherHeader({name,role}:LauncherHeaderProps) {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <div
      className={`launcher-header-container ${
        isArabic ? "rtl-header" : "ltr-header"
      }`}
    >
      <div className="header-content">
        <div className="header-log-out">
          <img src={logOutIcon} style={{ width: 25, height: 25 }} alt="" />
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
