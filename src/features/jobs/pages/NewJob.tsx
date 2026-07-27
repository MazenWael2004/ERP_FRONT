import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import classes from "../.././../styles/NewJob.module.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/useAuth";
import { createJobSchema } from "../validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createJob } from "../api/jobService";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewJob() {
    const nav = useNavigate();
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  // We used react-hook-form to pass
  // React Hook Form is a library that makes handling forms in React much easier and more performant.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createJobSchema),
  });

  console.log(user);

  const handleSave = async (data: any) => {
    setIsLoading(true);

    try {
      const result = await createJob(data); // call the api auth Service
      console.log(result);
    

      // Save token, navigate, etc.
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
      // this block is executed whether request succeeds or fails
      setIsLoading(false);
    }
  };
  return (
    <MainLayout
      header={
        <Header
          route="New Job"
          onClick={() => console.log("Job Added")}
          buttonText={t("SAVE")}
          buttonType="submit"
          formId="new-job-form"
        />
      }
    >
      <form
        id="new-job-form"
        className="login-form-container"
        style={{ maxWidth: "100%" }}
        onSubmit={handleSubmit(handleSave)}
      >
        <p className="login-subtitle"></p>
        <div className={`form-group ${isArabic ? "rtl-header" : "ltr-header"}`}>
          <label
            htmlFor="jobNameEn"
            style={{ textAlign: isArabic ? "right" : "left" }}
          >
            {t("JOB_TITLE_EN")}
            <span className="required">*</span>
          </label>
          <input
            id="jobTitleEn"
            {...register("jobTitleEn")}
            placeholder={t("ENTER_JOB_TITLE_EN")}
            style={{ textAlign: isArabic ? "right" : "left" }}
          />
          {errors.jobTitleEn && (
            <span
              style={{ textAlign: isArabic ? "right" : "left", marginTop: 5 }}
              className="error-message"
            >
              {t(errors.jobTitleEn.message!)}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="jobNameAr"
            style={{ textAlign: isArabic ? "right" : "left" }}
          >
            {t("JOB_TITLE_AR")}
            <span className="required">*</span>
          </label>

          <div className="password-input-container">
            <input
              id="jobTitleAr"
              {...register("jobTitleAr")}
              placeholder={t("ENTER_JOB_TITLE_AR")}
              style={{ textAlign: isArabic ? "right" : "left" }}
            />
          </div>
          {errors.jobTitleAr && (
            <span
              style={{ textAlign: isArabic ? "right" : "left", marginTop: 5 }}
              className="error-message"
            >
              {t(errors.jobTitleAr.message!)}
            </span>
          )}
        </div>

        <div className="form-group">
          <label
            htmlFor="jobCode"
            style={{ textAlign: isArabic ? "right" : "left" }}
          >
            {t("JOB_CODE")}
            <span className="required">*</span>
          </label>

          <div className="password-input-container">
            <input
              id="jobCode"
              {...register("jobCode")}
              placeholder={t("ENTER_JOB_CODE")}
              style={{ textAlign: isArabic ? "right" : "left" }}
            />
          </div>
          {errors.jobCode && (
            <span
              style={{ textAlign: isArabic ? "right" : "left", marginTop: 5 }}
              className="error-message"
            >
              {t(errors.jobCode.message!)}
            </span>
          )}
        </div>

        {/* <div
            className={`remember-container ${isArabic ? "rtl-header" : "ltr-header"}`}
          >
            <label className="remember-label">
              <input type="checkbox" />
              <p>{t("REMEMBER")}</p>
            </label>
          </div> */}
      </form>
    </MainLayout>
  );
}

export default NewJob;
