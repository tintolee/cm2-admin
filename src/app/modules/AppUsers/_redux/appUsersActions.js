import * as requestFromServer from "./appUsersCrud";
import { appUsersSlice, callTypes } from "./appUsersSlice";

const { actions } = appUsersSlice;

export const fetchAppUsers = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .getAllAppUsers(queryParams)
    .then((response) => {
      const { items } = response.data.listSeekers;
      dispatch(actions.appUsersFetched({ items }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find app users";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchAppUser = (id) => (dispatch) => {
  if (!id) {
    return dispatch(
      actions.appUserFetched({ appUserForDetail: undefined })
    );
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getAppUserById(id)
    .then((response) => {
      const appUser = response.data.getSeeker;
      dispatch(actions.appUserFetched({ appUserForDetail: appUser }));
    })
    .catch((error) => {
      console.log(error);
      error.clientMessage = "Can't find app user";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateAppUser = appUser => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
      .updateAppUser(appUser)
      .then(() => {
          dispatch(actions.appUserUpdated({ appUser }));
      })
      .catch(error => {
          error.clientMessage = "Can't update app user";
          dispatch(actions.catchError({ error, callType: callTypes.action }));
      });
};
