import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Lucide, Alert } from "@/base-components";
import { supabase } from "@/lib/supabase";
import classnames from "classnames";

function Main() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [organization, setOrganization] = useState(null);
  const [overview, setOverview] = useState({
    activeSubscribers: 0,
    pendingInstallations: 0,
    openSupportTickets: 0,
    outstandingPayments: 0,
    activeResellers: 0,
    lowStockEquipment: 0,
  });

  const [recentSubscribers, setRecentSubscribers] = useState([]);
  const [pendingInstallations, setPendingInstallations] = useState([]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const quickActions = [
    {
      label: "Add Subscriber",
      icon: "UserPlus",
      path: "/subscribers",
    },
    {
      label: "Create Invoice",
      icon: "FileText",
      path: "/invoices",
    },
    {
      label: "Register Complaint",
      icon: "AlertCircle",
      path: "/support",
    },
    {
      label: "Add Package",
      icon: "Package",
      path: "/packages",
    },
    {
      label: "Add Equipment",
      icon: "HardDrive",
      path: "/inventory",
    },
    {
      label: "Add Employee",
      icon: "Briefcase",
      path: "/employees",
    },
  ];

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      // ---------------------------------------------------------
      // 1. Get currently logged-in user
      // ---------------------------------------------------------
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("You are not logged in.");
      }

      // ---------------------------------------------------------
      // 2. Get user's profile and organization
      // ---------------------------------------------------------
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, organization_id, role, full_name")
        .eq("id", user.id)
        .single();

      if (profileError) {
        throw profileError;
      }

      if (!profile?.organization_id) {
        throw new Error(
          "Your account is not linked to an ISP organization."
        );
      }

      const organizationId = profile.organization_id;

      // ---------------------------------------------------------
      // 3. Get organization
      // ---------------------------------------------------------
      const { data: organizationData, error: organizationError } =
        await supabase
          .from("organizations")
          .select("id, name, slug, status")
          .eq("id", organizationId)
          .single();

      if (organizationError) {
        throw organizationError;
      }

      setOrganization(organizationData);

      // ---------------------------------------------------------
      // 4. Get all subscribers for this organization
      // ---------------------------------------------------------
      const { data: subscribers, error: subscribersError } =
        await supabase
          .from("subscribers")
          .select(`
            id,
            full_name,
            package_id,
            installation_date,
            connection_status,
            created_at
          `)
          .eq("organization_id", organizationId)
          .order("created_at", { ascending: false });

      if (subscribersError) {
        throw subscribersError;
      }

      const subscriberRows = subscribers || [];

      // ---------------------------------------------------------
      // 5. Get packages for this organization
      // ---------------------------------------------------------
      const { data: packages, error: packagesError } = await supabase
        .from("packages")
        .select("id, name")
        .eq("organization_id", organizationId);

      if (packagesError) {
        throw packagesError;
      }

      const packageMap = {};

      (packages || []).forEach((pkg) => {
        packageMap[pkg.id] = pkg.name;
      });

      // ---------------------------------------------------------
      // 6. Calculate subscriber statistics
      // ---------------------------------------------------------
      const activeSubscribers = subscriberRows.filter(
        (subscriber) => subscriber.connection_status === "active"
      ).length;

      const pendingSubscribers = subscriberRows.filter(
        (subscriber) => subscriber.connection_status === "pending"
      );

      // ---------------------------------------------------------
      // 7. Recent subscribers
      // ---------------------------------------------------------
      const recent = subscriberRows.slice(0, 5).map((subscriber) => ({
        id: subscriber.id,
        name: subscriber.full_name || "Unnamed Subscriber",
        package:
          packageMap[subscriber.package_id] || "No Package",
        date: formatDate(subscriber.created_at),
        status: formatStatus(subscriber.connection_status),
        statusClass: getStatusClass(subscriber.connection_status),
      }));

      // ---------------------------------------------------------
      // 8. Pending installations
      // ---------------------------------------------------------
      const pending = pendingSubscribers.slice(0, 5).map((subscriber) => ({
        id: subscriber.id,
        name: subscriber.full_name || "Unnamed Subscriber",
        package:
          packageMap[subscriber.package_id] || "No Package",
        date: subscriber.installation_date
          ? formatDate(subscriber.installation_date)
          : "Not scheduled",
        technician: "Not assigned",
        status: subscriber.installation_date
          ? "Scheduled"
          : "Pending",
      }));

      setRecentSubscribers(recent);
      setPendingInstallations(pending);

      // ---------------------------------------------------------
      // 9. Dashboard overview
      //
      // These modules do not exist in the database yet:
      // payments
      // support_tickets
      // resellers
      // inventory
      //
      // Therefore they remain 0 instead of showing fake data.
      // ---------------------------------------------------------
      setOverview({
        activeSubscribers,
        pendingInstallations: pendingSubscribers.length,
        openSupportTickets: 0,
        outstandingPayments: 0,
        activeResellers: 0,
        lowStockEquipment: 0,
      });
    } catch (err) {
      console.error("Dashboard error:", err);

      setError(
        err?.message ||
          "Unable to load dashboard data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatStatus = (status) => {
    if (!status) return "Unknown";

    return status
      .charAt(0)
      .toUpperCase() + status.slice(1);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "active":
        return "text-success";

      case "pending":
        return "text-warning";

      case "suspended":
        return "text-danger";

      case "terminated":
        return "text-danger";

      default:
        return "text-slate-500";
    }
  };

  const overviewCards = [
    {
      label: "Active Subscribers",
      value: overview.activeSubscribers.toLocaleString(),
      icon: "Users",
      color: "text-primary",
    },
    {
      label: "Pending Installations",
      value: overview.pendingInstallations.toLocaleString(),
      icon: "Wrench",
      color: "text-warning",
    },
    {
      label: "Open Support Tickets",
      value: overview.openSupportTickets.toLocaleString(),
      icon: "LifeBuoy",
      color: "text-danger",
    },
    {
      label: "Outstanding Payments",
      value: `PKR ${overview.outstandingPayments.toLocaleString()}`,
      icon: "CreditCard",
      color: "text-danger",
    },
    {
      label: "Active Resellers",
      value: overview.activeResellers.toLocaleString(),
      icon: "Building2",
      color: "text-primary",
    },
    {
      label: "Low Stock Equipment",
      value: `${overview.lowStockEquipment} Items`,
      icon: "PackageX",
      color: "text-warning",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 gap-6">

        {/* BEGIN: Dashboard Header */}
        <div className="col-span-12 intro-y">
          <Alert className="box bg-primary text-white flex flex-wrap items-center justify-between gap-3 mb-6">
            {({ dismiss }) => (
              <>
                <span className="leading-relaxed break-words pr-2">
                  Welcome
                  {organization?.name
                    ? ` to ${organization.name}`
                    : ""}.
                  Monitor subscribers, billing, complaints,
                  installations and support tickets from one
                  dashboard.
                </span>

                <button
                  type="button"
                  className="btn-close text-white"
                  onClick={dismiss}
                  aria-label="Close"
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </button>
              </>
            )}
          </Alert>
        </div>

        <div className="col-span-12 intro-y flex flex-col sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-medium">
              Dashboard
            </h2>

            <div className="text-slate-500 mt-1">
              Here's what's happening across your network today.
            </div>
          </div>

          <div className="sm:ml-auto mt-3 sm:mt-0 flex items-center text-slate-500">
            <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
            {today}
          </div>
        </div>
        {/* END: Dashboard Header */}


        {/* BEGIN: Error */}
        {error && (
          <div className="col-span-12 intro-y">
            <div className="alert alert-danger show flex items-center">
              <Lucide
                icon="AlertCircle"
                className="w-5 h-5 mr-2"
              />

              <div className="flex-1">
                {error}
              </div>

              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={loadDashboard}
              >
                Retry
              </button>
            </div>
          </div>
        )}
        {/* END: Error */}


        {/* BEGIN: Quick Actions */}
        <div className="col-span-12 intro-y">
          <div className="box p-5">
            <div className="font-medium mb-4">
              Quick Actions
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="btn btn-outline-secondary flex flex-col items-center justify-center py-4 px-2"
                  onClick={() => navigate(action.path)}
                >
                  <Lucide
                    icon={action.icon}
                    className="w-5 h-5 mb-2"
                  />

                  <span className="text-xs text-center">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* END: Quick Actions */}


        {/* BEGIN: System Overview */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              System Overview
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-2">
            {overviewCards.map((card) => (
              <div
                key={card.label}
                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y"
              >
                <div className="box p-5 flex items-center">
                  <Lucide
                    icon={card.icon}
                    className={classnames(
                      "w-8 h-8 mr-4 flex-none",
                      card.color
                    )}
                  />

                  <div>
                    <div className="text-xl font-medium">
                      {loading ? "..." : card.value}
                    </div>

                    <div className="text-slate-500 text-xs mt-0.5">
                      {card.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* END: System Overview */}


        {/* BEGIN: Recent Subscribers */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Recent Subscribers
            </h2>

            <button
              type="button"
              className="ml-auto text-primary truncate"
              onClick={() => navigate("/subscribers")}
            >
              View All
            </button>
          </div>

          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">
                    CUSTOMER
                  </th>

                  <th className="whitespace-nowrap">
                    PACKAGE
                  </th>

                  <th className="whitespace-nowrap">
                    DATE JOINED
                  </th>

                  <th className="text-center whitespace-nowrap">
                    STATUS
                  </th>

                  <th className="text-center whitespace-nowrap">
                    ACTION
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-slate-500"
                    >
                      Loading subscribers...
                    </td>
                  </tr>
                ) : recentSubscribers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-slate-500"
                    >
                      No subscribers found.
                    </td>
                  </tr>
                ) : (
                  recentSubscribers.map((subscriber) => (
                    <tr
                      key={subscriber.id}
                      className="intro-x"
                    >
                      <td>
                        <div className="flex items-center">
                          <div className="w-9 h-9 flex-none flex items-center justify-center rounded-full bg-slate-100 mr-3">
                            <Lucide
                              icon="User"
                              className="w-4 h-4 text-slate-500"
                            />
                          </div>

                          <span className="whitespace-nowrap">
                            {subscriber.name}
                          </span>
                        </div>
                      </td>

                      <td className="whitespace-nowrap">
                        {subscriber.package}
                      </td>

                      <td className="whitespace-nowrap">
                        {subscriber.date}
                      </td>

                      <td className="w-40">
                        <div
                          className={classnames(
                            "flex items-center justify-center",
                            subscriber.statusClass
                          )}
                        >
                          <Lucide
                            icon={
                              subscriber.status === "Active"
                                ? "CheckSquare"
                                : "Clock"
                            }
                            className="w-4 h-4 mr-2"
                          />

                          {subscriber.status}
                        </div>
                      </td>

                      <td className="table-report__action w-32">
                        <div className="flex justify-center items-center">
                          <button
                            type="button"
                            className="flex items-center"
                            onClick={() =>
                              navigate("/subscribers")
                            }
                          >
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 mr-1"
                            />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Recent Subscribers */}


        {/* BEGIN: Recent Payments */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Recent Payments
            </h2>

            <button
              type="button"
              className="ml-auto text-primary truncate"
              onClick={() => navigate("/payments")}
            >
              View All
            </button>
          </div>

          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">
                    CUSTOMER
                  </th>

                  <th className="whitespace-nowrap">
                    METHOD
                  </th>

                  <th className="whitespace-nowrap">
                    DATE PAID
                  </th>

                  <th className="text-right whitespace-nowrap">
                    AMOUNT
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-6 text-slate-500"
                  >
                    No payment data available yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Recent Payments */}


        {/* BEGIN: Pending Installations */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Pending Installations
            </h2>

            <button
              type="button"
              className="ml-auto text-primary truncate"
              onClick={() => navigate("/subscribers")}
            >
              View All
            </button>
          </div>

          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">
                    CUSTOMER
                  </th>

                  <th className="whitespace-nowrap">
                    PACKAGE
                  </th>

                  <th className="whitespace-nowrap">
                    SCHEDULED DATE
                  </th>

                  <th className="text-center whitespace-nowrap">
                    TECHNICIAN
                  </th>

                  <th className="text-center whitespace-nowrap">
                    STATUS
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-slate-500"
                    >
                      Loading installations...
                    </td>
                  </tr>
                ) : pendingInstallations.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-6 text-slate-500"
                    >
                      No pending installations.
                    </td>
                  </tr>
                ) : (
                  pendingInstallations.map((installation) => (
                    <tr
                      key={installation.id}
                      className="intro-x"
                    >
                      <td className="whitespace-nowrap">
                        {installation.name}
                      </td>

                      <td className="whitespace-nowrap">
                        {installation.package}
                      </td>

                      <td className="whitespace-nowrap">
                        {installation.date}
                      </td>

                      <td className="text-center whitespace-nowrap">
                        {installation.technician}
                      </td>

                      <td className="w-40">
                        <div className="flex items-center justify-center text-warning">
                          <Lucide
                            icon="Clock"
                            className="w-4 h-4 mr-2"
                          />

                          {installation.status}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Pending Installations */}


        {/* BEGIN: Latest Support Tickets */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Latest Support Tickets
            </h2>

            <button
              type="button"
              className="ml-auto text-primary truncate"
              onClick={() => navigate("/support")}
            >
              View All
            </button>
          </div>

          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">
                    TICKET #
                  </th>

                  <th className="whitespace-nowrap">
                    CUSTOMER
                  </th>

                  <th className="whitespace-nowrap">
                    ISSUE
                  </th>

                  <th className="text-center whitespace-nowrap">
                    PRIORITY
                  </th>

                  <th className="text-center whitespace-nowrap">
                    STATUS
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-6 text-slate-500"
                  >
                    No support ticket data available yet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Latest Support Tickets */}

      </div>
    </>
  );
}

export default Main;