import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import axios from "axios";
import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import ZoneForm from "../../../shared/components/ZoneForm";
import { getZoneById, updateZone } from "../api/zoneService";

function EditZone() {
  const { id } = useParams(); // remember that this id is a string
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [zone, setZone] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchZone = async () => {
      try {
        const response = await getZoneById(Number(id));

        setZone({
          zoneNameEn: response.data.name_en,
          zoneNameAr: response.data.name_ar,
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate("/404", { replace: true });
          return;
        }
        console.error(error);
      }
    };

    fetchZone();
  }, [id, navigate]);

  const handleSave = async (data) => {
    if (!id) return;
    console.log(data);
    try {
      await updateZone(
        Number(id),
        await updateZone(Number(id), {
          zoneNameEn: data.zoneNameEn,
          zoneNameAr: data.zoneNameAr,
        }),
      );

      toast.success(t("ZONE_UPDATED_SUCCESSFULLY"));
      navigate("/zones");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout
      header={
        <Header
          route="Edit Zone"
          buttonText={t("SAVE")}
          buttonType="submit"
          formId="edit-zone-form"
        />
      }
    >
      <ZoneForm
        formId="edit-zone-form"
        defaultValues={zone}
        onSubmit={handleSave}
      />
    </MainLayout>
  );
}

export default EditZone;
