import {
  DataGrid,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";



export default function DataTable({
  rows,
  columns,
  loading = false,
  onRowClick,
  onRowSelectionModelChange,
}) {
  return (
    <Box sx={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[5, 10, 25, 50]}
        onRowClick={(params) => onRowClick?.(params.row)}
        onRowSelectionModelChange={(newSelectionModel) => {
          onRowSelectionModelChange?.(newSelectionModel);
        }}
        sx={{ fontFamily: "Cairo" }}
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