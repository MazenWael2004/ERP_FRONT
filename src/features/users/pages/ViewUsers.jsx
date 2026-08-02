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
import { fetchUsers } from "../api/userService";



export default function ViewUsers() {
const {i18n} = useTranslation();
const columns = [
    {
        field: "id", // name of atrribute
        headerName: "ID", // name of header
        flex: 1,
        headerAlign: i18n.language === "ar" ? "right" : "left",
        align: i18n.language === "ar" ? "right" : "left",
    },
    {
        field: "username",
        headerName: "Username",
        flex: 1,
        headerAlign: i18n.language === "ar" ? "right" : "left",
        align: i18n.language === "ar" ? "right" : "left",
    },
    {
        field: "employee_name",
        headerName: "Employee Name",
        flex: 1,
        headerAlign: i18n.language === "ar" ? "right" : "left",
        align: i18n.language === "ar" ? "right" : "left",
    },
    {
        field: "roles",
        headerName: "Roles",
        flex: 1,
        headerAlign: i18n.language === "ar" ? "right" : "left",
        align: i18n.language === "ar" ? "right" : "left",
    }
];

    const [users, setUsers] = useState([]); // to load the users data from the API
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();
    const { t } = useTranslation();
    const [selectedRows, setSelectedRows] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

    const loadUsers = async () => {
        try {
          setLoading(true);
          const response = await fetchUsers();
          setUsers(response.data);
          console.log("Users loaded successfully:", response.data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        loadUsers();
      }, []);
    

  return (
    <MainLayout
      header={
        selectedRows.length === 0 ? (
          <Header
            route={`${t("ADMINISTRATION")} / ${t("USERS")}`}
            buttonText={t("ADD_USER")}
            onClick={() => nav("/users/new-user")}
          />
        ) : (
          <Header route="User">
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
        rows={users}
        columns={columns}
        loading={loading}
        onRowSelectionModelChange={(newSelection) => {
          const selectedUsers = users.filter((user) =>
            newSelection.ids.has(user.id),
          );
          setSelectedRows(selectedUsers);
        }}
        onRowClick={(user) => {
          console.log(user);
          nav(`/users/${user.id}`);
        }}
      />
    </MainLayout>
  );
}


