import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder subscriber data (Pakistani subscriber records)
const SUBSCRIBERS = [
  {
    id: "SUB-1001",
    name: "Muhammad Ahmed Khan",
    cnic: "42101-1234567-1",
    phone: "0300-1234567",
    area: "Gulshan-e-Iqbal",
    package: "Standard 20 Mbps",
    balance: 0,
    status: "Active",
  },
  {
    id: "SUB-1002",
    name: "Ayesha Siddiqui",
    cnic: "42201-9876543-2",
    phone: "0333-2345678",
    area: "DHA Phase 5",
    package: "Premium 50 Mbps",
    balance: 3500,
    status: "Active",
  },
  {
    id: "SUB-1003",
    name: "Bilal Hussain",
    cnic: "42301-1122334-3",
    phone: "0321-3456789",
    area: "North Nazimabad",
    package: "Basic 10 Mbps",
    balance: 0,
    status: "Pending Installation",
  },
  {
    id: "SUB-1004",
    name: "Sana Malik",
    cnic: "42101-2233445-4",
    phone: "0345-4567890",
    area: "Malir",
    package: "Standard 20 Mbps",
    balance: 1200,
    status: "Active",
  },
  {
    id: "SUB-1005",
    name: "Usman Tariq",
    cnic: "42401-3344556-5",
    phone: "0312-5678901",
    area: "Korangi",
    package: "Basic 10 Mbps",
    balance: 6800,
    status: "Suspended",
  },
  {
    id: "SUB-1006",
    name: "Hina Farooq",
    cnic: "42101-4455667-6",
    phone: "0301-6789012",
    area: "Federal B Area",
    package: "Ultra 100 Mbps",
    balance: 0,
    status: "Active",
  },
  {
    id: "SUB-1007",
    name: "Kamran Iqbal",
    cnic: "42501-5566778-7",
    phone: "0332-7890123",
    area: "Landhi",
    package: "Standard 20 Mbps",
    balance: 2300,
    status: "Active",
  },
  {
    id: "SUB-1008",
    name: "Nadia Yousaf",
    cnic: "42201-6677889-8",
    phone: "0300-8901234",
    area: "Gulistan-e-Johar",
    package: "Premium 50 Mbps",
    balance: 0,
    status: "Pending Installation",
  },
  {
    id: "SUB-1009",
    name: "Faisal Rehman",
    cnic: "42101-7788990-9",
    phone: "0334-9012345",
    area: "Clifton",
    package: "Ultra 100 Mbps",
    balance: 0,
    status: "Terminated",
  },
  {
    id: "SUB-1010",
    name: "Zainab Abbas",
    cnic: "42301-8899001-0",
    phone: "0315-0123456",
    area: "North Karachi",
    package: "Basic 10 Mbps",
    balance: 950,
    status: "Active",
  },
];
// END: Placeholder subscriber data

const STATUS_OPTIONS = [
  "All Statuses",
  "Active",
  "Pending Installation",
  "Suspended",
  "Terminated",
];

const PACKAGE_OPTIONS = [
  "All Packages",
  "Basic 10 Mbps",
  "Standard 20 Mbps",
  "Premium 50 Mbps",
  "Ultra 100 Mbps",
];

const AREA_OPTIONS = [
  "All Areas",
  ...Array.from(new Set(SUBSCRIBERS.map((s) => s.area))),
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
        STATUS_BADGE_CLASSES[status]
      )}
    >
      {status}
    </div>
  );
}

function Main() {
  // Draft filter values (bound to the inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [packageDraft, setPackageDraft] = useState("All Packages");
  const [areaDraft, setAreaDraft] = useState("All Areas");

  // Applied filters (what the table actually uses)
  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Statuses",
    package: "All Packages",
    area: "All Areas",
  });

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

  const filteredSubscribers = SUBSCRIBERS.filter((sub) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      sub.id.toLowerCase().includes(appliedFilters.search) ||
      sub.name.toLowerCase().includes(appliedFilters.search) ||
      sub.cnic.toLowerCase().includes(appliedFilters.search) ||
      sub.phone.toLowerCase().includes(appliedFilters.search);

    const matchesStatus =
      appliedFilters.status === "All Statuses" ||
      sub.status === appliedFilters.status;

    const matchesPackage =
      appliedFilters.package === "All Packages" ||
      sub.package === appliedFilters.package;

    const matchesArea =
      appliedFilters.area === "All Areas" || sub.area === appliedFilters.area;

    return matchesSearch && matchesStatus && matchesPackage && matchesArea;
  });

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-medium">Subscribers</h2>
            <div className="text-slate-500 mt-1">
              Manage all internet subscribers from one place.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:ml-auto mt-4 sm:mt-0">
            <button type="button" className="btn btn-primary shadow-md">
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Subscriber
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Upload" className="w-4 h-4 mr-2" /> Import
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
            <Lucide icon="Users" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">1,180</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Active Subscribers
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Clock" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">24</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Pending Installations
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="UserX" className="w-8 h-8 mr-4 flex-none text-warning" />
            <div>
              <div className="text-xl font-medium">42</div>
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
              <div className="text-xl font-medium">PKR 186,400</div>
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
              {filteredSubscribers.length} result
              {filteredSubscribers.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredSubscribers.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide
                icon="Users"
                className="w-12 h-12 text-slate-300 mb-3"
              />
              <div className="text-slate-500 mb-5">No subscribers found.</div>
              <button type="button" className="btn btn-primary shadow-md">
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Subscriber
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1080px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">SUBSCRIBER ID</th>
                    <th className="whitespace-nowrap">CUSTOMER NAME</th>
                    <th className="whitespace-nowrap">PHONE</th>
                    <th className="whitespace-nowrap">AREA</th>
                    <th className="whitespace-nowrap">PACKAGE</th>
                    <th className="text-center whitespace-nowrap">
                      CONNECTION STATUS
                    </th>
                    <th className="text-right whitespace-nowrap">
                      OUTSTANDING BALANCE
                    </th>
                    <th className="text-center whitespace-nowrap min-w-[180px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubscribers.map((sub) => (
                    <tr key={sub.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">
                        {sub.id}
                      </td>
                      <td className="whitespace-nowrap">{sub.name}</td>
                      <td className="whitespace-nowrap">{sub.phone}</td>
                      <td className="whitespace-nowrap">{sub.area}</td>
                      <td className="whitespace-nowrap">{sub.package}</td>
                      <td className="w-48">
                        <div className="flex justify-center">
                          <StatusBadge status={sub.status} />
                        </div>
                      </td>
                      <td
                        className={classnames(
                          "text-right whitespace-nowrap",
                          sub.balance > 0 ? "text-danger" : "text-success"
                        )}
                      >
                        PKR {sub.balance.toLocaleString()}
                      </td>
                      <td className="table-report__action w-auto min-w-[180px] whitespace-nowrap">
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
                          <Tippy tag="a" href="" content="Generate Invoice">
                            <Lucide
                              icon="FileText"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="Register Complaint">
                            <Lucide
                              icon="AlertCircle"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="Suspend">
                            <Lucide
                              icon="UserX"
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
    </>
  );
}

export default Main;