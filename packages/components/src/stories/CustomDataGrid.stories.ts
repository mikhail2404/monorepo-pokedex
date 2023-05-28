import { GridColDef, GridEventListener } from "@mui/x-data-grid";
import type { Meta, StoryObj } from "@storybook/react";

import CustomDataGrid from "./CustomDataGrid";

const meta: Meta = {
  title: "Example/CustomDataGrid",
  component: CustomDataGrid,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const handleRowClick: GridEventListener<"rowClick"> = (params) => {
  console.log({ params });
};

const columns: GridColDef[] = [
  { field: "name", headerName: "name", flex: 1 },
  { field: "id", headerName: "id", flex: 1 },
];

const rows = [
  {
    id: "#1",
    name: "bulbasaur",
  },
  {
    id: "#2",
    name: "ivysaur",
  },
  {
    id: "#3",
    name: "venusaur",
  },
  {
    id: "#4",
    name: "charmander",
  },
  {
    id: "#5",
    name: "charmeleon",
  },
];

const paginationModelChangeHandler = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  console.log({ page, pageSize });
};

export const Primary: Story = {
  args: {
    rowHeight: 120,
    initialState: {
      pagination: {
        paginationModel: { page: 0, pageSize: 3 },
      },
    },
    paginationMode: "client",
    handleRowClick: handleRowClick,
    rowsCount: rows.length,
    rows: rows,
    columns: columns,
    pageSizeOptions: [1, 3, 5],
    paginationModelChangeHandler: paginationModelChangeHandler,
  },
};

const styles = `
  <style>
    .css-10skpf4{
      background-color: #222;
      color: #fff;
      padding: 1rem;
    }
  </style>
`;

document.head.insertAdjacentHTML("beforeend", styles);
