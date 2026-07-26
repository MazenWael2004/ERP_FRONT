import { MainLayout } from "../../../layouts/MainLayout";
import TableSort from "../../../shared/components/TableSort";
import { Badge } from "@mantine/core";
import Header from "../../../shared/components/Header";

const jobs = [
  {
    id: 1,
    name: "Software Engineer",
    department: "IT",
    status: "Active",
  },
  {
    id: 2,
    name: "Accountant",
    department: "Finance",
    status: "Inactive",
  },
];

function ViewJobs() {
  return (
    <MainLayout header={<Header route='Job' onClick={()=>console.log('Job Added')} />}>
     <TableSort
      data={jobs}
      rowKey="id"
      selectable
      onSelectionChange={(rows) => {
        console.log("Selected rows:", rows);
      }}
      columns={[
        {
          key: "name",
          label: "Job",
        },
        {
          key: "department",
          label: "Department",
        },
        {
          key: "status",
          label: "Status",
          render: (value) => (
            <Badge
              color={value === "Active" ? "green" : "red"}
              variant="light"
            >
              {String(value)}
            </Badge>
          ),
        },
      ]}
    />
      
    </MainLayout>
  );
}

export default ViewJobs;
