import { useEffect, useState } from "react";
import type { GridColDef } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import MUITable from "../../../shared/components/MUITable";
import { fetchJobs } from "../api/jobService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const columns: GridColDef[] = [
  {
    field: "id", // name of atrribute 
    headerName: "ID", // name of header 
    flex: 1,
  },
  {
    field: "code",
    headerName: "Code",
    flex: 1,
  },
  {
    field: "title_en",
    headerName: "Title_En",
    flex: 1,
  },
  {
    field: "title_ar",
    headerName: "Title_Ar",
    flex: 1,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   flex: 1,
  //   renderCell: (params) => (
  //     <Chip
  //       label={params.value}
  //       color={params.value === "Active" ? "success" : "error"}
  //       size="small"
  //     />
  //   ),
  // },
];

function ViewJobs() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const response = await fetchJobs();
        setJobs(response['data']);
        console.log(jobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <MainLayout
      header={
        <Header
          route="Job"
          onClick={()=> nav("/jobs/new-job")}
           buttonText={t("ADD_JOB")}
        />
      }
    >
      <MUITable
        rows={jobs}
        columns={columns}
        loading={loading}
      />
    </MainLayout>
  );
}

export default ViewJobs;