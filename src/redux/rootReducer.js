import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";
import { customersSlice } from "../app/modules/ECommerce/_redux/customers/customersSlice";
import { productsSlice } from "../app/modules/ECommerce/_redux/products/productsSlice";
import { providersSlice } from "../app/modules/OpsNotInApp/_redux/providers/providerSlice";
import { remarksSlice } from "../app/modules/ECommerce/_redux/remarks/remarksSlice";
import { specificationsSlice } from "../app/modules/ECommerce/_redux/specifications/specificationsSlice";
import { opportunityProvidersSlice } from "../app/modules/OpportunityProvider/_redux/providersSlice";
import { projectsSlice } from "../app/modules/SpecialProjects/_redux/projects/projectsSlice";
import { reportsSlice } from "../app/modules/Reports/_redux/reports/reportsSlice";
import { appUsersSlice } from "../app/modules/AppUsers/_redux/appUsersSlice";
import { opportunityProviderUsersSlice } from "../app/modules/OpportunityProvider/_redux/providerUsers/providerUsersSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  products: productsSlice.reducer,
  projects: projectsSlice.reducer,
  reports: reportsSlice.reducer,
  remarks: remarksSlice.reducer,
  providers: providersSlice.reducer,
  specifications: specificationsSlice.reducer,
  opportunityProviders: opportunityProvidersSlice.reducer,
  appUsers: appUsersSlice.reducer,
  opportunityProviderUsers: opportunityProviderUsersSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
