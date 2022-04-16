import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ProviderEditDialogHeader({ id }) {
  // provider Redux state
  const { providerForEdit, actionsLoading } = useSelector(
    (state) => ({
      providerForEdit: state.providers.providerForEdit,
      actionsLoading: state.providers.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Ops Not In App Details";
    if (providerForEdit && id) {
      _title = `Edit Ops Not In App - '${providerForEdit.name}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [providerForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
