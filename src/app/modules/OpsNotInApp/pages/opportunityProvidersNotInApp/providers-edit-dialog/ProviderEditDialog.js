import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/providers/providersActions";
import { ProviderEditDialogHeader } from "./ProviderEditDialogHeader";
import { ProviderEditForm } from "./ProviderEditForm";
import { useProvidersUIContext } from "../../ProvidersUIContext";

export function ProviderEditDialog({ id, show, onHide }) {
  // Provider UI Context
  const providersUIContext = useProvidersUIContext();
  const providersUIProps = useMemo(() => {
    return {
      initProvider: providersUIContext.initProvider,
    };
  }, [providersUIContext]);

  // Provider Redux state
  const dispatch = useDispatch();

  const { providerForEdit, actionsLoading } = useSelector(
    (state) => ({
      providerForEdit: state.providers.providerForEdit,
      actionsLoading: state.providers.actionsLoading,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Provider by id
    dispatch(actions.fetchProvider(id));
  }, [id, dispatch]);

  // server request for saving provider
  const saveProvider = (provider) => {
    if (!id) {
      // server request for creating provider
      dispatch(actions.createProvider(provider)).then(() => onHide());
    } else {
      const input = {
        id: provider.id,
        name: provider.name,
        interested: provider.interested,
        status: provider.status
      };
      dispatch(actions.updateProvider(input)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ProviderEditDialogHeader id={id} />
      <ProviderEditForm
        saveProvider={saveProvider}
        actionsLoading={actionsLoading}
        provider={providerForEdit || providersUIProps.initProvider}
        onHide={onHide}
      />
    </Modal>
  );
}
