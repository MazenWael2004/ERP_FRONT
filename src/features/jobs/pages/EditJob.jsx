import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import axios from "axios";
import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import JobForm from "../../../shared/components/JobForm";
import { getJobById, updateJob } from "../api/jobService";


function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const response = await getJobById(Number(id));

        setJob({
          jobCode: response.data.code,
          jobTitleAr: response.data.title_ar,
          jobTitleEn: response.data.title_en,
        });
      } catch (error) {
         if (axios.isAxiosError(error) && error.response?.status === 404) {
        navigate("/404", { replace: true });
        return;
      }
        console.error(error);
      }
    };

    fetchJob();
  }, [id,navigate]);

  const handleSave = async (data) => {
    if (!id) return;
    console.log(data);
    try {
      await updateJob(Number(id), {
        code: data.jobCode,
        title_en: data.jobTitleEn,
        title_ar: data.jobTitleAr,
      });

      toast.success(t("JOB_UPDATED_SUCCESSFULLY"));
      navigate("/jobs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <MainLayout
      header={
        <Header
          route="Edit Job"
          buttonText={t("SAVE")}
          buttonType="submit"
          formId="edit-job-form"
        />
      }
    >
      <JobForm
        formId="edit-job-form"
        defaultValues={job}
        onSubmit={handleSave}
      />
    </MainLayout>
  );
}

export default EditJob;
