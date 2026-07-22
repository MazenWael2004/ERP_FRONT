import React from 'react'
import usersIcon from "../../../assets/users.png";
import LauncherAppItem from './LauncherAppItem';
import employeesIcon from '../../../assets/employees.png';
import jobsIcon from '../../../assets/jobs.png';
import salesIcon from '../../../assets/sales.png';
import ticketIcon from '../../../assets/ticket.png'

function LauncherContent() {
  return (
    <div className="launcher-content-outer-container">
        <div className="launcher-content-inner-container">
            <LauncherAppItem name='Users' icon={usersIcon} iconClass='icon1' />
            <LauncherAppItem name='Employees' icon={employeesIcon} iconClass='icon2' />
            <LauncherAppItem name='Jobs' icon={jobsIcon} iconClass='icon3' />
            <LauncherAppItem name='Sales' icon={salesIcon} iconClass='icon4' />
            <LauncherAppItem name='Ticketing System' icon={ticketIcon} iconClass='icon5' />
        </div>
    </div>
  )
}

export default LauncherContent