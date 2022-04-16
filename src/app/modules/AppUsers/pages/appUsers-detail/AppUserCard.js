/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { toAbsoluteUrl } from "../../../../../_metronic/_helpers";

export function AppUserCard({ user }) {
  return (
    <>
      {user && (
        <div className="d-flex mb-9">
          <div className="flex-shrink-0 mr-7 mt-lg-0 mt-3">
            <div className="symbol symbol-50 symbol-lg-120">
              <img src={toAbsoluteUrl("/media/users/100_5.jpg")} alt="" />
            </div>
          </div>
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between flex-wrap mt-1">
              <div className="d-flex mr-3">
                <a
                  href="#"
                  className="text-dark-75 text-hover-primary font-size-h5 font-weight-bold mr-3"
                >
                  {user.firstName} {user.lastName}
                </a>
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-between mt-1">
              <div className="d-flex flex-column flex-grow-1 pr-8">
                <div className="d-flex flex-wrap mb-4">
                  <a
                    href="#"
                    className="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                  >
                    <i className="flaticon2-new-email mr-2 font-size-lg"></i>
                    {user.email}
                  </a>
                  <a
                    href="#"
                    className="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                  >
                    <i className="flaticon2-phone mr-2 font-size-lg"></i>
                    {user.mobileNumber}
                  </a>
                  <a
                    href="#"
                    className="text-dark-50 text-hover-primary font-weight-bold mr-lg-8 mr-5 mb-lg-0 mb-2"
                  >
                    <i className="flaticon2-calendar-3 mr-2 font-size-lg"></i>
                    Student
                  </a>
                  <a
                    href="#"
                    className="text-dark-50 text-hover-primary font-weight-bold"
                  >
                    <i className="flaticon2-placeholder mr-2 font-size-lg"></i>
                    postcodeArea
                  </a>
                </div>
                <span className="font-weight-bold text-dark-50">
                  Bio: {user.biography}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
