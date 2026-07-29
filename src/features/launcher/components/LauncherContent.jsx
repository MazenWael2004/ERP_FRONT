import React from 'react'
import usersIcon from "../../../assets/users.png";
import LauncherAppItem from './LauncherAppItem';
import employeesIcon from '../../../assets/employees.png';
import jobsIcon from '../../../assets/jobs.png';
import administrationIcon from '../../../assets/administrator.png'
import salesIcon from '../../../assets/sales.png';
import ticketIcon from '../../../assets/ticket.png'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';


function LauncherContent() {
  const {t} = useTranslation();
  const nav =useNavigate();
  return (
    <div className="launcher-content-outer-container">
        <div className="launcher-content-inner-container">
            <LauncherAppItem name={t("ADMINISTRATION")} icon={administrationIcon} iconClass='icon1' onClick={() => nav("/jobs")}  />
            <LauncherAppItem name='Jobs' icon={jobsIcon} iconClass='icon3' onClick={() => nav("/jobs")} />
            <LauncherAppItem name='Sales' icon={salesIcon} iconClass='icon4' />
            {/* <LauncherAppItem name='Ticketing System' icon={ticketIcon} iconClass='icon5' /> */}
        </div>
    </div>
  )
}

export default LauncherContent