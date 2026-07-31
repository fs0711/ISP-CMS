import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder billing data
const INITIAL_BILLING_RECORDS = [
  {
    id: "SUB-1001",
    name: "Ahmed Raza",
    area: "Gulshan-e-Iqbal",
    package: "Home Basic 20 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 2500,
    outstandingBalance: 0,
    status: "Paid",
    dueDate: "10-Jul-2026",
  },
  {
    id: "SUB-1002",
    name: "Ayesha Siddiqui",
    area: "DHA Phase 5",
    package: "Home Plus 50 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 3500,
    outstandingBalance: 3500,
    status: "Pending",
    dueDate: "10-Jul-2026",
  },
  {
    id: "SUB-1003",
    name: "Bilal Hussain",
    area: "North Nazimabad",
    package: "Home Ultra 100 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 5500,
    outstandingBalance: 0,
    status: "Paid",
    dueDate: "12-Jul-2026",
  },
  {
    id: "SUB-1004",
    name: "Sana Malik",
    area: "Malir",
    package: "Business Starter 50 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 6000,
    outstandingBalance: 6000,
    status: "Generated",
    dueDate: "15-Jul-2026",
  },
  {
    id: "SUB-1005",
    name: "Usman Tariq",
    area: "Korangi",
    package: "Home Basic 20 Mbps",
    billingMonth: "June 2026",
    monthlyCharges: 2500,
    outstandingBalance: 2500,
    status: "Overdue",
    dueDate: "10-Jun-2026",
  },
  {
    id: "SUB-1006",
    name: "Hina Farooq",
    area: "Federal B Area",
    package: "Business Pro 100 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 7500,
    outstandingBalance: 0,
    status: "Paid",
    dueDate: "15-Jul-2026",
  },
  {
    id: "SUB-1007",
    name: "Kamran Iqbal",
    area: "Landhi",
    package: "Home Plus 50 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 3500,
    outstandingBalance: 0,
    status: "Paid",
    dueDate: "10-Jul-2026",
  },
  {
    id: "SUB-1008",
    name: "Nadia Yousaf",
    area: "Gulistan-e-Johar",
    package: "Home Lite 10 Mbps",
    billingMonth: "June 2026",
    monthlyCharges: 1200,
    outstandingBalance: 1200,
    status: "Overdue",
    dueDate: "10-Jun-2026",
  },
  {
    id: "SUB-1009",
    name: "Faisal Rehman",
    area: "Clifton",
    package: "Business Elite 200 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 12000,
    outstandingBalance: 12000,
    status: "Generated",
    dueDate: "18-Jul-2026",
  },
  {
    id: "SUB-1010",
    name: "Zainab Abbas",
    area: "North Karachi",
    package: "Home Value 15 Mbps",
    billingMonth: "July 2026",
    monthlyCharges: 1800,
    outstandingBalance: 1800,
    status: "Pending",
    dueDate: "10-Jul-2026",
  },
];
// END: Placeholder billing data

const MONTH_OPTIONS = ["All Months", "July 2026", "June 2026"];
const STATUS_OPTIONS = ["All Statuses", "Pending", "Generated", "Paid", "Overdue"];
const AREA_OPTIONS = [
  "All Areas",
  ...Array.from(new Set(INITIAL_BILLING_RECORDS.map((r) => r.area))),
];
const PACKAGE_OPTIONS = [
  "All Packages",
  ...Array.from(new Set(INITIAL_BILLING_RECORDS.map((r) => r.package))),
];

