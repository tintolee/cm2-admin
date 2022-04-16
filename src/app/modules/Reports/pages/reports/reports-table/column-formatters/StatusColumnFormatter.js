import React from "react";
import {
    ReportStatusCssClasses,
    ReportStatusTitles,
} from "../../../ReportsUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${ReportStatusCssClasses[row.status]
            } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
            {ReportStatusTitles[row.status]}
        </span>
    );
}