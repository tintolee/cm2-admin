import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/providerUsers/providerUsersActions";
import { ProviderUserEditDialogHeader } from "./ProviderUserEditDialogHeader";
import { ProviderUserEditForm } from "./ProviderUserEditForm";
import { useProviderUsersUIContext } from "../ProviderUsersUIContext";

export function ProviderUserEditDialog() {
  // ProviderUsers UI Context
  const providerUsersUIContext = useProviderUsersUIContext();
  const providerUsersUIProps = useMemo(() => {
    return {
      id: providerUsersUIContext.selectedId,
      providerId: providerUsersUIContext.providerId,
      queryParams: providerUsersUIContext.queryParams,
      showEditProviderUserDialog:
        providerUsersUIContext.showEditProviderUserDialog,
      closeEditProviderUserDialog:
        providerUsersUIContext.closeEditProviderUserDialog,
      initProviderUser: providerUsersUIContext.initProviderUser,
    };
  }, [providerUsersUIContext]);

  // ProviderUsers Redux state
  const dispatch = useDispatch();
  const { actionsLoading, providerUserForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.opportunityProviderUsers.actionsLoading,
      providerUserForEdit: state.opportunityProviderUsers.providerUserForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server request for getting ProviderUser by seleted id
    dispatch(actions.fetchProviderUser(providerUsersUIProps.id));
  }, [providerUsersUIProps.id, dispatch]);

  const saveProviderUser = (providerUser) => {
    if (!providerUsersUIProps.id) {
      // server request for creating providerUsers
      dispatch(actions.createProviderUser(providerUser)).then(() => {
        // refresh list after deletion
        dispatch(
          actions.fetchProviderUsers(
            providerUsersUIProps.queryParams,
            providerUsersUIProps.providerId
          )
        ).then(() => {
          // closing edit modal
          providerUsersUIProps.closeEditProviderUserDialog();
        });
      });
    } else {
      // server request for updating ProviderUsers
      const input = {
        id: providerUser.id,
        firstName: providerUser.firstName,
        lastName: providerUser.lastName,
        email: providerUser.email,
        status: providerUser.status,
        opportunityProviderUserOpportunityProviderId:
          providerUsersUIProps.providerId,
      };

      dispatch(actions.updateProviderUser(input)).then(() => {
        // refresh list after deletion
        dispatch(
          // refresh list after deletion
          actions.fetchProviderUsers(
            providerUsersUIProps.queryParams,
            providerUsersUIProps.providerId
          )
        ).then(() => {
          // closing edit modal
          providerUsersUIProps.closeEditProviderUserDialog();
        });
      });
    }
  };

  return (
    <Modal
      show={providerUsersUIProps.showEditProviderUserDialog}
      onHide={providerUsersUIProps.closeEditProviderUserDialog}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProviderUserEditDialogHeader id={providerUsersUIProps.id} />
      <ProviderUserEditForm
        saveProviderUser={saveProviderUser}
        actionsLoading={actionsLoading}
        providerUser={
          providerUserForEdit || providerUsersUIProps.initProviderUser
        }
        onHide={providerUsersUIProps.closeEditProviderUserDialog}
      />
    </Modal>
  );
}
