import Layout from "@components/dashboard/Layout";
import React, { ReactElement } from "react";
import type { NextPageWithLayout } from "../_app";

const Users: NextPageWithLayout = () => {
  return <div>Users</div>;
};

Users.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
export default Users;
