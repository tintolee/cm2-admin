/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";

export const NamesColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openDetailAppUserPage }
) => (
  <>
    <a
      className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder"
      onClick={() => openDetailAppUserPage(row.id)}
    >
      {row.firstName} {row.lastName}
    </a>
  </>
);