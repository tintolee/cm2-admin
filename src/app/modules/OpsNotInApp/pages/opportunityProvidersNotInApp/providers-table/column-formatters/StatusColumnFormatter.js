import React from "react";
import {
    ProviderStatusCssClasses,
    ProviderStatusTitles,
} from "../../../ProvidersUIHelpers";

export function StatusColumnFormatter(cellContent, row) {
    const getLabelCssClasses = () => {
        return `label label-lg label-light-${ProviderStatusCssClasses[row.status]
            } label-inline`;
    };
    return (
        <span className={getLabelCssClasses()}>
            {ProviderStatusTitles[row.status]}
        </span>
    );
}