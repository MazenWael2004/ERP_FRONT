import { DataGrid} from "@mui/x-data-grid";
import type {GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";

interface DataTableProps<T> {
  rows: T[];
  columns: GridColDef[];
  loading?: boolean;
}

export default function DataTable<T extends { id: number | string }>({
  rows,
  columns,
  loading = false,
}: DataTableProps<T>) {
  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25, 50]}
        sx={{fontFamily:"Cairo"}}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}
      />
    </Box>
  );
}