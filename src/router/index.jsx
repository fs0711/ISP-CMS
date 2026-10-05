import { useEffect, useState } from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { supabase } from "@/lib/supabase";

// AUTH
import ForgotPassword from "../views/Auth/ForgotPassword/Main";
import EmailVerified from "../views/Auth/EmailVerified/Main";
import ResetPassword from "../views/Auth/ResetPassword/Main";
import Login from "../views/login/Main";
import Register from "../views/register/Main";

// PLATFORM OWNER
import PlatformOwner from "../views/PlatformOwner/Main";
import Organizations from "../views/PlatformOwner/Organizations/Main";
import Subscriptions from "../views/PlatformOwner/Subscriptions/Main";
import PlatformBilling from "../views/PlatformOwner/Billing/Main";
import UsersRoles from "../views/PlatformOwner/UsersRoles/Main";
import PlatformReports from "../views/PlatformOwner/Reports/Main";
import PlatformSettings from "../views/PlatformOwner/Settings/Main";

// LAYOUT
import SideMenu from "../layouts/side-menu/Main";

// ISP PAGES
import DashboardOverview2 from "../views/dashboard-overview-2/Main";
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
import Reports from "../views/reports/Main";
import Settings from "../views/settings/Main";
import UpdateProfile from "../views/update-profile/Main";
import ChangePassword from "../views/change-password/Main";

// OTHER
import ErrorPage from "../views/error-page/Main";


// =====================================================
// PROTECTED ROUTE
// =====================================================

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setSession(session);
        setLoading(false);
      }
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setSession(session);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-500">
          Loading...
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// =====================================================
// ROUTER
// =====================================================

function Router() {
  const routes = [
    // =================================================
    // PUBLIC AUTH ROUTES
    // =================================================

    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "/register",
      element: <Register />,
    },

    {
      path: "/forgot-password",
      element: <ForgotPassword />,
    },

    {
      path: "/reset-password",
      element: <ResetPassword />,
    },

    {
      path: "/email-verified",
      element: <EmailVerified />,
    },


    // =================================================
    // PROTECTED APPLICATION
    // =================================================

    {
      path: "/",
      element: (
        <ProtectedRoute>
          <SideMenu />
        </ProtectedRoute>
      ),

      children: [

        // =============================================
        // ISP OWNER / ISP ADMIN
        // =============================================

        {
          index: true,
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


        // =============================================
        // PLATFORM OWNER
        // =============================================

        {
          path: "platform-owner",
          element: <PlatformOwner />,
        },

        {
          path: "platform-owner/organizations",
          element: <Organizations />,
        },

        {
          path: "platform-owner/subscriptions",
          element: <Subscriptions />,
        },

        {
          path: "platform-owner/billing",
          element: <PlatformBilling />,
        },

        {
          path: "platform-owner/users-roles",
          element: <UsersRoles />,
        },

        {
          path: "platform-owner/reports",
          element: <PlatformReports />,
        },

        {
          path: "platform-owner/settings",
          element: <PlatformSettings />,
        },
      ],
    },


    // =================================================
    // ERROR PAGE
    // =================================================

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