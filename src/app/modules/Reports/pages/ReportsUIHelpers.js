export const ReportStatusCssClasses = ["danger", "success", ""];
export const ReportStatusTitles = ["Completed", "New"];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "50", value: 50 }
];
export const initialFilter = {
  filter: {
    dateTime: { contains: "" },
    from: { contains: "" },
    details: { contains: "" },
    type: { contains: "" },
    about: { contains: "" }
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};
