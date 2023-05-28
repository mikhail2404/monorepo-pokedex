import React from "react";
import { styled } from "@mui/material/styles";
import {
    DataGrid,
    GridColDef,
    GridEventListener,
    GridRowsProp
} from "@mui/x-data-grid";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";

const StyledDataGrid = styled(DataGrid)(() => ({
    color: "#FFFFFF",
    fontSize: "inherit",
    "& .MuiToolbar-root": {
        color: "#FFFFFF",
        fontSize: "1.5rem"
    },
    "& .MuiTablePagination-selectIcon": {
        color: "#FFFFFF"
    },
    "& .MuiButtonBase-root": {
        color: "#FFFFFF"
    },
    "& .MuiTablePagination-displayedRows": {
        fontSize: "inherit"
    },
    "& .MuiTablePagination-selectLabel": {
        fontSize: "inherit"
    }
}));

interface PokemonGrid {
    columns: GridColDef[];
    rowsCount: number;
    paginationModelChangeHandler: (page: number, pageSize: number) => void;
    handleRowClick: GridEventListener<"rowClick">;
    initialState: GridInitialStateCommunity;
    rows: GridRowsProp;
}

const PokemonGrid: React.FC<PokemonGrid> = ({
                                                columns,
                                                rowsCount,
                                                paginationModelChangeHandler,
                                                handleRowClick,
                                                initialState,
                                                rows
                                            }) => {
    return (
        <StyledDataGrid
            rowHeight={120}
            initialState={initialState}
            paginationMode="server"
            onRowClick={handleRowClick}
            rowCount={rowsCount}
            rows={rows}
            columns={columns}
            pageSizeOptions={[20, 50, 100]}
            onPaginationModelChange={({ page, pageSize }) =>
                paginationModelChangeHandler(page, pageSize)
            }
        />
    );
};

export default PokemonGrid;
