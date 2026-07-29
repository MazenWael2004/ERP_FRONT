import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";
import { createJob } from "../api/jobService";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../../../shared/components/JobForm";

function NewJob() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  const handleSave = async (data) => {
    setIsLoading(true);

    try {
      const result = await createJob(data);

      console.log(result);

      toast.success(t("JOB_CREATED_SUCCESSFULLY"));

      nav("/jobs");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(t("JOB_ALREADY_EXISTS"));
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
          route="New Job"
          buttonText={t("SAVE")}
          buttonType="submit"
          formId="new-job-form"
        />
      }
    >
      <JobForm
        formId="new-job-form"
        onSubmit={handleSave}
      />
    </MainLayout>
  );
}

export default NewJob;