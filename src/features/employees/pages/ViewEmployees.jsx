import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import MUITable from "../../../shared/components/MUITable";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ActionButton from "../../../shared/components/ActionButton";
import AppModal from "../../../shared/components/Modal";
import { useDisclosure } from "@mantine/hooks";
import { fetchEmployees,deleteEmployee } from "../api/employeeService";



const columns = [
  {
    field: "id", // name of atrribute
    headerName: "ID", // name of header
    flex: 1,
  },
  {
    field: "employee_number",
    headerName: "Employee Number",
    flex: 1,
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
  },
  {
    field: "name_en",
    headerName: "Name En",
    flex: 1,
  },
  {
    field: "name_ar",
    headerName: "Name Ar",
    flex: 1,
  },
  {
    field: "job_id",
    headerName: "Job ID",
    flex: 1,
  },
  {
    field: "is_terminated",
    headerName: "isTerminated",
    flex: 1,
  },
  {
    field: "hiring_date",
    headerName: "Hiring Date",
    flex: 1,
  },
  {
    field: "terminated_date",
    headerName: "Terminated Date",
    flex: 1,
  },
  {
    field: "birth_date",
    headerName: "Birth Date",
    flex: 1,
  },
  {
    field: "telephone_num",
    headerName: "Telephone Number",
    flex: 1,
  },
  {
    field: "street",
    headerName: "Street",
    flex: 1,
  },
  {
    field: "governorate",
    headerName: "Governorate",
    flex: 1,
  },
  {
    field: "city",
    headerName: "City",
    flex: 1,
  }
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


export default function ViewEmployees(){
    const [employees,setEmployees] = useState([]);
    const [loading,setLoading] = useState(false);
    const nav = useNavigate();
    const {t} = useTranslation();
    const [selectedRows,setSelectedRows] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

    const loadEmployees = async () => {
        try {
          setLoading(true);
          const response = await fetchEmployees();
          setEmployees(response.data);
        } catch (error) {
          console.error("Failed to fetch jobs:", error);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
    loadEmployees();
  }, []);


  const handleDelete = async () => {
      try {
        await Promise.all(selectedRows.map((employee) => deleteEmployee(employee.id)));
  
        setSelectedRows([]);
  
        await loadEmployees();
      } catch (error) {
        console.error("Failed to delete employees:", error);
      }
    };
    
  return (
    <MainLayout
      header={
        selectedRows.length === 0 ? (
          <Header
            route={`${t("ADMINISTRATION")} / ${t("EMPLOYEES")}`}
            buttonText={t("ADD_EMPLOYEE")}
            onClick={() => nav("/employees/new-employee")}
          />
        ) : (
          <Header route="Employee">
            {/* lets just do the delete for noowww LATER....... */}
            <ActionButton isRowSelected onClick={open} />
            <AppModal opened={opened} onClose={close} title="Confirmation">
              <div className="logout-container">
                <p className="logout-text">Are you sure you want to perform this action?</p>

                <div className="logout-actions">
                  <button className="logout-btn cancel-btn" onClick={close}>
                    No
                  </button>

                  <button className="logout-btn confirm-btn" onClick={handleDelete}>
                    Yes
                  </button>
                </div>
              </div>
            </AppModal>
          </Header>
        )
      }
    >
      <MUITable
        rows={employees}
        columns={columns}
        loading={loading}
        onRowSelectionModelChange={(newSelection) => {
          const selectedJobs = employees.filter((employee) =>
            newSelection.ids.has(employee.id),
          );
          setSelectedRows(selectedJobs);
        }}
        onRowClick={(employee) => {
          console.log(employee);
          nav(`/employees/${employee.id}`);
        }}
      />
    </MainLayout>
  );

}

