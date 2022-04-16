import React from "react";
import {
    AppUserStatusCssClasses,
    AppUserStatusTitles,
} from "../../AppUsersUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${AppUserStatusCssClasses[row.status]
            } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
            {AppUserStatusTitles[row.status]}
        </span>
    );
}