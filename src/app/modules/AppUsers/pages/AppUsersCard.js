import React from "react";
import {
    Card,
    CardBody,
    CardHeader
} from "../../../../_metronic/_partials/controls";
import { AppUsersFilter } from "./appUsers-filter/AppUsersFilter";
import { AppUsersTable } from "./appUsers-table/AppUsersTable";

export function AppUsersCard() {

    return (
        <Card>
            <CardHeader title="App Users"></CardHeader>
            <CardBody>
                <AppUsersFilter />
                <AppUsersTable />
            </CardBody>
        </Card>
    );
}