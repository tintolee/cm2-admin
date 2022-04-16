import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/providers/providersActions";
import { useProvidersUIContext } from "../../ProvidersUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function ProvidersArchiveDialog({ show, onHide }) {
  // Providers UI Context
  const providersUIContext = useProvidersUIContext();
  const providersUIProps = useMemo(() => {
    return {
      ids: providersUIContext.ids,
      setIds: providersUIContext.setIds,
      queryParams: providersUIContext.queryParams,
    };
  }, [providersUIContext]);

  // Providers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.providers.actionsLoading }),
    shallowEqual
  );

  // if cprovider weren't selected we should close modal
  useEffect(() => {
    if (!providersUIProps.ids || providersUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providersUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => { }, [isLoading, dispatch]);

  const archiveProviders = () => {
    // server request for archive provider by selected ids
    dispatch(actions.archiveProviders(providersUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchProviders(providersUIProps.queryParams)).then(
        () => {
          // clear selections list
          providersUIProps.setIds([]);
          // closing archive modal
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
          Archive OPs which are not in App
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to archive selected Oppotunity providers which are not in App?</span>
        )}
        {isLoading && <span>Ops not in app are archiving...</span>}
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
            onClick={archiveProviders}
            className="btn btn-primary btn-elevate"
          >
            Archive
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
