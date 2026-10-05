import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Main() {
  const [organizations, setOrganizations] = useState([]);
  const [totalISPs, setTotalISPs] = useState(0);
  const [activeISPs, setActiveISPs] = useState(0);
  const [activeSubscriptions, setActiveSubscriptions] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrganization, setSelectedOrganization] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const [saving, setSaving] = useState(false);

  // Load organizations and dashboard statistics
  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      // Get all organizations
      const {
        data: organizationData,
        error: organizationError,
      } = await supabase
        .from("organizations")
        .select("id, name, slug, status, created_at")
        .order("created_at", { ascending: false });

      if (organizationError) {
        throw organizationError;
      }

      setOrganizations(organizationData || []);
      setTotalISPs(organizationData?.length || 0);

      // Count active ISPs
      const activeCount =
        organizationData?.filter(
          (organization) => organization.status === "active"
        ).length || 0;

      setActiveISPs(activeCount);

      // Count active subscriptions
      const {
        count: subscriptionCount,
        error: subscriptionError,
      } = await supabase
        .from("organization_subscriptions")
        .select("id", { count: "exact", head: true })
        .eq("status", "active");

      if (subscriptionError) {
        throw subscriptionError;
      }

      setActiveSubscriptions(subscriptionCount || 0);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(err.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // Add new ISP
  const handleAddISP = async (event) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.slug.trim()) {
      return;
    }

    try {
      setSaving(true);
      setError("");

      const { error: insertError } = await supabase
        .from("organizations")
        .insert([
          {
            name: formData.name.trim(),
            slug: formData.slug.trim().toLowerCase(),
            status: "active",
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      setFormData({
        name: "",
        slug: "",
      });

      setShowAddModal(false);

      await loadDashboard();
    } catch (err) {
      console.error("Add ISP error:", err);
      setError(err.message || "Failed to add ISP.");
    } finally {
      setSaving(false);
    }
  };

  // Open organization details
  const handleView = (organization) => {
    setSelectedOrganization(organization);
    setShowViewModal(true);
  };

  return (
    <div className="p-5">
      {/* Page Header */}
      <div className="intro-y flex items-center h-10 mb-5">
        <h2 className="text-lg font-medium truncate">
          Platform Owner Dashboard
        </h2>
      </div>

      {/* Error */}
      {error && (
        <div className="intro-y alert alert-danger show mb-5">
          {error}
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-12 gap-6">
        {/* Total ISPs */}
        <div className="intro-y col-span-12 sm:col-span-4">
          <div className="box p-5">
            <div className="text-slate-500">
              Total ISPs
            </div>

            <div className="text-2xl font-medium mt-2">
              {loading ? "..." : totalISPs}
            </div>
          </div>
        </div>

        {/* Active ISPs */}
        <div className="intro-y col-span-12 sm:col-span-4">
          <div className="box p-5">
            <div className="text-slate-500">
              Active ISPs
            </div>

            <div className="text-2xl font-medium mt-2">
              {loading ? "..." : activeISPs}
            </div>
          </div>
        </div>

        {/* Active Subscriptions */}
        <div className="intro-y col-span-12 sm:col-span-4">
          <div className="box p-5">
            <div className="text-slate-500">
              Active Subscriptions
            </div>

            <div className="text-2xl font-medium mt-2">
              {loading ? "..." : activeSubscriptions}
            </div>
          </div>
        </div>

        {/* ISP List */}
        <div className="intro-y col-span-12">
          <div className="box p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-medium">
                ISP Organizations
              </h3>

              <button
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                Add ISP
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-report">
                <thead>
                  <tr>
                    <th>ISP NAME</th>
                    <th>SLUG</th>
                    <th>STATUS</th>
                    <th>ACTION</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        Loading organizations...
                      </td>
                    </tr>
                  ) : organizations.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No ISP organizations found.
                      </td>
                    </tr>
                  ) : (
                    organizations.map((organization) => (
                      <tr key={organization.id}>
                        <td>{organization.name}</td>

                        <td>{organization.slug}</td>

                        <td>
                          <span
                            className={
                              organization.status === "active"
                                ? "text-success"
                                : "text-danger"
                            }
                          >
                            {organization.status}
                          </span>
                        </td>

                        <td>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleView(organization)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add ISP Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="box w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-medium">
                Add ISP Organization
              </h3>

              <button
                className="text-slate-500 text-xl"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddISP}>
              <div className="mb-4">
                <label className="form-label">
                  ISP Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="ABC Internet Services"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      name: event.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-5">
                <label className="form-label">
                  Slug
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="abc-internet"
                  value={formData.slug}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      slug: event.target.value,
                    })
                  }
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Create ISP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View ISP Modal */}
      {showViewModal && selectedOrganization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="box w-full max-w-md p-5">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-medium">
                ISP Details
              </h3>

              <button
                className="text-slate-500 text-xl"
                onClick={() => setShowViewModal(false)}
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-slate-500 text-sm">
                  ISP Name
                </div>
                <div className="font-medium">
                  {selectedOrganization.name}
                </div>
              </div>

              <div>
                <div className="text-slate-500 text-sm">
                  Slug
                </div>
                <div className="font-medium">
                  {selectedOrganization.slug}
                </div>
              </div>

              <div>
                <div className="text-slate-500 text-sm">
                  Status
                </div>
                <div className="font-medium">
                  {selectedOrganization.status}
                </div>
              </div>

              <div>
                <div className="text-slate-500 text-sm">
                  Organization ID
                </div>
                <div className="font-medium break-all">
                  {selectedOrganization.id}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-5">
              <button
                className="btn btn-primary"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;