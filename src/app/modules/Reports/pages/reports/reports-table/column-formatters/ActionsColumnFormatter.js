/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";

export const ActionsColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openUpdateReportStatusDialog }
) => (
    <>
      <OverlayTrigger
        overlay={<Tooltip id="products-edit-tooltip">Edit the status of this Report</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
          onClick={() => openUpdateReportStatusDialog(row.id)}
        >
          <span className="svg-icon svg-icon-md svg-icon-primary">
            <SVG
              src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
            />
          </span>
        </a>
      </OverlayTrigger>

      <> </>
      <OverlayTrigger
        overlay={<Tooltip id="products-delete-tooltip">View Report</Tooltip>}
      >
        <a
          className="btn btn-icon btn-light btn-hover-danger btn-sm"
        >
          <span className="svg-icon svg-icon-md svg-icon-danger">
            <SVG src={toAbsoluteUrl("/media/svg/icons/Files/File.svg")} />
          </span>
        </a>
      </OverlayTrigger>
    </>
  );
