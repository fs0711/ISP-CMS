import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Main() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingOrganization, setEditingOrganization] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    status: "active",
  });

  // --------------------------------------------------
  // LOAD ORGANIZATIONS
  // --------------------------------------------------

  const loadOrganizations = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("organizations")
        .select("id, name, slug, status, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setOrganizations(data || []);
    } catch (err) {
      console.error("Load organizations error:", err);
      setError(err.message || "Failed to load organizations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrganizations();
  }, []);

  // --------------------------------------------------
  // OPEN ADD MODAL
  // --------------------------------------------------

  const openAddModal = () => {
    setEditingOrganization(null);

    setFormData({
      name: "",
      slug: "",
      status: "active",
    });

    setError("");
    setShowModal(true);
  };

  // --------------------------------------------------
  // OPEN EDIT MODAL
  // --------------------------------------------------

  const openEditModal = (organization) => {
    setEditingOrganization(organization);

    setFormData({
      name: organization.name || "",
      slug: organization.slug || "",
      status: organization.status || "active",
    });

    setError("");
    setShowModal(true);
  };

  // --------------------------------------------------
  // SAVE ORGANIZATION
  // --------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("ISP name is required.");
      return;
    }

    if (!formData.slug.trim()) {
      setError("Slug is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const organizationData = {
        name: formData.name.trim(),
        slug: formData.slug.trim().toLowerCase(),
        status: formData.status,
      };

      // EDIT
      if (editingOrganization) {
        const { error } = await supabase
          .from("organizations")
          .update(organizationData)
          .eq("id", editingOrganization.id);

        if (error) {
          throw error;
        }
      }

      // ADD
      else {
        const { error } = await supabase
          .from("organizations")
          .insert([organizationData]);

        if (error) {
          throw error;
        }
      }

      setShowModal(false);

      await loadOrganizations();
    } catch (err) {
      console.error("Save organization error:", err);
      setError(err.message || "Failed to save organization.");
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------------------------
  // TOGGLE STATUS
  // --------------------------------------------------

  const toggleStatus = async (organization) => {
    const newStatus =
      organization.status === "active" ? "inactive" : "active";

    try {
      setError("");

      const { error } = await supabase
        .from("organizations")
        .update({
          status: newStatus,
        })
        .eq("id", organization.id);

      if (error) {
        throw error;
      }

      await loadOrganizations();
    } catch (err) {
      console.error("Status update error:", err);
      setError(err.message || "Failed to update organization status.");
    }
  };

  // --------------------------------------------------
  // SEARCH
  // --------------------------------------------------

  const filteredOrganizations = organizations.filter((organization) => {
    const searchText = search.toLowerCase();

    return (
      organization.name?.toLowerCase().includes(searchText) ||
      organization.slug?.toLowerCase().includes(searchText) ||
      organization.status?.toLowerCase().includes(searchText)
    );
  });

  // --------------------------------------------------
  // DATE FORMAT
  // --------------------------------------------------

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="p-5">
      {/* HEADER */}
      <div className="intro-y flex items-center h-10 mb-5">
        <h2 className="text-lg font-medium truncate">
          ISPs / Organizations
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
        {/* TOP BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-medium">
              ISP Organizations
            </h3>

            <div className="text-slate-500 text-sm mt-1">
              Manage all ISPs using your SaaS platform.
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={openAddModal}
          >
            + Add ISP
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ISP name, slug or status..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="table table-report">
            <thead>
              <tr>
                <th>ISP NAME</th>
                <th>SLUG</th>
                <th>STATUS</th>
                <th>JOINED</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading organizations...
                  </td>
                </tr>
              ) : filteredOrganizations.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No organizations found.
                  </td>
                </tr>
              ) : (
                filteredOrganizations.map((organization) => (
                  <tr key={organization.id}>
                    <td>
                      <div className="font-medium">
                        {organization.name}
                      </div>
                    </td>

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
                      {formatDate(organization.created_at)}
                    </td>

                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() =>
                            openEditModal(organization)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className={
                            organization.status === "active"
                              ? "btn btn-sm btn-outline-danger"
                              : "btn btn-sm btn-outline-success"
                          }
                          onClick={() =>
                            toggleStatus(organization)
                          }
                        >
                          {organization.status === "active"
                            ? "Deactivate"
                            : "Activate"}
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

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-5">
          <div className="box w-full max-w-md p-5">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-medium">
                {editingOrganization
                  ? "Edit ISP"
                  : "Add ISP"}
              </h3>

              <button
                type="button"
                className="text-slate-500 text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              {/* NAME */}
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

              {/* SLUG */}
              <div className="mb-4">
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

                <div className="text-slate-500 text-xs mt-1">
                  Use lowercase letters, numbers and hyphens.
                </div>
              </div>

              {/* STATUS */}
              <div className="mb-5">
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
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
                    ? "Saving..."
                    : editingOrganization
                    ? "Update ISP"
                    : "Create ISP"}
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