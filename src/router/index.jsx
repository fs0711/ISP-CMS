import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/side-menu/Main";
import DashboardOverview2 from "../views/dashboard-overview-2/Main";
import Login from "../views/login/Main";
import Register from "../views/register/Main";
import ErrorPage from "../views/error-page/Main";
import UpdateProfile from "../views/update-profile/Main";
import ChangePassword from "../views/change-password/Main";
import Subscribers from "../views/subscribers/Main";
import Packages from "../views/packages/Main";
import Billing from "../views/billing/Main";
import Payments from "../views/payments/Main";
import Invoices from "../views/invoices/Main";
import Resellers from "../views/resellers/Main";
import Support from "../views/support/Main";
import Inventory from "../views/inventory/Main";
import Network from "../views/network/Main";
import Employees from "../views/employees/Main";
import Roles from "../views/roles/Main";
import Settings from "../views/settings/Main";
import Reports from "../views/reports/Main";

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
        {
          path: "/",
          element: <DashboardOverview2 />,
        },
        {
          path: "subscribers",
          element: <Subscribers />,
        },
        {
          path: "packages",
          element: <Packages />,
        },
        {
          path: "billing",
          element: <Billing />,
        },
        {
          path: "payments",
          element: <Payments />,
        },
        {
          path: "invoices",
          element: <Invoices />,
        },
        {
          path: "resellers",
          element: <Resellers />,
        },
        {
          path: "support",
          element: <Support />,
        },
        {
          path: "inventory",
          element: <Inventory />,
        },
        {
          path: "network",
          element: <Network />,
        },
        {
          path: "employees",
          element: <Employees />,
        },
        {
          path: "roles",
          element: <Roles />,
        },
        {
          path: "reports",
          element: <Reports />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;