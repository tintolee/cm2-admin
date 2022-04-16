import React from "react";
import { ProviderUsersLoadingDialog } from "./ProviderUsersLoadingDialog";
import { ProviderUserEditDialog } from "./provider-users-edit-dialog/ProviderUserEditDialog";
import { ProviderUsersFilter } from "./ProviderUsersFilter";
import { ProviderUsersTable } from "./ProviderUsersTable";

export function ProviderUsers() {
  return (
    <>
      <ProviderUsersLoadingDialog />
      <ProviderUserEditDialog />
      <div className="form margin-b-30">
        <ProviderUsersFilter />
      </div>
      <ProviderUsersTable />
    </>
  );
}
