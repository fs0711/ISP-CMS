import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder package data
const INITIAL_PACKAGES = [
  {
    id: 1,
    name: "Home Lite",
    speed: 10,
    price: 1200,
    installationFee: 1000,
    connectionType: "Home",
    status: "Inactive",
    subscribers: 45,
    description: "Entry-level plan for light browsing and email.",
  },
  {
    id: 2,
    name: "Home Basic",
    speed: 20,
    price: 2000,
    installationFee: 1500,
    connectionType: "Home",
    status: "Active",
    subscribers: 320,
    description: "Everyday browsing and streaming for small families.",
  },
  {
    id: 3,
    name: "Home Value",
    speed: 15,
    price: 1800,
    installationFee: 1000,
    connectionType: "Home",
    status: "Inactive",
    subscribers: 18,
    description: "Budget-friendly plan, being phased out.",
  },
  {
    id: 4,
    name: "Home Plus",
    speed: 50,
    price: 3500,
    installationFee: 1500,
    connectionType: "Home",
    status: "Active",
    subscribers: 480,
    description: "Our most popular home plan for streaming and gaming.",
  },
  {
    id: 5,
    name: "Home Ultra",
    speed: 100,
    price: 5500,
    installationFee: 2000,
    connectionType: "Home",
    status: "Active",
    subscribers: 210,
    description: "High-speed plan for large households.",
  },
  {
    id: 6,
    name: "Business Basic",
    speed: 30,
    price: 4500,
    installationFee: 2000,
    connectionType: "Business",
    status: "Inactive",
    subscribers: 12,
    description: "Entry plan for very small offices.",
  },
  {
    id: 7,
    name: "Business Starter",
    speed: 50,
    price: 6000,
    installationFee: 3000,
    connectionType: "Business",
    status: "Active",
    subscribers: 60,
    description: "Reliable connectivity for small offices.",
  },
  {
    id: 8,
    name: "Business Pro",
    speed: 100,
    price: 7500,
    installationFee: 3000,
    connectionType: "Business",
    status: "Active",
    subscribers: 95,
    description: "Dedicated bandwidth for growing businesses.",
  },
  {
    id: 9,
    name: "Business Elite",
    speed: 200,
    price: 12000,
    installationFee: 5000,
    connectionType: "Business",
    status: "Active",
    subscribers: 32,
    description: "Premium plan for high-demand commercial use.",
  },
];
// END: Placeholder package data

const STATUS_OPTIONS = ["All Statuses", "Active", "Inactive"];
const CONNECTION_TYPE_OPTIONS = ["All Types", "Home", "Business"];

const STATUS_BADGE_CLASSES = {
  Active: "bg-success/20 text-success",
  Inactive: "bg-slate-200 text-slate-500 dark:bg-darkmode-300",
};

const EMPTY_FORM = {
  name: "",
  speed: "",
  price: "",
  installationFee: "",
  connectionType: "Home",
  status: "Active",
  description: "",
};

function StatusBadge({ status }) {
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        STATUS_BADGE_CLASSES[status]
      )}
    >
      {status}
    </div>
  );
}

