import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder reseller data
const LOW_WALLET_THRESHOLD = 5000;

const INITIAL_RESELLERS = [
  {
    id: "RSL-1001",
    name: "Ali Communications",
    companyName: "Ali Communications (Pvt) Ltd",
    ownerName: "Ali Raza",
    cnic: "42101-1234567-1",
    phone: "0300-1112233",
    email: "ali.comm@example.com",
    area: "Gulshan-e-Iqbal",
    subscribers: 215,
    wallet: 35000,
    package: "Wholesale 50 Mbps",
    monthlyCollections: 412000,
    lastRecharge: "18-Jul-2026",
    status: "Active",
  },
  {
    id: "RSL-1002",
    name: "Karachi Net Solutions",
    companyName: "Karachi Net Solutions",
    ownerName: "Waqar Ahmed",
    cnic: "42201-2233445-3",
    phone: "0321-2223344",
    email: "info@karachinet.example.com",
    area: "DHA Phase 5",
    subscribers: 342,
    wallet: 3200,
    package: "Wholesale 100 Mbps",
    monthlyCollections: 615000,
    lastRecharge: "10-Jul-2026",
    status: "Active",
  },
  {
    id: "RSL-1003",
    name: "Nazimabad Broadband",
    companyName: "Nazimabad Broadband Services",
    ownerName: "Bilal Sheikh",
    cnic: "42101-3344556-5",
    phone: "0333-3334455",
    email: "contact@nazimabadbb.example.com",
    area: "North Nazimabad",
    subscribers: 178,
    wallet: 18500,
    package: "Wholesale 20 Mbps",
    monthlyCollections: 268000,
    lastRecharge: "22-Jul-2026",
    status: "Active",
  },
  {
    id: "RSL-1004",
    name: "Malir Link Networks",
    companyName: "Malir Link Networks",
    ownerName: "Sana Malik",
    cnic: "42301-4455667-7",
    phone: "0345-4445566",
    email: "sana@malirlink.example.com",
    area: "Malir",
    subscribers: 96,
    wallet: 1500,
    package: "Wholesale 20 Mbps",
    monthlyCollections: 144000,
    lastRecharge: "05-Jul-2026",
    status: "Suspended",
  },
  {
    id: "RSL-1005",
    name: "Korangi Fiber Partners",
    companyName: "Korangi Fiber Partners",
    ownerName: "Usman Tariq",
    cnic: "42401-5566778-9",
    phone: "0312-5556677",
    email: "usman@korangifiber.example.com",
    area: "Korangi",
    subscribers: 260,
    wallet: 42000,
    package: "Wholesale 50 Mbps",
    monthlyCollections: 398000,
    lastRecharge: "23-Jul-2026",
    status: "Active",
  },
  {
    id: "RSL-1006",
    name: "Federal B Area Connect",
    companyName: "F.B. Area Connect Networks",
    ownerName: "Hina Farooq",
    cnic: "42101-6677889-1",
    phone: "0301-6667788",
    email: "hina@fbaconnect.example.com",
    area: "Federal B Area",
    subscribers: 132,
    wallet: 8600,
    package: "Wholesale 20 Mbps",
    monthlyCollections: 201000,
    lastRecharge: "16-Jul-2026",
    status: "Active",
  },
  {
    id: "RSL-1007",
    name: "Landhi Cable & Internet",
    companyName: "Landhi Cable & Internet Co.",
    ownerName: "Kamran Iqbal",
    cnic: "42501-7788990-3",
    phone: "0332-7778899",
    email: "kamran@landhicable.example.com",
    area: "Landhi",
    subscribers: 74,
    wallet: 0,
    package: "Wholesale 20 Mbps",
    monthlyCollections: 0,
    lastRecharge: "—",
    status: "Inactive",
  },
  {
    id: "RSL-1008",
    name: "Gulistan Digital Services",
    companyName: "Gulistan Digital Services",
    ownerName: "Nadia Yousaf",
    cnic: "42101-8899001-5",
    phone: "0300-8889900",
    email: "nadia@gulistandigital.example.com",
    area: "Gulistan-e-Johar",
    subscribers: 189,
    wallet: 4200,
    package: "Wholesale 50 Mbps",
    monthlyCollections: 287000,
    lastRecharge: "12-Jul-2026",
    status: "Active",
  },
  {
    id: "RSL-1009",
    name: "Clifton Connect",
    companyName: "Clifton Connect (Pvt) Ltd",
    ownerName: "Faisal Rehman",
    cnic: "42201-9900112-7",
    phone: "0334-9990011",
    email: "faisal@cliftonconnect.example.com",
    area: "Clifton",
    subscribers: 301,
    wallet: 56000,
    package: "Wholesale 100 Mbps",
    monthlyCollections: 720000,
    lastRecharge: "24-Jul-2026",
    status: "Active",
  },
  {
    id: "RSL-1010",
    name: "North Karachi Netlink",
    companyName: "North Karachi Netlink Services",
    ownerName: "Zainab Abbas",
    cnic: "42101-0011223-9",
    phone: "0315-0001122",
    email: "zainab@nknetlink.example.com",
    area: "North Karachi",
    subscribers: 154,
    wallet: 2800,
    package: "Wholesale 20 Mbps",
    monthlyCollections: 231000,
    lastRecharge: "08-Jul-2026",
    status: "Suspended",
  },
];
// END: Placeholder reseller data

