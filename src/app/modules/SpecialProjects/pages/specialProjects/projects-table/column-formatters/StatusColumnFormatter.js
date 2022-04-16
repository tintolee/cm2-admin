import React from "react";
import {
    ProjectStatusCssClasses,
    ProjectStatusTitles,
} from "../../../ProjectsUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${ProjectStatusCssClasses[row.status]
            } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
            {ProjectStatusTitles[row.status]}
        </span>
    );
}