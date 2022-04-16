export const ProviderUserStatusCssClasses = ["danger", "success", ""];
export const ProviderUserStatusTitles = ["Archived", "Active"];
export const defaultSorted = [{ dataField: "firstName", order: "asc" }];
export const sizePerPageList = [
  { text: "3", value: 3 },
  { text: "5", value: 5 },
];
export const initialFilter = {
  // filter: {
  //   firstName: ""
  // },
  filter: null,
  sortOrder: "asc", // asc||desc
  sortField: "firstName",
  pageNumber: 1,
  pageSize: 5,
};