const STATUS_OPTIONS = ["All Statuses", "Active", "Suspended", "Inactive"];
const WALLET_STATUS_OPTIONS = ["All Wallet Statuses", "Sufficient", "Low Balance"];
const AREA_OPTIONS = [
  "All Areas",
  ...Array.from(new Set(INITIAL_RESELLERS.map((r) => r.area))),
];
const PACKAGE_OPTIONS = Array.from(
  new Set(INITIAL_RESELLERS.map((r) => r.package))
);
const PAYMENT_METHODS = ["Cash", "Bank Transfer", "Online", "Cheque"];

const STATUS_BADGE_CLASSES = {
  Active: "bg-success/20 text-success",
  Suspended: "bg-danger/20 text-danger",
  Inactive: "bg-slate-200 text-slate-500 dark:bg-darkmode-300",
};

const RECHARGE_FORM_DEFAULT = {
  resellerId: "",
  amount: "",
  method: "Cash",
  reference: "",
  remarks: "",
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
  const [resellers, setResellers] = useState(INITIAL_RESELLERS);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [areaDraft, setAreaDraft] = useState("All Areas");
  const [walletDraft, setWalletDraft] = useState("All Wallet Statuses");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Statuses",
    area: "All Areas",
    wallet: "All Wallet Statuses",
  });

  const [detailsResellerId, setDetailsResellerId] = useState(null);

  const [rechargeModal, setRechargeModal] = useState(false);
  const [rechargeForm, setRechargeForm] = useState(RECHARGE_FORM_DEFAULT);

  const [areaModal, setAreaModal] = useState({ open: false, resellerId: null });
  const [areaSelection, setAreaSelection] = useState([]);

  const [packageModal, setPackageModal] = useState({ open: false, resellerId: null });
  const [packageSelection, setPackageSelection] = useState(PACKAGE_OPTIONS[0]);

  const [banner, setBanner] = useState(null);

  const showBanner = (message) => {
    setBanner(message);
    window.clearTimeout(showBanner._t);
    showBanner._t = window.setTimeout(() => setBanner(null), 3500);
  };

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      status: statusDraft,
      area: areaDraft,
      wallet: walletDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setStatusDraft("All Statuses");
    setAreaDraft("All Areas");
    setWalletDraft("All Wallet Statuses");
    setAppliedFilters({
      search: "",
      status: "All Statuses",
      area: "All Areas",
      wallet: "All Wallet Statuses",
    });
  };

  const filteredResellers = resellers.filter((r) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      r.id.toLowerCase().includes(appliedFilters.search) ||
      r.name.toLowerCase().includes(appliedFilters.search) ||
      r.phone.toLowerCase().includes(appliedFilters.search) ||
      r.area.toLowerCase().includes(appliedFilters.search);

    const matchesStatus =
      appliedFilters.status === "All Statuses" || r.status === appliedFilters.status;

    const matchesArea =
      appliedFilters.area === "All Areas" || r.area === appliedFilters.area;

    const matchesWallet =
      appliedFilters.wallet === "All Wallet Statuses" ||
      (appliedFilters.wallet === "Low Balance" && r.wallet < LOW_WALLET_THRESHOLD) ||
      (appliedFilters.wallet === "Sufficient" && r.wallet >= LOW_WALLET_THRESHOLD);

    return matchesSearch && matchesStatus && matchesArea && matchesWallet;
  });

  const totalResellers = resellers.length;
  const activeResellers = resellers.filter((r) => r.status === "Active").length;
  const suspendedResellers = resellers.filter((r) => r.status === "Suspended").length;
  const lowWalletResellers = resellers.filter((r) => r.wallet < LOW_WALLET_THRESHOLD).length;
  const totalWalletBalance = resellers.reduce((sum, r) => sum + r.wallet, 0);

  const detailsReseller = resellers.find((r) => r.id === detailsResellerId) || null;

  const openRechargeModal = (resellerId) => {
    setRechargeForm({ ...RECHARGE_FORM_DEFAULT, resellerId: resellerId || "" });
    setRechargeModal(true);
  };
  const closeRechargeModal = () => setRechargeModal(false);

  const handleRecharge = () => {
    const amount = Number(rechargeForm.amount) || 0;
    if (rechargeForm.resellerId && amount > 0) {
      setResellers((prev) =>
        prev.map((r) =>
          r.id === rechargeForm.resellerId
            ? {
                ...r,
                wallet: r.wallet + amount,
                lastRecharge: new Date().toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }),
              }
            : r
        )
      );
      showBanner(`PKR ${amount.toLocaleString()} added to ${rechargeForm.resellerId} wallet.`);
    }
    closeRechargeModal();
  };

  const openAreaModal = (resellerId) => {
    const reseller = resellers.find((r) => r.id === resellerId);
    setAreaSelection(reseller ? [reseller.area] : []);
    setAreaModal({ open: true, resellerId });
  };
  const closeAreaModal = () => setAreaModal({ open: false, resellerId: null });

  const toggleAreaSelection = (area) => {
    setAreaSelection((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const saveAreaAssignment = () => {
    if (areaModal.resellerId && areaSelection.length > 0) {
      setResellers((prev) =>
        prev.map((r) =>
          r.id === areaModal.resellerId ? { ...r, area: areaSelection[0] } : r
        )
      );
      showBanner(`Service area updated for ${areaModal.resellerId}.`);
    }
    closeAreaModal();
  };

  const openPackageModal = (resellerId) => {
    const reseller = resellers.find((r) => r.id === resellerId);
    setPackageSelection(reseller ? reseller.package : PACKAGE_OPTIONS[0]);
    setPackageModal({ open: true, resellerId });
  };
  const closePackageModal = () => setPackageModal({ open: false, resellerId: null });

  const savePackageAssignment = () => {
    if (packageModal.resellerId) {
      setResellers((prev) =>
        prev.map((r) =>
          r.id === packageModal.resellerId ? { ...r, package: packageSelection } : r
        )
      );
      showBanner(`Package updated for ${packageModal.resellerId}.`);
    }
    closePackageModal();
  };

  const handleToggleStatus = (resellerId) => {
    setResellers((prev) =>
      prev.map((r) => {
        if (r.id !== resellerId) return r;
        const nextStatus = r.status === "Active" ? "Suspended" : "Active";
        return { ...r, status: nextStatus };
      })
    );
    const reseller = resellers.find((r) => r.id === resellerId);
    const nextStatus = reseller?.status === "Active" ? "Suspended" : "Active";
    showBanner(`${resellerId} is now ${nextStatus}.`);
  };

  const handleViewSubscribers = (resellerId) => {
    showBanner(`Opening subscriber list for ${resellerId}.`);
  };

  const handleAddReseller = () => {
    showBanner("Add Reseller form would open here.");
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Resellers / LCO</h2>
            <div className="text-slate-500 mt-1">
              Manage reseller accounts, assigned areas and wallet balances.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={handleAddReseller}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Reseller
            </button>
            <button
              type="button"
              onClick={() => openRechargeModal(null)}
              className="btn btn-outline-secondary"
            >
              <Lucide icon="Wallet" className="w-4 h-4 mr-2" /> Recharge Wallet
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
            </button>
          </div>
        </div>
        {/* END: Page Header */}

        {/* BEGIN: Status Banner */}
        {banner && (
          <div className="col-span-12 intro-y">
            <div className="box p-3 px-4 bg-success/10 text-success text-sm flex items-center">
              <Lucide icon="CheckCircle2" className="w-4 h-4 mr-2 flex-none" />
              {banner}
            </div>
          </div>
        )}
        {/* END: Status Banner */}

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
                placeholder="Search by Reseller Name, Reseller ID, Phone Number or Assigned Area"
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
                <label className="text-xs text-slate-500">Assigned Area</label>
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
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Wallet Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={walletDraft}
                  onChange={(e) => setWalletDraft(e.target.value)}
                >
                  {WALLET_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 flex gap-2">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="btn btn-primary w-full sm:w-40"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-outline-secondary w-full sm:w-40"
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
              <div className="text-xl font-medium">{totalResellers}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Resellers</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="CheckCircle2"
              className="w-8 h-8 mr-4 flex-none text-success"
            />
            <div>
              <div className="text-xl font-medium">{activeResellers}</div>
              <div className="text-slate-500 text-xs mt-0.5">Active Resellers</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-danger" />
            <div>
              <div className="text-xl font-medium">{suspendedResellers}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Suspended Resellers
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="AlertTriangle" className="w-8 h-8 mr-4 flex-none text-warning" />
            <div>
              <div className="text-xl font-medium">{lowWalletResellers}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Low Wallet Balance
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Wallet" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">
                PKR {totalWalletBalance.toLocaleString()}
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                Total Wallet Balance
              </div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Resellers Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">Reseller Accounts</h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredResellers.length} result
              {filteredResellers.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredResellers.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="Users" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">No resellers found.</div>
              <button
                type="button"
                onClick={handleAddReseller}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Reseller
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1360px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">RESELLER ID</th>
                    <th className="whitespace-nowrap">RESELLER NAME</th>
                    <th className="whitespace-nowrap">PHONE NUMBER</th>
                    <th className="whitespace-nowrap">ASSIGNED AREA</th>
                    <th className="text-right whitespace-nowrap">SUBSCRIBERS</th>
                    <th className="text-right whitespace-nowrap">
                      WALLET BALANCE
                    </th>
                    <th className="whitespace-nowrap">ASSIGNED PACKAGE</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="text-center whitespace-nowrap min-w-[220px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResellers.map((r) => (
                    <tr key={r.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">{r.id}</td>
                      <td className="whitespace-nowrap">{r.name}</td>
                      <td className="whitespace-nowrap">{r.phone}</td>
                      <td className="whitespace-nowrap">{r.area}</td>
                      <td className="text-right whitespace-nowrap">
                        {r.subscribers}
                      </td>
                      <td
                        className={classnames(
                          "text-right whitespace-nowrap",
                          r.wallet < LOW_WALLET_THRESHOLD
                            ? "text-danger"
                            : "text-success"
                        )}
                      >
                        PKR {r.wallet.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap">{r.package}</td>
                      <td className="w-32">
                        <div className="flex justify-center">
                          <StatusBadge status={r.status} />
                        </div>
                      </td>
                      <td className="table-report__action w-auto min-w-[220px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy
                            tag="a"
                            href=""
                            content="View Details"
                            onClick={(e) => {
                              e.preventDefault();
                              setDetailsResellerId(r.id);
                            }}
                          >
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="Edit">
                            <Lucide
                              icon="Edit"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Recharge Wallet"
                            onClick={(e) => {
                              e.preventDefault();
                              openRechargeModal(r.id);
                            }}
                          >
                            <Lucide
                              icon="Wallet"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Assign Area"
                            onClick={(e) => {
                              e.preventDefault();
                              openAreaModal(r.id);
                            }}
                          >
                            <Lucide
                              icon="MapPin"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Assign Package"
                            onClick={(e) => {
                              e.preventDefault();
                              openPackageModal(r.id);
                            }}
                          >
                            <Lucide
                              icon="Package"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="View Subscribers"
                            onClick={(e) => {
                              e.preventDefault();
                              handleViewSubscribers(r.id);
                            }}
                          >
                            <Lucide
                              icon="Users"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content={r.status === "Active" ? "Disable" : "Enable"}
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleStatus(r.id);
                            }}
                          >
                            <Lucide
                              icon="Power"
                              className={classnames(
                                "w-4 h-4 hover:text-primary",
                                r.status === "Active"
                                  ? "text-success"
                                  : "text-slate-400"
                              )}
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
        {/* END: Resellers Table */}
      </div>

      {/* BEGIN: Reseller Details Modal (UI only) */}
      {detailsReseller && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDetailsResellerId(null)}
          ></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Reseller Details</h2>
              <button
                type="button"
                onClick={() => setDetailsResellerId(null)}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Reseller Name</div>
                <div className="font-medium">{detailsReseller.name}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Company Name</div>
                <div className="font-medium">{detailsReseller.companyName}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Owner Name</div>
                <div className="font-medium">{detailsReseller.ownerName}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">CNIC</div>
                <div className="font-medium">{detailsReseller.cnic}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Phone Number</div>
                <div className="font-medium">{detailsReseller.phone}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Email</div>
                <div className="font-medium">{detailsReseller.email}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Assigned Area</div>
                <div className="font-medium">{detailsReseller.area}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Assigned Package</div>
                <div className="font-medium">{detailsReseller.package}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Wallet Balance</div>
                <div className="font-medium">
                  PKR {detailsReseller.wallet.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Total Subscribers</div>
                <div className="font-medium">{detailsReseller.subscribers}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Monthly Collections</div>
                <div className="font-medium">
                  PKR {detailsReseller.monthlyCollections.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Last Wallet Recharge</div>
                <div className="font-medium">{detailsReseller.lastRecharge}</div>
              </div>
              <div className="col-span-2">
                <div className="text-slate-500 text-xs mb-1">Status</div>
                <StatusBadge status={detailsReseller.status} />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDetailsResellerId(null)}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = detailsReseller.id;
                  setDetailsResellerId(null);
                  openRechargeModal(id);
                }}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Wallet" className="w-4 h-4 mr-2" /> Recharge Wallet
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Reseller Details Modal */}

      {/* BEGIN: Recharge Wallet Modal (UI only) */}
      {rechargeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeRechargeModal}></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Recharge Wallet</h2>
              <button
                type="button"
                onClick={closeRechargeModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Reseller</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={rechargeForm.resellerId}
                  onChange={(e) =>
                    setRechargeForm((prev) => ({
                      ...prev,
                      resellerId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select a reseller</option>
                  {resellers.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.id} — {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Recharge Amount (PKR)
                </label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 10000"
                  value={rechargeForm.amount}
                  onChange={(e) =>
                    setRechargeForm((prev) => ({ ...prev, amount: e.target.value }))
                  }
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">Payment Method</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={rechargeForm.method}
                  onChange={(e) =>
                    setRechargeForm((prev) => ({ ...prev, method: e.target.value }))
                  }
                >
                  {PAYMENT_METHODS.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Reference Number
                </label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="Optional"
                  value={rechargeForm.reference}
                  onChange={(e) =>
                    setRechargeForm((prev) => ({
                      ...prev,
                      reference: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">Remarks</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={2}
                  placeholder="Optional note about this recharge"
                  value={rechargeForm.remarks}
                  onChange={(e) =>
                    setRechargeForm((prev) => ({
                      ...prev,
                      remarks: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeRechargeModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRecharge}
                className="btn btn-primary shadow-md"
              >
                Recharge
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Recharge Wallet Modal */}

      {/* BEGIN: Assign Area Modal (UI only) */}
      {areaModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAreaModal}></div>
          <div className="relative box w-full max-w-md p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Assign Service Area</h2>
              <button
                type="button"
                onClick={closeAreaModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs text-slate-500 mb-2">
              Select the area(s) this reseller is responsible for.
            </div>
            <div className="max-h-60 overflow-y-auto border border-slate-200/60 dark:border-darkmode-400 rounded-md p-3 space-y-2">
              {AREA_OPTIONS.filter((a) => a !== "All Areas").map((area) => (
                <label key={area} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={areaSelection.includes(area)}
                    onChange={() => toggleAreaSelection(area)}
                  />
                  {area}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeAreaModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveAreaAssignment}
                className="btn btn-primary shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Assign Area Modal */}

      {/* BEGIN: Assign Package Modal (UI only) */}
      {packageModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closePackageModal}></div>
          <div className="relative box w-full max-w-md p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Assign Package</h2>
              <button
                type="button"
                onClick={closePackageModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="col-span-12">
              <label className="text-xs text-slate-500">Wholesale Package</label>
              <select
                className="form-select box mt-1 w-full"
                value={packageSelection}
                onChange={(e) => setPackageSelection(e.target.value)}
              >
                {PACKAGE_OPTIONS.map((pkg) => (
                  <option key={pkg} value={pkg}>
                    {pkg}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closePackageModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePackageAssignment}
                className="btn btn-primary shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Assign Package Modal */}
    </>
  );
}

export default Main;