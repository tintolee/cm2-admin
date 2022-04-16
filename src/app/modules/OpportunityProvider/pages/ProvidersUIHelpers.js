export const ProviderStatusCssClasses = ["danger", "success", ""];
export const ProviderStatusTitles = ["Archive", "Active"];
export const defaultSorted = [{ dataField: "id", order: "asc" }];
export const EDUCATIONALINSTITUTION = [
  { text: "Yes", value: true },
  { text: "No", value: false },
];
export const sizePerPageList = [
  { text: "10", value: 10 },
  { text: "50", value: 50 },
];
//Filter for GraphQL query
export const initialFilter = {
  filter: null,
  sortOrder: "asc", // asc||desc
  sortField: "name",
  pageNumber: 1,
  pageSize: 10,
};
