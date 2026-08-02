import { useEffect, useState } from "react";
import { Chip } from "@mui/material";
import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import MUITable from "../../../shared/components/MUITable";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fetchZones } from "../api/zoneService";
import ActionButton from "../../../shared/components/ActionButton";
import AppModal from "../../../shared/components/Modal";
import { useDisclosure } from "@mantine/hooks";
import { deleteZone } from "../api/zoneService";

const columns = [
  {
    field: "id", // name of atrribute
    headerName: "ID", // name of header
    flex: 1,
  },
  {
    field: "name_en",
    headerName: "Name_En",
    flex: 1,
  },
  {
    field: "name_ar",
    headerName: "Name_Ar",
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


function ViewZones(){
 const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const { t } = useTranslation();
  const [selectedRows, setSelectedRows] = useState([]);
  const [opened, { open, close }] = useDisclosure(false);

  const loadZones = async () => {
      try {
        setLoading(true);
        const response = await fetchZones();
        setZones(response.data);
      } catch (error) {
        console.error("Failed to fetch zones:", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
    loadZones();
  }, []);

  const handleDelete = async () => {
      try {
        await Promise.all(selectedRows.map((zone) => deleteZone(zone.id)));
  
        setSelectedRows([]);
  
        await loadZones();
      } catch (error) {
        console.error("Failed to delete zones:", error);
      }
    };

   return (
    <MainLayout
      header={
        selectedRows.length === 0 ? (
          <Header
            route={`${t("ADMINISTRATION")} / ${t("ZONES")}`}
            buttonText={t("ADD_ZONE")}
            onClick={() => nav("/zones/new-zone")}
          />
        ) : (
          <Header route="Zone">
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
        rows={zones}
        columns={columns}
        loading={loading}
        onRowSelectionModelChange={(newSelection) => {
          const selectedJobs = zones.filter((zone) =>
            newSelection.ids.has(zone.id),
          );
          setSelectedRows(selectedJobs);
        }}
        onRowClick={(zone) => {
          console.log(zone);
          nav(`/zones/${zone.id}`);
        }}
      />
    </MainLayout>
  );


};


export default ViewZones;