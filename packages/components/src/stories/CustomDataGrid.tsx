import React from "react";
import { styled } from "@mui/material/styles";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridEventListener,
  GridFeatureMode,
  GridPaginationModel,
  GridRowsProp,
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

const StyledDataGrid = styled(DataGrid)(() => ({
  color: "#FFFFFF",
  fontSize: "inherit",
  "& .MuiToolbar-root": {
    color: "#FFFFFF",
    fontSize: "1.5rem",
  },
  "& .MuiTablePagination-selectIcon": {
    color: "#FFFFFF",
  },
  "& .MuiButtonBase-root": {
    color: "#FFFFFF",
  },
  "& .MuiTablePagination-displayedRows": {
    fontSize: "inherit",
  },
  "& .MuiTablePagination-selectLabel": {
    fontSize: "inherit",
  },
}));

interface CustomDataGridProps {
  columns: GridColDef[];
  rowsCount?: number;
  paginationModelChangeHandler?: (
    model: GridPaginationModel,
    details: GridCallbackDetails
  ) => void;
  handleRowClick?: GridEventListener<"rowClick">;
  initialState?: GridInitialStateCommunity;
  rows: GridRowsProp;
  rowHeight: number;
  pageSizeOptions: number[];
  paginationMode: GridFeatureMode;
}

const CustomDataGrid: React.FC<CustomDataGridProps> = ({
  columns,
  rowsCount,
  paginationModelChangeHandler,
  handleRowClick,
  initialState,
  rows,
  rowHeight,
  pageSizeOptions,
  paginationMode,
}) => {
  return (
    <StyledDataGrid
      rowHeight={rowHeight}
      initialState={initialState}
      paginationMode={paginationMode}
      onRowClick={handleRowClick}
      rowCount={rowsCount}
      rows={rows}
      columns={columns}
      pageSizeOptions={pageSizeOptions}
      onPaginationModelChange={paginationModelChangeHandler}
    />
  );
};

export default CustomDataGrid;
