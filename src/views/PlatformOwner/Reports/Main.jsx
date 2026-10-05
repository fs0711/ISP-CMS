import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Main() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [organizations, setOrganizations] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [plans, setPlans] = useState([]);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        organizationsResult,
        subscriptionsResult,
        plansResult,
      ] = await Promise.all([
        supabase
          .from("organizations")
          .select("id, name, slug, status")
          .order("name"),

        supabase
          .from("organization_subscriptions")
          .select(`
            id,
            organization_id,
            plan_id,
            status,
            started_at,
            expires_at,
            created_at,
            saas_plans (
              id,
              name,
              price
            ),
            organizations (
              id,
              name,
              slug
            )
          `)
          .order("created_at", { ascending: false }),

        supabase
          .from("saas_plans")
          .select("id, name, price")
          .order("price"),
      ]);

      if (organizationsResult.error) {
        throw organizationsResult.error;
      }

      if (subscriptionsResult.error) {
        throw subscriptionsResult.error;
      }

      if (plansResult.error) {
        throw plansResult.error;
      }

      setOrganizations(organizationsResult.data || []);
      setSubscriptions(subscriptionsResult.data || []);
      setPlans(plansResult.data || []);
    } catch (err) {
      console.error("Platform reports error:", err);
      setError(err.message || "Failed to load platform reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const activeOrganizations = organizations.filter(
    (organization) => organization.status === "active"
  );

  const inactiveOrganizations = organizations.filter(
    (organization) => organization.status !== "active"
  );

  const activeSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === "active"
  );

  const totalMonthlyRevenue = activeSubscriptions.reduce(
    (total, subscription) => {
      return total + Number(subscription.saas_plans?.price || 0);
    },
    0
  );

  const getPlanCount = (planId) => {
    return subscriptions.filter(
      (subscription) =>
        subscription.plan_id === planId &&
        subscription.status === "active"
    ).length;
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `PKR ${Number(amount || 0).toLocaleString()}`;
  };

  const getStatusClass = (status) => {
    if (status === "active") {
      return "text-success";
    }

    if (status === "expired") {
      return "text-danger";
    }

    return "text-warning";
  };

  return (
    <div className="p-5">
      {/* PAGE HEADER */}
      <div className="intro-y flex items-center h-10 mb-5">
        <div>
          <h2 className="text-lg font-medium truncate">
            Platform Reports
          </h2>

          <div className="text-slate-500 text-sm mt-1">
            Overview of ISP organizations, subscriptions and platform revenue.
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && (
        <div className="intro-y alert alert-danger show mb-5">
          <div className="font-medium">Unable to load reports</div>
          <div className="text-sm mt-1">{error}</div>
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* TOTAL ISPs */}
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="flex items-center">
              <div className="text-slate-500 text-sm">
                Total ISPs
              </div>
            </div>

            <div className="text-2xl font-medium mt-2">
              {loading ? "..." : organizations.length}
            </div>

            <div className="text-slate-500 text-xs mt-1">
              Registered organizations
            </div>
          </div>
        </div>

        {/* ACTIVE ISPs */}
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Active ISPs
            </div>

            <div className="text-2xl font-medium mt-2 text-success">
              {loading ? "..." : activeOrganizations.length}
            </div>

            <div className="text-slate-500 text-xs mt-1">
              Currently active organizations
            </div>
          </div>
        </div>

        {/* ACTIVE SUBSCRIPTIONS */}
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Active Subscriptions
            </div>

            <div className="text-2xl font-medium mt-2">
              {loading ? "..." : activeSubscriptions.length}
            </div>

            <div className="text-slate-500 text-xs mt-1">
              Current ISP subscriptions
            </div>
          </div>
        </div>

        {/* REVENUE */}
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Monthly Subscription Revenue
            </div>

            <div className="text-2xl font-medium mt-2">
              {loading ? "..." : formatCurrency(totalMonthlyRevenue)}
            </div>

            <div className="text-slate-500 text-xs mt-1">
              Based on active subscriptions
            </div>
          </div>
        </div>
      </div>

      {/* REPORT CONTENT */}
      <div className="grid grid-cols-12 gap-5">
        {/* PLAN SUMMARY */}
        <div className="intro-y col-span-12 xl:col-span-5">
          <div className="box p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-medium">
                  Subscription Plans
                </h3>

                <div className="text-slate-500 text-sm mt-1">
                  Active subscriptions by plan.
                </div>
              </div>
            </div>

            {loading ? (
              <div className="text-center text-slate-500 py-8">
                Loading plans...
              </div>
            ) : plans.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                No plans found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-report">
                  <thead>
                    <tr>
                      <th>PLAN</th>
                      <th>PRICE</th>
                      <th>ACTIVE ISPs</th>
                    </tr>
                  </thead>

                  <tbody>
                    {plans.map((plan) => (
                      <tr key={plan.id}>
                        <td>
                          <div className="font-medium">
                            {plan.name}
                          </div>
                        </td>

                        <td>
                          {formatCurrency(plan.price)}
                        </td>

                        <td>
                          <span className="font-medium">
                            {getPlanCount(plan.id)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ISP STATUS */}
        <div className="intro-y col-span-12 xl:col-span-7">
          <div className="box p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-medium">
                  ISP Organizations
                </h3>

                <div className="text-slate-500 text-sm mt-1">
                  Current organization status.
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={loadReports}
                disabled={loading}
              >
                {loading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            {loading ? (
              <div className="text-center text-slate-500 py-8">
                Loading organizations...
              </div>
            ) : organizations.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                No organizations found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-report">
                  <thead>
                    <tr>
                      <th>ISP</th>
                      <th>SLUG</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {organizations.map((organization) => (
                      <tr key={organization.id}>
                        <td>
                          <div className="font-medium">
                            {organization.name}
                          </div>
                        </td>

                        <td>
                          <span className="text-slate-500">
                            {organization.slug || "-"}
                          </span>
                        </td>

                        <td>
                          <span
                            className={getStatusClass(
                              organization.status
                            )}
                          >
                            {organization.status
                              ? organization.status
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (letter) =>
                                    letter.toUpperCase()
                                  )
                              : "-"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* SUBSCRIPTION REPORT */}
        <div className="intro-y col-span-12">
          <div className="box p-5">
            <div className="mb-5">
              <h3 className="text-base font-medium">
                Subscription Report
              </h3>

              <div className="text-slate-500 text-sm mt-1">
                Detailed subscription information for ISP organizations.
              </div>
            </div>

            {loading ? (
              <div className="text-center text-slate-500 py-8">
                Loading subscriptions...
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center text-slate-500 py-8">
                No subscriptions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-report">
                  <thead>
                    <tr>
                      <th>ISP</th>
                      <th>PLAN</th>
                      <th>PRICE</th>
                      <th>STATUS</th>
                      <th>STARTED</th>
                      <th>EXPIRES</th>
                    </tr>
                  </thead>

                  <tbody>
                    {subscriptions.map((subscription) => (
                      <tr key={subscription.id}>
                        <td>
                          <div className="font-medium">
                            {subscription.organizations?.name ||
                              "Unknown ISP"}
                          </div>

                          <div className="text-slate-500 text-xs">
                            {subscription.organizations?.slug || "-"}
                          </div>
                        </td>

                        <td>
                          {subscription.saas_plans?.name || "-"}
                        </td>

                        <td>
                          {formatCurrency(
                            subscription.saas_plans?.price
                          )}
                        </td>

                        <td>
                          <span
                            className={getStatusClass(
                              subscription.status
                            )}
                          >
                            {subscription.status
                              ? subscription.status
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (letter) =>
                                    letter.toUpperCase()
                                  )
                              : "-"}
                          </span>
                        </td>

                        <td>
                          {formatDate(subscription.started_at)}
                        </td>

                        <td>
                          {formatDate(subscription.expires_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;