// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const OpsNotInAppEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Provider Name is required"),
  interested: Yup.number()
    .min(0, "0 is minimum"),
});

export function ProviderEditForm({
  saveProvider,
  provider,
  actionsLoading,
  onHide,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={provider}
        validationSchema={OpsNotInAppEditSchema}
        onSubmit={(values) => {
          saveProvider(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Provider Name */}
                  <div className="col-lg-4">
                    <Field
                      name="name"
                      component={Input}
                      placeholder="Name"
                      label="Provider Name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/* Interested */}
                  <div className="col-lg-4">
                    <Field
                      name="interested"
                      component={Input}
                      placeholder="Interested"
                      label="Interested"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
