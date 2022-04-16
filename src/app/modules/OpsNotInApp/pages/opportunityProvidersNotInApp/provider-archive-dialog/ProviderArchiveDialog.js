import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/providers/providersActions";
import { useProvidersUIContext } from "../../ProvidersUIContext";

export function ProviderArchiveDialog({ id, show, onHide }) {
  // Providers UI Context
  const providersUIContext = useProvidersUIContext();
  const providersUIProps = useMemo(() => {
    return {
      setIds: providersUIContext.setIds,
      queryParams: providersUIContext.queryParams
    };
  }, [providersUIContext]);

  // Providers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.providers.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const [status
  ] = useState(0);

  const archiveProvider = () => {
    const input = {
      id,
      status
    };
    // server request for deleting provider by id
    dispatch(actions.updateProvider(input)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchProviders(providersUIProps.queryParams)).then(
        () => {
          onHide();
        }
      );

    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Archive OP Not in the App
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to archive this opportunity provider which is not in App?</span>
        )}
        {isLoading && <span>OP not in app is archiving...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={archiveProvider}
            className="btn btn-primary btn-elevate"
          >
            Archive
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
