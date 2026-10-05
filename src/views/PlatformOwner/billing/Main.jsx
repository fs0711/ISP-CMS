import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Main() {
  const [subscriptions, setSubscriptions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // ==================================================
  // LOAD BILLING DATA
  // ==================================================

  const loadBillingData = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("organization_subscriptions")
        .select(`
          id,
          organization_id,
          plan_id,
          status,
          started_at,
          expires_at,
          created_at,
          updated_at,
          organizations (
            name,
            slug
          ),
          saas_plans (
            name,
            price
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setSubscriptions(data || []);
    } catch (err) {
      console.error("Load billing error:", err);

      setError(
        err.message || "Failed to load billing information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBillingData();
  }, []);

  // ==================================================
  // SEARCH + STATUS FILTER
  // ==================================================

  const filteredSubscriptions = subscriptions.filter(
    (subscription) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        subscription.organizations?.name
          ?.toLowerCase()
          .includes(searchText) ||
        subscription.organizations?.slug
          ?.toLowerCase()
          .includes(searchText) ||
        subscription.saas_plans?.name
          ?.toLowerCase()
          .includes(searchText) ||
        subscription.status
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "all" ||
        subscription.status?.toLowerCase() ===
          statusFilter;

      return matchesSearch && matchesStatus;
    }
  );

  // ==================================================
  // ACTIVE SUBSCRIPTIONS
  // ==================================================

  const activeSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.status?.toLowerCase() === "active"
  );

  // ==================================================
  // MONTHLY RECURRING REVENUE
  // ==================================================

  const monthlyRevenue = activeSubscriptions.reduce(
    (total, subscription) => {
      const price = Number(
        subscription.saas_plans?.price || 0
      );

      return total + price;
    },
    0
  );

  // ==================================================
  // DATE FORMAT
  // ==================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  // ==================================================
  // PRICE FORMAT
  // ==================================================

  const formatPrice = (price) => {
    if (price === null || price === undefined) {
      return "-";
    }

    return `$${Number(price).toFixed(2)}`;
  };

  // ==================================================
  // STATUS STYLE
  // ==================================================

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-success";

      case "inactive":
        return "text-warning";

      case "expired":
        return "text-danger";

      case "cancelled":
      case "canceled":
        return "text-danger";

      default:
        return "text-slate-500";
    }
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="p-5">

      {/* HEADER */}
      <div className="intro-y flex items-center h-10 mb-5">
        <h2 className="text-lg font-medium truncate">
          Platform Billing
        </h2>
      </div>

      {/* ERROR */}
      {error && (
        <div className="intro-y alert alert-danger show mb-5">
          {error}
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-12 gap-6 mb-5">

        {/* TOTAL SUBSCRIPTIONS */}
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-4">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Total Subscriptions
            </div>

            <div className="text-2xl font-medium mt-2">
              {subscriptions.length}
            </div>

            <div className="text-slate-500 text-xs mt-1">
              All ISP subscriptions
            </div>
          </div>
        </div>

        {/* ACTIVE SUBSCRIPTIONS */}
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-4">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Active Subscriptions
            </div>

            <div className="text-2xl font-medium text-success mt-2">
              {activeSubscriptions.length}
            </div>

            <div className="text-slate-500 text-xs mt-1">
              Currently active ISP plans
            </div>
          </div>
        </div>

        {/* MRR */}
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-4">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Monthly Recurring Revenue
            </div>

            <div className="text-2xl font-medium mt-2">
              ${monthlyRevenue.toFixed(2)}
            </div>

            <div className="text-slate-500 text-xs mt-1">
              Based on active subscriptions
            </div>
          </div>
        </div>

      </div>

      {/* MAIN BILLING BOX */}
      <div className="intro-y box p-5">

        {/* TOP */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

          <div>
            <h3 className="text-base font-medium">
              ISP Billing Overview
            </h3>

            <div className="text-slate-500 text-sm mt-1">
              View subscription billing information for your ISP customers.
            </div>
          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={loadBillingData}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>

        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">

          <input
            type="text"
            className="form-control"
            placeholder="Search ISP, plan or status..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            className="form-select sm:w-48"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option value="all">
              All Statuses
            </option>

            <option value="active">
              Active
            </option>

            <option value="inactive">
              Inactive
            </option>

            <option value="expired">
              Expired
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="table table-report">

            <thead>
              <tr>
                <th>ISP</th>
                <th>PLAN</th>
                <th>MONTHLY PRICE</th>
                <th>STATUS</th>
                <th>STARTED</th>
                <th>EXPIRES</th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    Loading billing information...
                  </td>
                </tr>
              ) : filteredSubscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No billing records found.
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map(
                  (subscription) => (
                    <tr key={subscription.id}>

                      {/* ISP */}
                      <td>
                        <div className="font-medium">
                          {subscription.organizations
                            ?.name || "-"}
                        </div>

                        <div className="text-slate-500 text-xs">
                          {subscription.organizations
                            ?.slug || ""}
                        </div>
                      </td>

                      {/* PLAN */}
                      <td>
                        <div className="font-medium">
                          {subscription.saas_plans
                            ?.name || "-"}
                        </div>
                      </td>

                      {/* PRICE */}
                      <td>
                        <div className="font-medium">
                          {formatPrice(
                            subscription.saas_plans
                              ?.price
                          )}
                        </div>

                        <div className="text-slate-500 text-xs">
                          per month
                        </div>
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={getStatusClass(
                            subscription.status
                          )}
                        >
                          {subscription.status || "-"}
                        </span>
                      </td>

                      {/* START DATE */}
                      <td>
                        {formatDate(
                          subscription.started_at
                        )}
                      </td>

                      {/* EXPIRY DATE */}
                      <td>
                        {formatDate(
                          subscription.expires_at
                        )}
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}
        {!loading && (
          <div className="text-slate-500 text-sm mt-5">
            Showing{" "}
            <span className="font-medium text-slate-700">
              {filteredSubscriptions.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-700">
              {subscriptions.length}
            </span>{" "}
            subscriptions.
          </div>
        )}

      </div>

    </div>
  );
}

export default Main;

