import { useEffect, useMemo, useState } from "react";
import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { supabase } from "@/lib/supabase";

const STATUS_OPTIONS = [
  "All Statuses",
  "Active",
  "Pending Installation",
  "Suspended",
  "Terminated",
];

const STATUS_BADGE_CLASSES = {
  Active: "bg-success/20 text-success",
  "Pending Installation": "bg-pending/20 text-pending",
  Suspended: "bg-warning/20 text-warning",
  Terminated: "bg-danger/20 text-danger",
};

function StatusBadge({ status }) {
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        STATUS_BADGE_CLASSES[status] || "bg-slate-100 text-slate-500"
      )}
    >
      {status}
    </div>
  );
}

function Main() {
  // ---------------------------------------------------------
  // Data
  // ---------------------------------------------------------
  const [subscribers, setSubscribers] = useState([]);
  const [packages, setPackages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ---------------------------------------------------------
  // Filters
  // ---------------------------------------------------------
  const [searchDraft, setSearchDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [packageDraft, setPackageDraft] = useState("All Packages");
  const [areaDraft, setAreaDraft] = useState("All Areas");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Statuses",
    package: "All Packages",
    area: "All Areas",
  });

  // ---------------------------------------------------------
  // Modal
  // ---------------------------------------------------------
  const [showModal, setShowModal] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);

  const [form, setForm] = useState({
    full_name: "",
    cnic: "",
    phone: "",
    email: "",
    address: "",
    package_id: "",
    installation_location: "",
    installation_date: "",
    connection_status: "pending",
    monthly_fee: "",
  });

  // ---------------------------------------------------------
  // Load data
  // ---------------------------------------------------------
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      // 1. Get currently logged-in user
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

      // 2. Get the user's organization
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("organization_id")
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

      // 3. Load subscribers for THIS organization
      const {
        data: subscriberData,
        error: subscriberError,
      } = await supabase
        .from("subscribers")
        .select(`
        id,
        organization_id,
        full_name,
        cnic,
        phone,
        email,
        address,
        package_id,
        installation_location,
        installation_date,
        connection_status,
        monthly_fee,
        created_at,
        updated_at
      `)
        .eq("organization_id", organizationId)
        .order("created_at", { ascending: false });

      if (subscriberError) {
        throw subscriberError;
      }

      // 4. Load packages for THIS organization
      const {
        data: packageData,
        error: packageError,
      } = await supabase
        .from("packages")
        .select(`
        id,
        name,
        monthly_price,
        status,
        organization_id
      `)
        .eq("organization_id", organizationId)
        .order("name", { ascending: true });

      if (packageError) {
        throw packageError;
      }

      // 5. Save everything into React state
      setSubscribers(subscriberData || []);
      setPackages(packageData || []);

      console.log("ISP Organization:", organizationId);
      console.log("Subscribers:", subscriberData);
      console.log("Packages:", packageData);
    } catch (err) {
      console.error("Error loading subscriber data:", err);

      setError(
        err?.message ||
        "Unable to load subscribers and packages."
      );

      setSubscribers([]);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------
  const formatStatus = (status) => {
    switch (status) {
      case "active":
        return "Active";

      case "pending":
        return "Pending Installation";

      case "suspended":
        return "Suspended";

      case "terminated":
        return "Terminated";

      default:
        return "Unknown";
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

  const formatMoney = (amount) => {
    const value = Number(amount || 0);

    return `PKR ${value.toLocaleString()}`;
  };

  const getPackageName = (packageId) => {
    const found = packages.find((pkg) => pkg.id === packageId);

    return found?.name || "No Package";
  };

  // ---------------------------------------------------------
  // Areas
  // ---------------------------------------------------------
  const areaOptions = useMemo(() => {
    const areas = subscribers
      .map((subscriber) => subscriber.address?.trim())
      .filter(Boolean);

    return ["All Areas", ...Array.from(new Set(areas))];
  }, [subscribers]);

  // ---------------------------------------------------------
  // Filters
  // ---------------------------------------------------------
  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      status: statusDraft,
      package: packageDraft,
      area: areaDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setStatusDraft("All Statuses");
    setPackageDraft("All Packages");
    setAreaDraft("All Areas");

    setAppliedFilters({
      search: "",
      status: "All Statuses",
      package: "All Packages",
      area: "All Areas",
    });
  };

  const filteredSubscribers = useMemo(() => {
    return subscribers.filter((subscriber) => {
      const packageName = getPackageName(
        subscriber.package_id
      );

      const displayStatus = formatStatus(
        subscriber.connection_status
      );

      const matchesSearch =
        appliedFilters.search === "" ||
        subscriber.id
          .toLowerCase()
          .includes(appliedFilters.search) ||
        (subscriber.full_name || "")
          .toLowerCase()
          .includes(appliedFilters.search) ||
        (subscriber.cnic || "")
          .toLowerCase()
          .includes(appliedFilters.search) ||
        (subscriber.phone || "")
          .toLowerCase()
          .includes(appliedFilters.search);

      const matchesStatus =
        appliedFilters.status === "All Statuses" ||
        displayStatus === appliedFilters.status;

      const matchesPackage =
        appliedFilters.package === "All Packages" ||
        packageName === appliedFilters.package;

      const matchesArea =
        appliedFilters.area === "All Areas" ||
        (subscriber.address || "") === appliedFilters.area;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPackage &&
        matchesArea
      );
    });
  }, [subscribers, packages, appliedFilters]);

  // ---------------------------------------------------------
  // Summary
  // ---------------------------------------------------------
  const summary = useMemo(() => {
    return {
      active: subscribers.filter(
        (s) => s.connection_status === "active"
      ).length,

      pending: subscribers.filter(
        (s) => s.connection_status === "pending"
      ).length,

      suspended: subscribers.filter(
        (s) => s.connection_status === "suspended"
      ).length,

      outstanding: 0,
    };
  }, [subscribers]);

  // ---------------------------------------------------------
  // Form
  // ---------------------------------------------------------
  const resetForm = () => {
    setForm({
      full_name: "",
      cnic: "",
      phone: "",
      email: "",
      address: "",
      package_id: "",
      installation_location: "",
      installation_date: "",
      connection_status: "pending",
      monthly_fee: "",
    });
  };

  const openAddModal = () => {
    setEditingSubscriber(null);
    resetForm();
    setError("");
    setShowModal(true);
  };

  const openEditModal = (subscriber) => {
    setEditingSubscriber(subscriber);

    setForm({
      full_name: subscriber.full_name || "",
      cnic: subscriber.cnic || "",
      phone: subscriber.phone || "",
      email: subscriber.email || "",
      address: subscriber.address || "",
      package_id: subscriber.package_id || "",
      installation_location:
        subscriber.installation_location || "",
      installation_date:
        subscriber.installation_date || "",
      connection_status:
        subscriber.connection_status || "pending",
      monthly_fee:
        subscriber.monthly_fee !== null &&
          subscriber.monthly_fee !== undefined
          ? String(subscriber.monthly_fee)
          : "",
    });

    setError("");
    setShowModal(true);
  };

  const handleFormChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ---------------------------------------------------------
  // Package selection
  // ---------------------------------------------------------
  const handlePackageChange = (packageId) => {
    const selectedPackage = packages.find(
      (pkg) => pkg.id === packageId
    );

    setForm((previous) => ({
      ...previous,
      package_id: packageId,
      monthly_fee:
        selectedPackage?.monthly_price !== null &&
          selectedPackage?.monthly_price !== undefined
          ? String(selectedPackage.monthly_price)
          : previous.monthly_fee,
    }));
  };

  // ---------------------------------------------------------
  // Save subscriber
  // ---------------------------------------------------------
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!form.full_name.trim()) {
        throw new Error("Customer name is required.");
      }

      if (!form.phone.trim()) {
        throw new Error("Phone number is required.");
      }

      if (!form.package_id) {
        throw new Error("Please select a package.");
      }

      // Get current user's organization
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("You are not logged in.");
      }

      const { data: profile, error: profileError } =
        await supabase
          .from("profiles")
          .select("organization_id")
          .eq("id", user.id)
          .single();

      if (profileError) throw profileError;

      if (!profile?.organization_id) {
        throw new Error(
          "Your account is not linked to an ISP organization."
        );
      }

      const payload = {
        full_name: form.full_name.trim(),
        cnic: form.cnic.trim() || null,
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        address: form.address.trim() || null,
        package_id: form.package_id || null,
        installation_location:
          form.installation_location.trim() || null,
        installation_date:
          form.installation_date || null,
        connection_status: form.connection_status,
        monthly_fee:
          form.monthly_fee === ""
            ? 0
            : Number(form.monthly_fee),
        updated_at: new Date().toISOString(),
      };

      if (editingSubscriber) {
        // ---------------------------------------------------
        // Update
        // ---------------------------------------------------
        const { error: updateError } = await supabase
          .from("subscribers")
          .update(payload)
          .eq("id", editingSubscriber.id)
          .eq(
            "organization_id",
            profile.organization_id
          );

        if (updateError) throw updateError;
      } else {
        // ---------------------------------------------------
        // Create
        // ---------------------------------------------------
        const { error: insertError } = await supabase
          .from("subscribers")
          .insert({
            ...payload,
            organization_id: profile.organization_id,
          });

        if (insertError) throw insertError;
      }

      setShowModal(false);
      setEditingSubscriber(null);
      resetForm();

      await loadData();
    } catch (err) {
      console.error("Save subscriber error:", err);

      setError(
        err?.message ||
        "Unable to save subscriber."
      );
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------------------------
  // Delete subscriber
  // ---------------------------------------------------------
  const handleDelete = async (subscriber) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${subscriber.full_name}?`
    );

    if (!confirmed) return;

    try {
      setError("");

      const { error: deleteError } = await supabase
        .from("subscribers")
        .delete()
        .eq("id", subscriber.id);

      if (deleteError) throw deleteError;

      await loadData();
    } catch (err) {
      console.error("Delete subscriber error:", err);

      setError(
        err?.message ||
        "Unable to delete subscriber."
      );
    }
  };

  // ---------------------------------------------------------
  // Change status
  // ---------------------------------------------------------
  const handleStatusChange = async (
    subscriber,
    newStatus
  ) => {
    try {
      setError("");

      const { error: updateError } = await supabase
        .from("subscribers")
        .update({
          connection_status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", subscriber.id);

      if (updateError) throw updateError;

      await loadData();
    } catch (err) {
      console.error("Status update error:", err);

      setError(
        err?.message ||
        "Unable to update subscriber status."
      );
    }
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">

        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-medium">
              Subscribers
            </h2>

            <div className="text-slate-500 mt-1">
              Manage all internet subscribers from one place.
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:ml-auto mt-4 sm:mt-0">
            <button
              type="button"
              className="btn btn-primary shadow-md"
              onClick={openAddModal}
            >
              <Lucide
                icon="Plus"
                className="w-4 h-4 mr-2"
              />
              Add Subscriber
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled
              title="Import will be added later"
            >
              <Lucide
                icon="Upload"
                className="w-4 h-4 mr-2"
              />
              Import
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              disabled
              title="Export will be added later"
            >
              <Lucide
                icon="Download"
                className="w-4 h-4 mr-2"
              />
              Export
            </button>
          </div>
        </div>
        {/* END: Page Header */}


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
                onClick={() => setError("")}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {/* END: Error */}


        {/* BEGIN: Search */}
        <div className="col-span-12 intro-y">
          <div className="box p-5">
            <div className="relative text-slate-500">
              <Lucide
                icon="Search"
                className="w-5 h-5 z-10 absolute my-auto inset-y-0 ml-4 left-0"
              />

              <input
                type="text"
                value={searchDraft}
                onChange={(e) =>
                  setSearchDraft(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                className="form-control w-full box pl-12 py-3 text-base"
                placeholder="Search by Subscriber ID, Customer Name, CNIC or Phone Number"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">

              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">
                  Connection Status
                </label>

                <select
                  className="form-select box mt-1 w-full"
                  value={statusDraft}
                  onChange={(e) =>
                    setStatusDraft(e.target.value)
                  }
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>


              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">
                  Package
                </label>

                <select
                  className="form-select box mt-1 w-full"
                  value={packageDraft}
                  onChange={(e) =>
                    setPackageDraft(e.target.value)
                  }
                >
                  <option value="All Packages">
                    All Packages
                  </option>

                  {packages.map((pkg) => (
                    <option
                      key={pkg.id}
                      value={pkg.name}
                    >
                      {pkg.name}
                    </option>
                  ))}
                </select>
              </div>


              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">
                  Area / Address
                </label>

                <select
                  className="form-select box mt-1 w-full"
                  value={areaDraft}
                  onChange={(e) =>
                    setAreaDraft(e.target.value)
                  }
                >
                  {areaOptions.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
                      {option}
                    </option>
                  ))}
                </select>
              </div>


              <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex items-end gap-2">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="btn btn-primary w-full"
                >
                  Search
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline-secondary w-full"
                >
                  Reset
                </button>
              </div>

            </div>
            {/* END: Filters */}
          </div>
        </div>
        {/* END: Search */}


        {/* BEGIN: Summary Cards */}

        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="Users"
              className="w-8 h-8 mr-4 flex-none text-primary"
            />

            <div>
              <div className="text-xl font-medium">
                {loading ? "..." : summary.active}
              </div>

              <div className="text-slate-500 text-xs mt-0.5">
                Active Subscribers
              </div>
            </div>
          </div>
        </div>


        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="Clock"
              className="w-8 h-8 mr-4 flex-none text-pending"
            />

            <div>
              <div className="text-xl font-medium">
                {loading ? "..." : summary.pending}
              </div>

              <div className="text-slate-500 text-xs mt-0.5">
                Pending Installations
              </div>
            </div>
          </div>
        </div>


        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="UserX"
              className="w-8 h-8 mr-4 flex-none text-warning"
            />

            <div>
              <div className="text-xl font-medium">
                {loading ? "..." : summary.suspended}
              </div>

              <div className="text-slate-500 text-xs mt-0.5">
                Suspended Subscribers
              </div>
            </div>
          </div>
        </div>


        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="CreditCard"
              className="w-8 h-8 mr-4 flex-none text-danger"
            />

            <div>
              <div className="text-xl font-medium">
                {formatMoney(summary.outstanding)}
              </div>

              <div className="text-slate-500 text-xs mt-0.5">
                Outstanding Payments
              </div>
            </div>
          </div>
        </div>

        {/* END: Summary Cards */}


        {/* BEGIN: Subscribers Table */}
        <div className="col-span-12 mt-2">

          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              All Subscribers
            </h2>

            <div className="ml-auto text-slate-500 text-sm">
              {loading
                ? "Loading..."
                : `${filteredSubscribers.length} result${filteredSubscribers.length === 1
                  ? ""
                  : "s"
                }`}
            </div>
          </div>


          {loading ? (
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide
                icon="Loader"
                className="w-10 h-10 text-slate-300 mb-3 animate-spin"
              />

              <div className="text-slate-500">
                Loading subscribers...
              </div>
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">

              <Lucide
                icon="Users"
                className="w-12 h-12 text-slate-300 mb-3"
              />

              <div className="text-slate-500 mb-5">
                No subscribers found.
              </div>

              <button
                type="button"
                className="btn btn-primary shadow-md"
                onClick={openAddModal}
              >
                <Lucide
                  icon="Plus"
                  className="w-4 h-4 mr-2"
                />
                Add Subscriber
              </button>

            </div>
          ) : (
            <div className="intro-y w-full overflow-x-auto mt-5">

              <table className="table table-report w-full min-w-[1080px]">

                <thead>
                  <tr>
                    <th className="whitespace-nowrap">
                      SUBSCRIBER ID
                    </th>

                    <th className="whitespace-nowrap">
                      CUSTOMER NAME
                    </th>

                    <th className="whitespace-nowrap">
                      PHONE
                    </th>

                    <th className="whitespace-nowrap">
                      AREA / ADDRESS
                    </th>

                    <th className="whitespace-nowrap">
                      PACKAGE
                    </th>

                    <th className="text-center whitespace-nowrap">
                      CONNECTION STATUS
                    </th>

                    <th className="text-right whitespace-nowrap">
                      MONTHLY FEE
                    </th>

                    <th className="text-center whitespace-nowrap min-w-[180px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>


                <tbody>
                  {filteredSubscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="intro-x"
                    >

                      <td className="whitespace-nowrap font-medium">
                        {sub.id.substring(0, 8)}
                      </td>


                      <td className="whitespace-nowrap">
                        {sub.full_name}
                      </td>


                      <td className="whitespace-nowrap">
                        {sub.phone}
                      </td>


                      <td className="whitespace-nowrap max-w-[220px] truncate">
                        {sub.address || "-"}
                      </td>


                      <td className="whitespace-nowrap">
                        {getPackageName(sub.package_id)}
                      </td>


                      <td className="w-48">
                        <div className="flex justify-center">
                          <StatusBadge
                            status={formatStatus(
                              sub.connection_status
                            )}
                          />
                        </div>
                      </td>


                      <td className="text-right whitespace-nowrap">
                        {formatMoney(sub.monthly_fee)}
                      </td>


                      <td className="table-report__action w-auto min-w-[180px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">

                          <Tippy
                            tag="button"
                            type="button"
                            content="View"
                            onClick={() =>
                              openEditModal(sub)
                            }
                          >
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>


                          <Tippy
                            tag="button"
                            type="button"
                            content="Edit"
                            onClick={() =>
                              openEditModal(sub)
                            }
                          >
                            <Lucide
                              icon="Pencil"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>


                          {sub.connection_status ===
                            "active" ? (
                            <Tippy
                              tag="button"
                              type="button"
                              content="Suspend"
                              onClick={() =>
                                handleStatusChange(
                                  sub,
                                  "suspended"
                                )
                              }
                            >
                              <Lucide
                                icon="UserX"
                                className="w-4 h-4 text-slate-500 hover:text-danger"
                              />
                            </Tippy>
                          ) : (
                            <Tippy
                              tag="button"
                              type="button"
                              content="Activate"
                              onClick={() =>
                                handleStatusChange(
                                  sub,
                                  "active"
                                )
                              }
                            >
                              <Lucide
                                icon="UserCheck"
                                className="w-4 h-4 text-slate-500 hover:text-success"
                              />
                            </Tippy>
                          )}


                          <Tippy
                            tag="button"
                            type="button"
                            content="Delete"
                            onClick={() =>
                              handleDelete(sub)
                            }
                          >
                            <Lucide
                              icon="Trash2"
                              className="w-4 h-4 text-slate-500 hover:text-danger"
                            />
                          </Tippy>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
        {/* END: Subscribers Table */}

      </div>


      {/* =====================================================
          ADD / EDIT SUBSCRIBER MODAL
      ====================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">

          <div className="bg-white dark:bg-darkmode-600 rounded-md shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-darkmode-400">

              <div>
                <h3 className="text-lg font-medium">
                  {editingSubscriber
                    ? "Edit Subscriber"
                    : "Add Subscriber"}
                </h3>

                <div className="text-slate-500 text-xs mt-1">
                  Enter the subscriber's account information.
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-500 hover:text-danger"
              >
                <Lucide
                  icon="X"
                  className="w-5 h-5"
                />
              </button>

            </div>


            {/* Modal Body */}
            <form onSubmit={handleSave}>

              <div className="p-5">

                <div className="grid grid-cols-12 gap-4">

                  {/* Full Name */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      Customer Name *
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter customer name"
                      value={form.full_name}
                      onChange={(e) =>
                        handleFormChange(
                          "full_name",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* Phone */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      Phone Number *
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="0300-1234567"
                      value={form.phone}
                      onChange={(e) =>
                        handleFormChange(
                          "phone",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* CNIC */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      CNIC
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="42101-1234567-1"
                      value={form.cnic}
                      onChange={(e) =>
                        handleFormChange(
                          "cnic",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* Email */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="customer@example.com"
                      value={form.email}
                      onChange={(e) =>
                        handleFormChange(
                          "email",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* Package */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      Package *
                    </label>

                    <select
                      className="form-select"
                      value={form.package_id}
                      onChange={(e) => handlePackageChange(e.target.value)}
                    >
                      <option value="">Select Package</option>

                      {packages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {formatMoney(pkg.monthly_price)}
                        </option>
                      ))}
                    </select>
                  </div>


                  {/* Monthly Fee */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      Monthly Fee
                    </label>

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="form-control"
                      placeholder="0"
                      value={form.monthly_fee}
                      onChange={(e) =>
                        handleFormChange(
                          "monthly_fee",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* Address */}
                  <div className="col-span-12">
                    <label className="form-label">
                      Address
                    </label>

                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Customer installation / billing address"
                      value={form.address}
                      onChange={(e) =>
                        handleFormChange(
                          "address",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* Installation Location */}
                  <div className="col-span-12">
                    <label className="form-label">
                      Installation Location
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="GPS coordinates or installation location"
                      value={
                        form.installation_location
                      }
                      onChange={(e) =>
                        handleFormChange(
                          "installation_location",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* Installation Date */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      Installation Date
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      value={form.installation_date}
                      onChange={(e) =>
                        handleFormChange(
                          "installation_date",
                          e.target.value
                        )
                      }
                    />
                  </div>


                  {/* Status */}
                  <div className="col-span-12 sm:col-span-6">
                    <label className="form-label">
                      Connection Status
                    </label>

                    <select
                      className="form-select"
                      value={
                        form.connection_status
                      }
                      onChange={(e) =>
                        handleFormChange(
                          "connection_status",
                          e.target.value
                        )
                      }
                    >
                      <option value="pending">
                        Pending Installation
                      </option>

                      <option value="active">
                        Active
                      </option>

                      <option value="suspended">
                        Suspended
                      </option>

                      <option value="terminated">
                        Terminated
                      </option>
                    </select>
                  </div>

                </div>

              </div>


              {/* Modal Footer */}
              <div className="px-5 py-4 border-t border-slate-200 dark:border-darkmode-400 flex justify-end gap-2">

                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() =>
                    setShowModal(false)
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Lucide
                        icon="Loader"
                        className="w-4 h-4 mr-2 animate-spin"
                      />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Lucide
                        icon="Check"
                        className="w-4 h-4 mr-2"
                      />
                      {editingSubscriber
                        ? "Update Subscriber"
                        : "Save Subscriber"}
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>
        </div>
      )}
    </>
  );
}

export default Main;