import React from 'react'
import LauncherHeader from '../components/LaucherHeader'
import LauncherContent from '../components/LauncherContent'
import { useAuth } from '../../auth/hooks/useAuth'
// import { decodeToken } from "../../../shared/auth/token";

// const decoded = decodeToken();


function LauncherPage() {
  // console.log(decoded);
  const {user} = useAuth();
  console.log(user);
  return (
    <div>
    <LauncherHeader name={user!.name_ar} role={'role'} />
    <LauncherContent />
    </div>
  )
}

export default LauncherPage