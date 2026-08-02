import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth/hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../../../shared/components/EmployeeForm";
import { createEmployee } from "../api/employeeService";

function NewEmployee() {
  const nav = useNavigate();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  console.log(user);

  const handleSave = async (data) => {
    setIsLoading(true);

    try {
      const result = await createEmployee(data);

      console.log(result);

      toast.success(t("EMPLOYEE_CREATED_SUCCESSFULLY"));

      nav("/employees");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(t("EMPLOYEE_ALREADY_EXISTS"));
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
          route={t("NEW_EMPLOYEE")}
          buttonText={t("SAVE")}
          buttonType="submit"
          formId="new-job-form"
        />
      }
    >
      <EmployeeForm formId="new-job-form" onSubmit={handleSave} />
    </MainLayout>
  );
}

export default NewEmployee;
