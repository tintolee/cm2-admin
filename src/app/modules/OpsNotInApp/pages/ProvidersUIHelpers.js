export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const ProviderStatusCssClasses = ["danger", "success", ""];
export const ProviderStatusTitles = ["Archive","Active"];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "50", value: 50 }
];
export const initialFilter = {
  filter: {
    name: { contains: "" },
    interested: { contains: "" },
  },
  sortOrder: "asc", // asc||desc
  sortField: "id",
  pageNumber: 1,
  pageSize: 10
};
