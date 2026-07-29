import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../../../shared/components/JobForm";
import ZoneForm from "../../../shared/components/ZoneForm";
import { createZone } from "../api/zoneService";




function NewZone() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  const handleSave = async (zoneData) => {
    setIsLoading(true);

    try {
      const result = await createZone(zoneData);

      console.log(result);

      toast.success(t("ZONE_CREATED_SUCCESSFULLY"));

      nav("/zones");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(t("ZONE_ALREADY_EXISTS"));
          console.log(error.response?.data);
        } else {
          console.log(error.response?.data);
        }
      } else {
        console.log("Unexpected error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout
      header={
        <Header
          route="New Zone"
          buttonText={t("SAVE")}
          buttonType="submit"
          formId="new-job-form"
        />
      }
    >
      <ZoneForm
        formId="new-job-form"
        onSubmit={handleSave}
      />
    </MainLayout>
  );
}

export default NewZone;