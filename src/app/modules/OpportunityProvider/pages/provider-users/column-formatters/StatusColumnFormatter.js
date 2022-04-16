import React from "react";
import {
    ProviderUserStatusCssClasses,
    ProviderUserStatusTitles,
} from "../ProviderUsersUIHelper";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${ProviderUserStatusCssClasses[row.status]
            } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
            {ProviderUserStatusTitles[row.status]}
        </span>
    );
}