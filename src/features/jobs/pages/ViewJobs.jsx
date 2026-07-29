import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import MUITable from "../../../shared/components/MUITable";
import { fetchJobs } from "../api/jobService";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import JobIcon from "../../../assets/jobs.png";
import { deleteJob } from "../api/jobService";
import ActionButton from "../../../shared/components/ActionButton";
import AppModal from "../../../shared/components/Modal";
import { useDisclosure } from "@mantine/hooks";

const columns = [
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
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    // console.log(selectedRows, selectedRows.ids.size);
  }, []);

  const sidebarLinks = [
    {
      label: "Jobs",
      to: "/jobs",
      icon: JobIcon,
    },
  ];
  const loadJobs = async () => {
    try {
      setLoading(true);
      const response = await fetchJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async () => {
    try {
      await Promise.all(selectedRows.map((job) => deleteJob(job.id)));

      setSelectedRows([]);

      await loadJobs();
    } catch (error) {
      console.error("Failed to delete jobs:", error);
    }
  };

  return (
    <MainLayout
      links={sidebarLinks}
      header={
        selectedRows.length === 0 ? (
          <Header
            route={`${t("ADMINISTRATION")} / ${t("JOBS")}`}
            buttonText={t("ADD_JOB")}
            onClick={() => nav("/jobs/new-job")}
          />
        ) : (
          <Header route="Job">
            {/* lets just do the delete for noowww LATER....... */}
            <ActionButton isRowSelected onClick={open} />
            <AppModal opened={opened} onClose={close} title="Confirmation">
              <div className="logout-container">
                <p className="logout-text">Are you sure you want to perform this action?</p>

                <div className="logout-actions">
                  <button className="logout-btn cancel-btn" onClick={close}>
                    No
                  </button>

                  <button className="logout-btn confirm-btn" onClick={handleDelete}>Yes</button>
                </div>
              </div>
            </AppModal>
          </Header>
        )
      }
    >
      <MUITable
        rows={jobs}
        columns={columns}
        loading={loading}
        onRowSelectionModelChange={(newSelection) => {
          const selectedJobs = jobs.filter((job) =>
            newSelection.ids.has(job.id),
          );
          setSelectedRows(selectedJobs);
        }}
        onRowClick={(job) => {
          console.log(job);
          nav(`/jobs/${job.id}`);
        }}
      />
    </MainLayout>
  );
}

export default ViewJobs;