function Main() {
  const [packages, setPackages] = useState(INITIAL_PACKAGES);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [typeDraft, setTypeDraft] = useState("All Types");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Statuses",
    type: "All Types",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      status: statusDraft,
      type: typeDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setStatusDraft("All Statuses");
    setTypeDraft("All Types");
    setAppliedFilters({ search: "", status: "All Statuses", type: "All Types" });
  };

  const toggleStatus = (id) => {
    setPackages((prev) =>
      prev.map((pkg) =>
        pkg.id === id
          ? { ...pkg, status: pkg.status === "Active" ? "Inactive" : "Active" }
          : pkg
      )
    );
  };

  const duplicatePackage = (id) => {
    setPackages((prev) => {
      const source = prev.find((pkg) => pkg.id === id);
      if (!source) return prev;
      const newPackage = {
        ...source,
        id: Math.max(...prev.map((p) => p.id)) + 1,
        name: `${source.name} (Copy)`,
        subscribers: 0,
      };
      const index = prev.findIndex((pkg) => pkg.id === id);
      const updated = [...prev];
      updated.splice(index + 1, 0, newPackage);
      return updated;
    });
  };

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePackage = () => {
    if (!form.name.trim()) return;
    setPackages((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((p) => p.id), 0) + 1,
        name: form.name.trim(),
        speed: Number(form.speed) || 0,
        price: Number(form.price) || 0,
        installationFee: Number(form.installationFee) || 0,
        connectionType: form.connectionType,
        status: form.status,
        subscribers: 0,
        description: form.description.trim(),
      },
    ]);
    setIsModalOpen(false);
  };

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      pkg.name.toLowerCase().includes(appliedFilters.search) ||
      String(pkg.speed).includes(appliedFilters.search) ||
      String(pkg.price).includes(appliedFilters.search);

    const matchesStatus =
      appliedFilters.status === "All Statuses" ||
      pkg.status === appliedFilters.status;

    const matchesType =
      appliedFilters.type === "All Types" ||
      pkg.connectionType === appliedFilters.type;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPackages = packages.length;
  const activePackages = packages.filter((p) => p.status === "Active").length;
  const inactivePackages = totalPackages - activePackages;
  const mostPopular = packages.reduce(
    (top, pkg) => (pkg.subscribers > (top?.subscribers ?? -1) ? pkg : top),
    null
  );

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-medium">Internet Packages</h2>
            <div className="text-slate-500 mt-1">
              Create and manage internet plans offered to subscribers.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-auto mt-4 sm:mt-0">
            <button
              type="button"
              onClick={openAddModal}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Package
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
            </button>
          </div>
        </div>
        {/* END: Page Header */}

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
                onChange={(e) => setSearchDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="form-control w-full box pl-12 py-3 text-base"
                placeholder="Search by Package Name, Speed or Price"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">
                  Connection Type
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={typeDraft}
                  onChange={(e) => setTypeDraft(e.target.value)}
                >
                  {CONNECTION_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 lg:col-span-4 flex items-end gap-2">
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
              icon="Package"
              className="w-8 h-8 mr-4 flex-none text-primary"
            />
            <div>
              <div className="text-xl font-medium">{totalPackages}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Total Packages
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="CheckCircle"
              className="w-8 h-8 mr-4 flex-none text-success"
            />
            <div>
              <div className="text-xl font-medium">{activePackages}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Active Packages
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="XCircle"
              className="w-8 h-8 mr-4 flex-none text-slate-400"
            />
            <div>
              <div className="text-xl font-medium">{inactivePackages}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Inactive Packages
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="Star"
              className="w-8 h-8 mr-4 flex-none text-warning"
            />
            <div>
              <div className="text-xl font-medium truncate">
                {mostPopular ? mostPopular.name : "—"}
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                Most Popular Package
              </div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Packages Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              All Packages
            </h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredPackages.length} result
              {filteredPackages.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredPackages.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="Package" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">
                No internet packages found.
              </div>
              <button
                type="button"
                onClick={openAddModal}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Package
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1080px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">PACKAGE NAME</th>
                    <th className="text-center whitespace-nowrap">SPEED</th>
                    <th className="text-right whitespace-nowrap">
                      MONTHLY PRICE
                    </th>
                    <th className="text-center whitespace-nowrap">
                      CONNECTION TYPE
                    </th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="text-center whitespace-nowrap">
                      SUBSCRIBERS USING PACKAGE
                    </th>
                    <th className="text-center whitespace-nowrap min-w-[160px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">
                        {pkg.name}
                      </td>
                      <td className="text-center whitespace-nowrap">
                        {pkg.speed} Mbps
                      </td>
                      <td className="text-right whitespace-nowrap">
                        PKR {pkg.price.toLocaleString()}
                      </td>
                      <td className="text-center whitespace-nowrap">
                        {pkg.connectionType}
                      </td>
                      <td className="w-40">
                        <div className="flex justify-center">
                          <StatusBadge status={pkg.status} />
                        </div>
                      </td>
                      <td className="text-center whitespace-nowrap">
                        {pkg.subscribers}
                      </td>
                      <td className="table-report__action w-auto min-w-[160px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy tag="a" href="" content="View">
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="Edit">
                            <Lucide
                              icon="Pencil"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content={
                              pkg.status === "Active"
                                ? "Deactivate"
                                : "Activate"
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              toggleStatus(pkg.id);
                            }}
                          >
                            <Lucide
                              icon="Power"
                              className={classnames("w-4 h-4", {
                                "text-success hover:text-slate-400":
                                  pkg.status === "Active",
                                "text-slate-400 hover:text-success":
                                  pkg.status !== "Active",
                              })}
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Duplicate Package"
                            onClick={(e) => {
                              e.preventDefault();
                              duplicatePackage(pkg.id);
                            }}
                          >
                            <Lucide
                              icon="Copy"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
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
        {/* END: Packages Table */}
      </div>

      {/* BEGIN: Add Package Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
          ></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Add Package</h2>
              <button
                type="button"
                onClick={closeModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">
                  Package Name
                </label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Home Plus"
                  value={form.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Internet Speed (Mbps)
                </label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 50"
                  value={form.speed}
                  onChange={(e) => handleFormChange("speed", e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Monthly Price (PKR)
                </label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 3500"
                  value={form.price}
                  onChange={(e) => handleFormChange("price", e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Installation Fee (PKR)
                </label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 1500"
                  value={form.installationFee}
                  onChange={(e) =>
                    handleFormChange("installationFee", e.target.value)
                  }
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Connection Type
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={form.connectionType}
                  onChange={(e) =>
                    handleFormChange("connectionType", e.target.value)
                  }
                >
                  <option value="Home">Home</option>
                  <option value="Business">Business</option>
                </select>
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={form.status}
                  onChange={(e) => handleFormChange("status", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">Description</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={3}
                  placeholder="Short note about this plan (optional)"
                  value={form.description}
                  onChange={(e) =>
                    handleFormChange("description", e.target.value)
                  }
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePackage}
                className="btn btn-primary shadow-md"
              >
                Save Package
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Add Package Modal */}
    </>
  );
}

export default Main;