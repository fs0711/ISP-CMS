import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Main() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    organization_id: "",
    plan_id: "",
    status: "active",
    started_at: "",
    expires_at: "",
  });

  // ==================================================
  // LOAD DATA
  // ==================================================

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        subscriptionsResult,
        organizationsResult,
        plansResult,
      ] = await Promise.all([
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
          .order("created_at", { ascending: false }),

        supabase
          .from("organizations")
          .select("id, name, slug, status")
          .order("name"),

        supabase
          .from("saas_plans")
          .select("id, name, price")
          .order("price"),
      ]);

      if (subscriptionsResult.error) {
        throw subscriptionsResult.error;
      }

      if (organizationsResult.error) {
        throw organizationsResult.error;
      }

      if (plansResult.error) {
        throw plansResult.error;
      }

      setSubscriptions(subscriptionsResult.data || []);
      setOrganizations(organizationsResult.data || []);
      setPlans(plansResult.data || []);
    } catch (err) {
      console.error("Load subscriptions error:", err);
      setError(
        err.message || "Failed to load subscriptions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ==================================================
  // OPEN ADD MODAL
  // ==================================================

  const openAddModal = () => {
    setFormData({
      organization_id: "",
      plan_id: "",
      status: "active",
      started_at: new Date().toISOString().split("T")[0],
      expires_at: "",
    });

    setError("");
    setShowModal(true);
  };

  // ==================================================
  // CREATE SUBSCRIPTION
  // ==================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.organization_id) {
      setError("Please select an ISP.");
      return;
    }

    if (!formData.plan_id) {
      setError("Please select a SaaS plan.");
      return;
    }

    if (!formData.started_at) {
      setError("Start date is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const subscriptionData = {
        organization_id: formData.organization_id,
        plan_id: formData.plan_id,
        status: formData.status,
        started_at: formData.started_at,
        expires_at: formData.expires_at
          ? formData.expires_at
          : null,
      };

      const { error } = await supabase
        .from("organization_subscriptions")
        .insert([subscriptionData]);

      if (error) {
        throw error;
      }

      setShowModal(false);

      await loadData();
    } catch (err) {
      console.error("Create subscription error:", err);
      setError(
        err.message || "Failed to create subscription."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // FILTER
  // ==================================================

  const filteredSubscriptions = subscriptions.filter(
    (subscription) => {
      const searchText = search.toLowerCase();

      return (
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
          .includes(searchText)
      );
    }
  );

  // ==================================================
  // DATE FORMAT
  // ==================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="p-5">
      {/* HEADER */}
      <div className="intro-y flex items-center h-10 mb-5">
        <h2 className="text-lg font-medium truncate">
          Subscriptions
        </h2>
      </div>

      {/* ERROR */}
      {error && (
        <div className="intro-y alert alert-danger show mb-5">
          {error}
        </div>
      )}

      {/* MAIN BOX */}
      <div className="intro-y box p-5">
        {/* TOP */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-medium">
              ISP Subscriptions
            </h3>

            <div className="text-slate-500 text-sm mt-1">
              Manage SaaS subscriptions for your ISP customers.
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={openAddModal}
          >
            + Add Subscription
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search ISP, plan or status..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>

        {/* TABLE */}
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
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    Loading subscriptions...
                  </td>
                </tr>
              ) : filteredSubscriptions.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No subscriptions found.
                  </td>
                </tr>
              ) : (
                filteredSubscriptions.map(
                  (subscription) => (
                    <tr key={subscription.id}>
                      <td>
                        <div className="font-medium">
                          {subscription.organizationsa
                            ?.name || "-"}
                        </div>

                        <div className="text-slate-500 text-xs">
                          {subscription.organizations
                            ?.slug || ""}
                        </div>
                      </td>

                      <td>
                        {subscription.saas_plans?.name || "-"}
                      </td>

                      <td>
                        $
                        {subscription.saas_plans
                          ?.price ?? "-"}
                        /month
                      </td>

                      <td>
                        <span
                          className={
                            subscription.status ===
                            "active"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {subscription.status}
                        </span>
                      </td>

                      <td>
                        {formatDate(
                          subscription.started_at
                        )}
                      </td>

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
      </div>

      {/* ADD SUBSCRIPTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
          <div className="box w-full max-w-md p-5">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-medium">
                Add Subscription
              </h3>

              <button
                type="button"
                className="text-slate-500 text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* ISP */}
              <div className="mb-4">
                <label className="form-label">
                  ISP Organization
                </label>

                <select
                  className="form-select"
                  value={formData.organization_id}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      organization_id:
                        event.target.value,
                    })
                  }
                >
                  <option value="">
                    Select ISP
                  </option>

                  {organizations.map(
                    (organization) => (
                      <option
                        key={organization.id}
                        value={organization.id}
                      >
                        {organization.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* PLAN */}
              <div className="mb-4">
                <label className="form-label">
                  SaaS Plan
                </label>

                <select
                  className="form-select"
                  value={formData.plan_id}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      plan_id: event.target.value,
                    })
                  }
                >
                  <option value="">
                    Select Plan
                  </option>

                  {plans.map((plan) => (
                    <option
                      key={plan.id}
                      value={plan.id}
                    >
                      {plan.name} - $
                      {plan.price}/month
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS */}
              <div className="mb-4">
                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      status: event.target.value,
                    })
                  }
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>

              {/* START DATE */}
              <div className="mb-4">
                <label className="form-label">
                  Start Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={formData.started_at}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      started_at:
                        event.target.value,
                    })
                  }
                />
              </div>

              {/* EXPIRY DATE */}
              <div className="mb-5">
                <label className="form-label">
                  Expiry Date
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={formData.expires_at}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      expires_at:
                        event.target.value,
                    })
                  }
                />

                <div className="text-slate-500 text-xs mt-1">
                  Leave empty for no expiry date.
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving
                    ? "Creating..."
                    : "Create Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;