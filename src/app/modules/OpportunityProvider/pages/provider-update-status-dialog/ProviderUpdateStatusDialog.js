import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProviderStatusCssClasses } from "../ProvidersUIHelpers";
import * as actions from "../../_redux/providersActions";
import { useProvidersUIContext } from "../ProvidersUIContext";

export function ProviderUpdateStatusDialog({ id, show, onHide }) {
  const providersUIContext = useProvidersUIContext();
  const providersUIProps = useMemo(() => {
    return {
      setIds: providersUIContext.setIds,
      queryParams: providersUIContext.queryParams,
    };
  }, [providersUIContext]);

  // Providers Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.opportunityProviders.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [status, setStatus] = useState(0);

  const updateStatus = () => {
    const input = {
      id,
      status,
    };

    dispatch(actions.updateProvider(input)).then(() => {
      // refresh list after deletion
      dispatch(
        actions.fetchOpportunityProviders(providersUIProps.queryParams)
      ).then(() => {
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected Provider
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to update status this provider?</span>
        )}
        {isLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-warning" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className={`form-control ${ProviderStatusCssClasses[status]}`}
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Archive</option>
            <option value="1">Active</option>
          </select>
        </div>
        <div className="form-group">
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
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
