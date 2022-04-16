import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../_metronic/_partials/controls";
import { EDUCATIONALINSTITUTION } from "../ProvidersUIHelpers";

// Validation schema
const ProviderEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(250, "Maximum 250 symbols")
    .required("Name is required"),
  companyNo: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(250, "Maximum 250 symbols")
    .required("Company/Charity No is required"),
  email: Yup.string()
    .email("Wrong email format")
    .min(6, "Minimum 6 symbols")
    .max(100, "Maximum 100 symbols")
    .required("Email is required"),
  parent: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(250, "Maximum 250 symbols"),
  educationalInstitution: Yup.bool().required(
    "Educational Institution is required"
  ),
});

export function ProviderEditForm({ provider, btnRef, saveProvider }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={provider}
        validationSchema={ProviderEditSchema}
        onSubmit={(values) => {
          saveProvider(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Name"
                    label="Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="companyNo"
                    component={Input}
                    placeholder="Company/Charity No"
                    label="Company/Charity No"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="parent"
                    component={Input}
                    placeholder="Parent"
                    label="Parent"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    type="email"
                    name="email"
                    component={Input}
                    placeholder="Email"
                    label="Email"
                  />
                </div>
                <div className="col-lg-4">
                  <Select
                    name="educationalInstitution"
                    label="Educational Institution?"
                  >
                    {EDUCATIONALINSTITUTION.map((institution) => (
                      <option key={institution.text} value={institution.value}>
                        {institution.text}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
