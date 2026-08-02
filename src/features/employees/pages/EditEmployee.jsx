import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import axios from "axios";
import { MainLayout } from "../../../layouts/MainLayout";
import Header from "../../../shared/components/Header";
import EmployeeForm from "../../../shared/components/EmployeeForm";
import { getEmployeeById, updateEmployee } from "../api/employeeService";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeById(Number(id));

        setEmployee({
          employeeNameAr: response.data.name_ar,
          employeeNameEn: response.data.name_en,
          email: response.data.email,
          employeeNum: response.data.employee_number,
          street: response.data.street,
          city: response.data.city,
          governorate: response.data.governorate,
          telephoneNum: response.data.telephone_num,
          birthDate: response.data.birth_date
            ? response.data.birth_date.slice(0, 10)
            : "",
          jobId: response.data.job_id,
          zones: response.data.zones.map((z) => z.id) ?? [],
        });
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          navigate("/404", { replace: true });
          return;
        }
        console.error(error);
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleSave = async (data) => {
    if (!id) return;
    console.log(data);
    try {
      await updateEmployee(Number(id),data);

      toast.success(t("EMPLOYEE_UPDATED_SUCCESSFULLY"));
      navigate("/employees");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error(t(error.response?.data.error.message));
          console.log(error.response?.data);
        } else {
          console.log(error.response?.data);
        }
      } else {
        console.log("Unexpected error");
      }
    } 
  };

  return (
    <MainLayout
      header={
        <Header
          route="Edit Employee"
          buttonText={t("SAVE")}
          buttonType="submit"
          formId="edit-job-form"
        />
      }
    >
      <EmployeeForm
        formId="edit-job-form"
        defaultValues={employee}
        onSubmit={handleSave}
      />
    </MainLayout>
  );
}

export default EditEmployee;