const STATUS_BADGE_CLASSES = {
  Paid: "bg-success/20 text-success",
  Generated: "bg-primary/10 text-primary",
  Pending: "bg-pending/20 text-pending",
  Overdue: "bg-danger/20 text-danger",
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
  const [records, setRecords] = useState(INITIAL_BILLING_RECORDS);
  const [selectedIds, setSelectedIds] = useState([]);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [monthDraft, setMonthDraft] = useState("All Months");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [areaDraft, setAreaDraft] = useState("All Areas");
  const [packageDraft, setPackageDraft] = useState("All Packages");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    month: "All Months",
    status: "All Statuses",
    area: "All Areas",
    package: "All Packages",
  });

  const [discountTarget, setDiscountTarget] = useState(null);
  const [discountType, setDiscountType] = useState("percentage");
  const [discountValue, setDiscountValue] = useState("");

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      month: monthDraft,
      status: statusDraft,
      area: areaDraft,
      package: packageDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setMonthDraft("All Months");
    setStatusDraft("All Statuses");
    setAreaDraft("All Areas");
    setPackageDraft("All Packages");
    setAppliedFilters({
      search: "",
      month: "All Months",
      status: "All Statuses",
      area: "All Areas",
      package: "All Packages",
    });
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      r.id.toLowerCase().includes(appliedFilters.search) ||
      r.name.toLowerCase().includes(appliedFilters.search);

    const matchesMonth =
      appliedFilters.month === "All Months" || r.billingMonth === appliedFilters.month;

    const matchesStatus =
      appliedFilters.status === "All Statuses" || r.status === appliedFilters.status;

    const matchesArea =
      appliedFilters.area === "All Areas" || r.area === appliedFilters.area;

    const matchesPackage =
      appliedFilters.package === "All Packages" || r.package === appliedFilters.package;

    return (
      matchesSearch && matchesMonth && matchesStatus && matchesArea && matchesPackage
    );
  });

  const visibleIds = filteredRecords.map((r) => r.id);
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !visibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const generateBill = (id) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id && r.status === "Pending" ? { ...r, status: "Generated" } : r
      )
    );
  };

  const generateSelectedBills = () => {
    setRecords((prev) =>
      prev.map((r) =>
        selectedIds.includes(r.id) && r.status === "Pending"
          ? { ...r, status: "Generated" }
          : r
      )
    );
    setSelectedIds([]);
  };

  const recordPayment = (id) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "Paid", outstandingBalance: 0 } : r
      )
    );
  };

  const openDiscountModal = (id) => {
    setDiscountTarget(id);
    setDiscountType("percentage");
    setDiscountValue("");
  };

  const closeDiscountModal = () => setDiscountTarget(null);

  const applyDiscount = () => {
    const value = Number(discountValue);
    if (!value || value <= 0) {
      closeDiscountModal();
      return;
    }
    setRecords((prev) =>
      prev.map((r) => {
        if (r.id !== discountTarget) return r;
        const discountAmount =
          discountType === "percentage"
            ? Math.round((r.monthlyCharges * value) / 100)
            : value;
        const newBalance = Math.max(r.outstandingBalance - discountAmount, 0);
        return { ...r, outstandingBalance: newBalance };
      })
    );
    closeDiscountModal();
  };

  const discountTargetRecord = records.find((r) => r.id === discountTarget);

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Billing</h2>
            <div className="text-slate-500 mt-1">
              Manage subscriber billing and monthly bill generation.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button type="button" className="btn btn-primary shadow-md">
              <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" /> Generate
              Monthly Bills
            </button>
            <button
              type="button"
              onClick={generateSelectedBills}
              disabled={selectedIds.length === 0}
              className="btn btn-outline-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" /> Generate
              Selected Bills
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
              Billing Report
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
                placeholder="Search by Subscriber ID, Customer Name, Phone Number or Invoice Number"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Billing Month</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={monthDraft}
                  onChange={(e) => setMonthDraft(e.target.value)}
                >
                  {MONTH_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Billing Status</label>
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
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Area</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={areaDraft}
                  onChange={(e) => setAreaDraft(e.target.value)}
                >
                  {AREA_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Package</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={packageDraft}
                  onChange={(e) => setPackageDraft(e.target.value)}
                >
                  {PACKAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 flex justify-end gap-2 mt-1">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="btn btn-primary px-8"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline-secondary px-8"
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
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Users" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">1,180</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Total Subscribers to Bill
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="FileText" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">640</div>
              <div className="text-slate-500 text-xs mt-0.5">Bills Generated</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Clock" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">320</div>
              <div className="text-slate-500 text-xs mt-0.5">Pending Bills</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="AlertTriangle"
              className="w-8 h-8 mr-4 flex-none text-danger"
            />
            <div>
              <div className="text-xl font-medium">85</div>
              <div className="text-slate-500 text-xs mt-0.5">Overdue Bills</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="CreditCard"
              className="w-8 h-8 mr-4 flex-none text-danger"
            />
            <div>
              <div className="text-xl font-medium">PKR 412,000</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Outstanding Amount
              </div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Bulk Actions */}
        <div className="col-span-12 intro-y">
          <div className="box p-4 flex flex-wrap items-center gap-3">
            <div className="text-slate-500 text-sm mr-auto">
              {selectedIds.length > 0
                ? `${selectedIds.length} subscriber${
                    selectedIds.length === 1 ? "" : "s"
                  } selected`
                : "Select subscribers below to run a bulk action"}
            </div>
            <button
              type="button"
              onClick={generateSelectedBills}
              disabled={selectedIds.length === 0}
              className="btn btn-outline-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" /> Generate
              Bills for Selected Subscribers
            </button>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              className="btn btn-outline-secondary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
              Selected
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print Billing
              Summary
            </button>
          </div>
        </div>
        {/* END: Bulk Actions */}

        {/* BEGIN: Billing Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Billing Records
            </h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredRecords.length} result
              {filteredRecords.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="FileText" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">
                No billing records found.
              </div>
              <button type="button" className="btn btn-primary shadow-md">
                <Lucide icon="RefreshCw" className="w-4 h-4 mr-2" /> Generate
                Monthly Bills
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1320px]">
                <thead>
                  <tr>
                    <th className="w-10">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={allVisibleSelected}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="whitespace-nowrap">SUBSCRIBER ID</th>
                    <th className="whitespace-nowrap">CUSTOMER NAME</th>
                    <th className="whitespace-nowrap">PACKAGE</th>
                    <th className="whitespace-nowrap">BILLING MONTH</th>
                    <th className="text-right whitespace-nowrap">
                      MONTHLY CHARGES
                    </th>
                    <th className="text-right whitespace-nowrap">
                      OUTSTANDING BALANCE
                    </th>
                    <th className="text-center whitespace-nowrap">
                      BILLING STATUS
                    </th>
                    <th className="whitespace-nowrap">DUE DATE</th>
                    <th className="text-center whitespace-nowrap min-w-[200px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="intro-x">
                      <td className="w-10">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedIds.includes(r.id)}
                          onChange={() => toggleSelectOne(r.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap font-medium">{r.id}</td>
                      <td className="whitespace-nowrap">{r.name}</td>
                      <td className="whitespace-nowrap">{r.package}</td>
                      <td className="whitespace-nowrap">{r.billingMonth}</td>
                      <td className="text-right whitespace-nowrap">
                        PKR {r.monthlyCharges.toLocaleString()}
                      </td>
                      <td
                        className={classnames(
                          "text-right whitespace-nowrap",
                          r.outstandingBalance > 0
                            ? "text-danger"
                            : "text-success"
                        )}
                      >
                        PKR {r.outstandingBalance.toLocaleString()}
                      </td>
                      <td className="w-40">
                        <div className="flex justify-center">
                          <StatusBadge status={r.status} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{r.dueDate}</td>
                      <td className="table-report__action w-auto min-w-[200px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy tag="a" href="" content="View Billing">
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Generate Bill"
                            onClick={(e) => {
                              e.preventDefault();
                              generateBill(r.id);
                            }}
                          >
                            <Lucide
                              icon="RefreshCw"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="View Invoice">
                            <Lucide
                              icon="FileText"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Record Payment"
                            onClick={(e) => {
                              e.preventDefault();
                              recordPayment(r.id);
                            }}
                          >
                            <Lucide
                              icon="DollarSign"
                              className="w-4 h-4 text-slate-500 hover:text-success"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Apply Discount"
                            onClick={(e) => {
                              e.preventDefault();
                              openDiscountModal(r.id);
                            }}
                          >
                            <Lucide
                              icon="Percent"
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
        {/* END: Billing Table */}
      </div>

      {/* BEGIN: Apply Discount Modal */}
      {discountTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeDiscountModal}
          ></div>
          <div className="relative box w-full max-w-sm p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Apply Discount</h2>
              <button
                type="button"
                onClick={closeDiscountModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="text-slate-500 text-sm mb-4">
              {discountTargetRecord?.name} &middot; {discountTargetRecord?.id}
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Discount Type</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={discountType}
                  onChange={(e) => setDiscountType(e.target.value)}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (PKR)</option>
                </select>
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">
                  {discountType === "percentage"
                    ? "Discount Percentage"
                    : "Discount Amount (PKR)"}
                </label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder={discountType === "percentage" ? "e.g. 10" : "e.g. 500"}
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeDiscountModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={applyDiscount}
                className="btn btn-primary shadow-md"
              >
                Apply Discount
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Apply Discount Modal */}
    </>
  );
}

export default Main;