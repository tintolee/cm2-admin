/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";

export const NameColumnFormatter = (
  cellContent,
  row,
  rowIndex,
  { openEditProviderPage }
) => (
  <>
    <a
      className="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder"
      onClick={() => openEditProviderPage(row.id)}
    >
      {row.name}
    </a>
  </>
);
