import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect,useState } from "react";
import { createUserSchema } from "../../features/users/validation";
import { fetchRoles } from "../../features/roles/api/roleService";
// import { checkJobExists } from "../../features/jobs/api/jobService";

export default function UserForm({
  formId,
  defaultValues,
  onSubmit,
}) {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar";
  const [roles, setRoles] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  useEffect(() => {
      const loadRoles = async () => {
        try {
          const response = await fetchRoles();
          setRoles(response.data);
        } catch (err) {
          console.error(err);
        }
      };
  
      loadRoles();
    }, []);

//   const jobCode = watch("jobCode");
//   const jobTitleEn = watch("jobTitleEn");
//   const jobTitleAr = watch("jobTitleAr");

//   const validateUniqueField = (
//     fieldName,
//     apiField,
//     value
//   ) => {
//     if (!value?.trim()) {
//       clearErrors(fieldName);
//       return;
//     }

//     const timer = setTimeout(async () => {
//       try {
//         const { exists } = await checkJobExists(apiField, value);

//         if (exists) {
//           setError(fieldName, {
//             type: "manual",
//             message: t("VALUE_ALREADY_EXISTS"),
//           });
//         } else {
//           clearErrors(fieldName);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }, 400);

//     return () => clearTimeout(timer);
//   };

//   useEffect(() => {
//     return validateUniqueField(
//       "jobCode",
//       "code",
//       jobCode
//     );
//   }, [jobCode]);

//   useEffect(() => {
//     return validateUniqueField(
//       "jobTitleEn",
//       "title_en",
//       jobTitleEn
//     );
//   }, [jobTitleEn]);

//   useEffect(() => {
//     return validateUniqueField(
//       "jobTitleAr",
//       "title_ar",
//       jobTitleAr
//     );
//   }, [jobTitleAr]);

  return (
    <form
      id={formId}
      className="login-form-container"
      style={{ maxWidth: "100%" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={`form-group ${isArabic ? "rtl-header" : "ltr-header"}`}>
        <div className="form-group">
          <label
            htmlFor="userName"
            style={{ textAlign: isArabic ? "right" : "left" }}
          >
            {t("USERNAME")}
            <span className="required">*</span>
          </label>

          <input
            id="userName"
            {...register("userName")}
            placeholder={t("ENTER_USERNAME")}
            style={{ textAlign: isArabic ? "right" : "left" }}
          />

          {errors.userName && (
            <span className="error-message">
              {t(errors.userName.message)}
            </span>
          )}
        </div>

        <label
          htmlFor="password"
          style={{ textAlign: isArabic ? "right" : "left" }}
        >
          {t("PASSWORD")}
          <span className="required">*</span>
        </label>

        <input
          id="password"
          {...register("password")}
          placeholder={t("ENTER_PASSWORD")}
          style={{ textAlign: isArabic ? "right" : "left" }}
        />

        {errors.password && (
          <span className="error-message">
            {t(errors.password.message)}
          </span>
        )}
      </div>

      <div className="form-group">
        <label
          htmlFor="confirmPassword"
          style={{ textAlign: isArabic ? "right" : "left" }}
        >
          {t("CONFIRM_PASSWORD")}
          <span className="required">*</span>
        </label>

        <input
          id="confirmPassword"
          {...register("confirmPassword")}
          placeholder={t("ENTER_CONFIRM_PASSWORD")}
          style={{ textAlign: isArabic ? "right" : "left" }}
        />

        {errors.confirmPassword && (
          <span className="error-message">
            {t(errors.confirmPassword?.message)}
          </span>
        )}
      </div>
      <div className="form-group">
        <label
          htmlFor="employeeId"
          style={{ textAlign: isArabic ? "right" : "left" }}
        >
          {t("EMPLOYEE_ID")}
          <span className="required">*</span>
        </label>

        <input
          id="employeeId"
          {...register("employeeId", { valueAsNumber: true })}
          placeholder={t("ENTER_EMPLOYEE_ID")}
          style={{ textAlign: isArabic ? "right" : "left" }}
        />

        {errors.employeeId && (
          <span className="error-message">
            {t(errors.employeeId?.message)}
          </span>
        )}
      </div>
      <div className="form-group">
        <label
          htmlFor="roleId"
          style={{ textAlign: isArabic ? "right" : "left" }}
        >
          {t("ROLE")}
          <span className="required">*</span>
        </label>

        <select
          id="roleId"
          {...register("roleId", { valueAsNumber: true })}
          style={{ textAlign: isArabic ? "right" : "left" }}
          defaultValue=""
          className="form-select"
        >
          <option value="" disabled>
            {t("SELECT_ROLE")}
          </option>

          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name_en}
            </option>
          ))}
        </select>

        {errors.roleId && (
          <span className="error-message">{t(errors.roleId.message)}</span>
        )}
      </div>
    </form>
  );
}