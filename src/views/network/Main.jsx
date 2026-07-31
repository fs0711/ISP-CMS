import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder network device data
const DEVICE_TYPES = [
  "OLT",
  "Core Router",
  "Distribution Switch",
  "Access Switch",
  "POP",
  "OLT Chassis",
  "Wireless Access Point",
  "UPS",
  "Fiber Distribution Box",
  "Other",
];

const STATUS_OPTIONS = ["Online", "Offline", "Maintenance", "Disabled"];

const INITIAL_DEVICES = [
  {
    id: "NET-1001",
    name: "Huawei MA5608T",
    type: "OLT",
    vendor: "Huawei",
    model: "MA5608T",
    serial: "OLT-45671289",
    ip: "10.10.1.1",
    mac: "AC:DE:48:11:00:01",
    location: "Gulshan POP",
    installationDate: "10-Jan-2025",
    lastMaintenance: "15-Jun-2026",
    technician: "Usman Khan",
    remarks: "Serves Gulshan-e-Iqbal and surrounding areas.",
    status: "Online",
  },
  {
    id: "NET-1002",
    name: "Cisco Core Router",
    type: "Core Router",
    vendor: "Cisco",
    model: "ASR 1001-X",
    serial: "CR-99887766",
    ip: "10.10.0.1",
    mac: "00:1A:2B:33:44:55",
    location: "North Nazimabad POP",
    installationDate: "05-Mar-2025",
    lastMaintenance: "20-Jul-2026",
    technician: "Bilal Sheikh",
    remarks: "Primary core router, under scheduled maintenance.",
    status: "Maintenance",
  },
  {
    id: "NET-1003",
    name: "Huawei MA5800",
    type: "OLT",
    vendor: "Huawei",
    model: "MA5800-X7",
    serial: "OLT-55667788",
    ip: "10.10.1.2",
    mac: "AC:DE:48:11:00:02",
    location: "DHA Phase 5 POP",
    installationDate: "18-Feb-2025",
    lastMaintenance: "02-Jul-2026",
    technician: "Kamran Iqbal",
    remarks: "Serves DHA Phase 5 and Clifton.",
    status: "Online",
  },
  {
    id: "NET-1004",
    name: "TP-Link Distribution Switch",
    type: "Distribution Switch",
    vendor: "TP-Link",
    model: "T2600G-28TS",
    serial: "DS-11223344",
    ip: "10.10.2.5",
    mac: "B8:27:EB:22:33:44",
    location: "Korangi POP",
    installationDate: "22-Apr-2025",
    lastMaintenance: "10-May-2026",
    technician: "Waqar Ahmed",
    remarks: "Handles distribution to Korangi and Landhi.",
    status: "Offline",
  },
  {
    id: "NET-1005",
    name: "Gulshan POP",
    type: "POP",
    vendor: "In-House",
    model: "—",
    serial: "POP-GLS-01",
    ip: "—",
    mac: "—",
    location: "Gulshan-e-Iqbal",
    installationDate: "01-Jan-2024",
    lastMaintenance: "15-Jun-2026",
    technician: "Usman Khan",
    remarks: "Main point of presence for Gulshan zone.",
    status: "Online",
  },
  {
    id: "NET-1006",
    name: "Ubiquiti Access Point",
    type: "Wireless Access Point",
    vendor: "Ubiquiti",
    model: "UAP-AC-Mesh",
    serial: "AP-66778899",
    ip: "10.10.3.10",
    mac: "24:5A:4C:55:66:77",
    location: "Federal B Area",
    installationDate: "30-May-2025",
    lastMaintenance: "01-Jun-2026",
    technician: "Usman Khan",
    remarks: "Extends coverage for outdoor customers.",
    status: "Online",
  },
  {
    id: "NET-1007",
    name: "APC UPS Unit",
    type: "UPS",
    vendor: "APC",
    model: "Smart-UPS 3000VA",
    serial: "UPS-33445566",
    ip: "—",
    mac: "—",
    location: "North Nazimabad POP",
    installationDate: "05-Mar-2025",
    lastMaintenance: "20-Jul-2026",
    technician: "Bilal Sheikh",
    remarks: "Backup power for core router rack.",
    status: "Maintenance",
  },
  {
    id: "NET-1008",
    name: "FiberHome Distribution Box",
    type: "Fiber Distribution Box",
    vendor: "FiberHome",
    model: "FDB-24",
    serial: "FDB-77889900",
    ip: "—",
    mac: "—",
    location: "Malir",
    installationDate: "12-Jun-2025",
    lastMaintenance: "—",
    technician: "—",
    remarks: "Feeds fiber connections for Malir residential zone.",
    status: "Disabled",
  },
  {
    id: "NET-1009",
    name: "Cisco Access Switch",
    type: "Access Switch",
    vendor: "Cisco",
    model: "Catalyst 2960",
    serial: "AS-99001122",
    ip: "10.10.4.2",
    mac: "00:1A:2B:66:77:88",
    location: "Clifton POP",
    installationDate: "08-Jul-2025",
    lastMaintenance: "22-Jul-2026",
    technician: "Kamran Iqbal",
    remarks: "Handles access-layer connectivity for Clifton.",
    status: "Online",
  },
  {
    id: "NET-1010",
    name: "Korangi POP",
    type: "POP",
    vendor: "In-House",
    model: "—",
    serial: "POP-KRG-01",
    ip: "—",
    mac: "—",
    location: "Korangi",
    installationDate: "01-Jan-2024",
    lastMaintenance: "10-May-2026",
    technician: "Waqar Ahmed",
    remarks: "Main point of presence for Korangi zone.",
    status: "Online",
  },
  {
    id: "NET-1011",
    name: "Huawei OLT Chassis",
    type: "OLT Chassis",
    vendor: "Huawei",
    model: "H901MABH",
    serial: "OLTC-22334455",
    ip: "10.10.1.9",
    mac: "AC:DE:48:11:00:09",
    location: "Gulistan-e-Johar",
    installationDate: "14-Aug-2025",
    lastMaintenance: "05-Jul-2026",
    technician: "Bilal Sheikh",
    remarks: "Chassis expansion unit for Gulistan zone.",
    status: "Online",
  },
];
// END: Placeholder network device data

const TYPE_FILTER_OPTIONS = ["All Types", ...DEVICE_TYPES];
const STATUS_FILTER_OPTIONS = ["All Statuses", ...STATUS_OPTIONS];
const LOCATION_FILTER_OPTIONS = [
  "All Locations",
  ...Array.from(new Set(INITIAL_DEVICES.map((d) => d.location))),
];
const VENDOR_FILTER_OPTIONS = [
  "All Vendors",
  ...Array.from(new Set(INITIAL_DEVICES.map((d) => d.vendor))),
];

const STATUS_BADGE_CLASSES = {
  Online: "bg-success/20 text-success",
  Offline: "bg-danger/20 text-danger",
  Maintenance: "bg-warning/20 text-warning",
  Disabled: "bg-slate-300 text-slate-600 dark:bg-darkmode-400 dark:text-slate-300",
};

const ADD_FORM_DEFAULT = {
  name: "",
  type: DEVICE_TYPES[0],
  vendor: "",
  model: "",
  serial: "",
  ip: "",
  mac: "",
  location: "",
  installationDate: "",
  remarks: "",
};

const MAINTENANCE_FORM_DEFAULT = {
  deviceId: "",
  maintenanceDate: "",
  technician: "",
  reason: "",
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
  const [devices, setDevices] = useState(INITIAL_DEVICES);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [typeDraft, setTypeDraft] = useState("All Types");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [locationDraft, setLocationDraft] = useState("All Locations");
  const [vendorDraft, setVendorDraft] = useState("All Vendors");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    type: "All Types",
    status: "All Statuses",
    location: "All Locations",
    vendor: "All Vendors",
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState(ADD_FORM_DEFAULT);

  const [detailsDeviceId, setDetailsDeviceId] = useState(null);

  const [maintenanceModal, setMaintenanceModal] = useState(false);
  const [maintenanceForm, setMaintenanceForm] = useState(MAINTENANCE_FORM_DEFAULT);

  const [banner, setBanner] = useState(null);

  const showBanner = (message) => {
    setBanner(message);
    window.clearTimeout(showBanner._t);
    showBanner._t = window.setTimeout(() => setBanner(null), 3500);
  };

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      type: typeDraft,
      status: statusDraft,
      location: locationDraft,
      vendor: vendorDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setTypeDraft("All Types");
    setStatusDraft("All Statuses");
    setLocationDraft("All Locations");
    setVendorDraft("All Vendors");
    setAppliedFilters({
      search: "",
      type: "All Types",
      status: "All Statuses",
      location: "All Locations",
      vendor: "All Vendors",
    });
  };

  const filteredDevices = devices.filter((d) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      d.name.toLowerCase().includes(appliedFilters.search) ||
      d.id.toLowerCase().includes(appliedFilters.search) ||
      d.ip.toLowerCase().includes(appliedFilters.search) ||
      d.location.toLowerCase().includes(appliedFilters.search);

    const matchesType = appliedFilters.type === "All Types" || d.type === appliedFilters.type;

    const matchesStatus =
      appliedFilters.status === "All Statuses" || d.status === appliedFilters.status;

    const matchesLocation =
      appliedFilters.location === "All Locations" || d.location === appliedFilters.location;

    const matchesVendor =
      appliedFilters.vendor === "All Vendors" || d.vendor === appliedFilters.vendor;

    return matchesSearch && matchesType && matchesStatus && matchesLocation && matchesVendor;
  });

  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === "Online").length;
  const offlineDevices = devices.filter((d) => d.status === "Offline").length;
  const maintenanceDevices = devices.filter((d) => d.status === "Maintenance").length;
  const popLocations = devices.filter((d) => d.type === "POP").length;

  const detailsDevice = devices.find((d) => d.id === detailsDeviceId) || null;

  const openAddForm = () => {
    setAddForm(ADD_FORM_DEFAULT);
    setIsAddOpen(true);
  };
  const closeAddForm = () => setIsAddOpen(false);

  const handleSaveDevice = () => {
    if (!addForm.name.trim()) {
      closeAddForm();
      return;
    }
    const nextNumber =
      Math.max(...devices.map((d) => Number(d.id.replace("NET-", "")) || 0), 1000) + 1;
    const newDevice = {
      id: `NET-${nextNumber}`,
      name: addForm.name.trim(),
      type: addForm.type,
      vendor: addForm.vendor.trim() || "—",
      model: addForm.model.trim() || "—",
      serial: addForm.serial.trim() || "—",
      ip: addForm.ip.trim() || "—",
      mac: addForm.mac.trim() || "—",
      location: addForm.location.trim() || "—",
      installationDate: addForm.installationDate || "—",
      lastMaintenance: "—",
      technician: "—",
      remarks: addForm.remarks.trim() || "—",
      status: "Online",
    };
    setDevices((prev) => [newDevice, ...prev]);
    showBanner(`Device ${newDevice.id} added to the network.`);
    closeAddForm();
  };

  const openMaintenanceModal = (deviceId) => {
    setMaintenanceForm({ ...MAINTENANCE_FORM_DEFAULT, deviceId: deviceId || "" });
    setMaintenanceModal(true);
  };
  const closeMaintenanceModal = () => setMaintenanceModal(false);

  const handleScheduleMaintenance = () => {
    if (maintenanceForm.deviceId && maintenanceForm.maintenanceDate) {
      setDevices((prev) =>
        prev.map((d) =>
          d.id === maintenanceForm.deviceId
            ? {
                ...d,
                status: "Maintenance",
                technician: maintenanceForm.technician.trim() || d.technician,
              }
            : d
        )
      );
      showBanner(
        `Maintenance scheduled for ${maintenanceForm.deviceId} on ${maintenanceForm.maintenanceDate}.`
      );
    }
    closeMaintenanceModal();
  };

  const handleToggleStatus = (deviceId) => {
    setDevices((prev) =>
      prev.map((d) => {
        if (d.id !== deviceId) return d;
        return {
          ...d,
          status: d.status === "Disabled" ? "Online" : "Disabled",
        };
      })
    );
    const device = devices.find((d) => d.id === deviceId);
    const nextStatus = device?.status === "Disabled" ? "Online" : "Disabled";
    showBanner(`${deviceId} is now ${nextStatus}.`);
  };

  const handleViewConnectedEquipment = (deviceId) => {
    showBanner(`Opening connected equipment list for ${deviceId}.`);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Network</h2>
            <div className="text-slate-500 mt-1">
              Manage network devices, locations and infrastructure.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={openAddForm}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Network Device
            </button>
            <button
              type="button"
              onClick={() => openMaintenanceModal(null)}
              className="btn btn-outline-secondary"
            >
              <Lucide icon="Clock" className="w-4 h-4 mr-2" /> Maintenance Schedule
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
                placeholder="Search by Device Name, Device ID, IP Address, Location, POP Name or OLT Name"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Device Type</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={typeDraft}
                  onChange={(e) => setTypeDraft(e.target.value)}
                >
                  {TYPE_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value)}
                >
                  {STATUS_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Location</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={locationDraft}
                  onChange={(e) => setLocationDraft(e.target.value)}
                >
                  {LOCATION_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Vendor</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={vendorDraft}
                  onChange={(e) => setVendorDraft(e.target.value)}
                >
                  {VENDOR_FILTER_OPTIONS.map((option) => (
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
            <Lucide icon="Wifi" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">{totalDevices}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Devices</div>
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
              <div className="text-xl font-medium">{onlineDevices}</div>
              <div className="text-slate-500 text-xs mt-0.5">Online Devices</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-danger" />
            <div>
              <div className="text-xl font-medium">{offlineDevices}</div>
              <div className="text-slate-500 text-xs mt-0.5">Offline Devices</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="AlertTriangle"
              className="w-8 h-8 mr-4 flex-none text-warning"
            />
            <div>
              <div className="text-xl font-medium">{maintenanceDevices}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Maintenance Devices
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="MapPin" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">{popLocations}</div>
              <div className="text-slate-500 text-xs mt-0.5">POP Locations</div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Devices Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">Network Devices</h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredDevices.length} result
              {filteredDevices.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredDevices.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="Wifi" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">No network devices found.</div>
              <button
                type="button"
                onClick={openAddForm}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Network Device
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1360px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">DEVICE ID</th>
                    <th className="whitespace-nowrap">DEVICE NAME</th>
                    <th className="whitespace-nowrap">DEVICE TYPE</th>
                    <th className="whitespace-nowrap">VENDOR</th>
                    <th className="whitespace-nowrap">LOCATION</th>
                    <th className="whitespace-nowrap">IP ADDRESS</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="whitespace-nowrap">LAST MAINTENANCE</th>
                    <th className="text-center whitespace-nowrap min-w-[180px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.map((d) => (
                    <tr key={d.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">{d.id}</td>
                      <td className="whitespace-nowrap">{d.name}</td>
                      <td className="whitespace-nowrap">{d.type}</td>
                      <td className="whitespace-nowrap">{d.vendor}</td>
                      <td className="whitespace-nowrap">{d.location}</td>
                      <td className="whitespace-nowrap">{d.ip}</td>
                      <td className="w-36">
                        <div className="flex justify-center">
                          <StatusBadge status={d.status} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{d.lastMaintenance}</td>
                      <td className="table-report__action w-auto min-w-[180px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy
                            tag="a"
                            href=""
                            content="View Details"
                            onClick={(e) => {
                              e.preventDefault();
                              setDetailsDeviceId(d.id);
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
                            content="Schedule Maintenance"
                            onClick={(e) => {
                              e.preventDefault();
                              openMaintenanceModal(d.id);
                            }}
                          >
                            <Lucide
                              icon="Clock"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content={d.status === "Disabled" ? "Enable" : "Disable"}
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleStatus(d.id);
                            }}
                          >
                            <Lucide
                              icon="Power"
                              className={classnames(
                                "w-4 h-4 hover:text-primary",
                                d.status === "Disabled"
                                  ? "text-slate-400"
                                  : "text-success"
                              )}
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="View Connected Equipment"
                            onClick={(e) => {
                              e.preventDefault();
                              handleViewConnectedEquipment(d.id);
                            }}
                          >
                            <Lucide
                              icon="Package"
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
        {/* END: Devices Table */}
      </div>

      {/* BEGIN: Add Network Device Modal (UI only) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAddForm}></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Add Network Device</h2>
              <button
                type="button"
                onClick={closeAddForm}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Device Name</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Huawei MA5608T"
                  value={addForm.name}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Device Type</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addForm.type}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, type: e.target.value }))}
                >
                  {DEVICE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Vendor</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Huawei"
                  value={addForm.vendor}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, vendor: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Model</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. MA5608T"
                  value={addForm.model}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, model: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Serial Number</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="Optional"
                  value={addForm.serial}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, serial: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">IP Address</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 10.10.1.5"
                  value={addForm.ip}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, ip: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">MAC Address</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="Optional"
                  value={addForm.mac}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, mac: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">POP Location</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Gulshan POP"
                  value={addForm.location}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, location: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Installation Date</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={addForm.installationDate}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, installationDate: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Remarks</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={2}
                  placeholder="Optional note about this device"
                  value={addForm.remarks}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, remarks: e.target.value }))}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeAddForm}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDevice}
                className="btn btn-primary shadow-md"
              >
                Save Device
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Add Network Device Modal */}

      {/* BEGIN: Device Details Panel (UI only) */}
      {detailsDevice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDetailsDeviceId(null)}
          ></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Device Details</h2>
              <button
                type="button"
                onClick={() => setDetailsDeviceId(null)}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Device Name</div>
                <div className="font-medium">{detailsDevice.name}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Device ID</div>
                <div className="font-medium">{detailsDevice.id}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Vendor</div>
                <div className="font-medium">{detailsDevice.vendor}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Model</div>
                <div className="font-medium">{detailsDevice.model}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Serial Number</div>
                <div className="font-medium">{detailsDevice.serial}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">IP Address</div>
                <div className="font-medium">{detailsDevice.ip}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">MAC Address</div>
                <div className="font-medium">{detailsDevice.mac}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">POP Location</div>
                <div className="font-medium">{detailsDevice.location}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Installation Date</div>
                <div className="font-medium">{detailsDevice.installationDate}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Current Status</div>
                <StatusBadge status={detailsDevice.status} />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Last Maintenance Date</div>
                <div className="font-medium">{detailsDevice.lastMaintenance}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Assigned Technician</div>
                <div className="font-medium">{detailsDevice.technician}</div>
              </div>
              <div className="col-span-2">
                <div className="text-slate-500 text-xs">Remarks</div>
                <div className="font-medium">{detailsDevice.remarks}</div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDetailsDeviceId(null)}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = detailsDevice.id;
                  setDetailsDeviceId(null);
                  openMaintenanceModal(id);
                }}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Clock" className="w-4 h-4 mr-2" /> Schedule Maintenance
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Device Details Panel */}

      {/* BEGIN: Maintenance Scheduler Modal (UI only) */}
      {maintenanceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeMaintenanceModal}
          ></div>
          <div className="relative box w-full max-w-md p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Schedule Maintenance</h2>
              <button
                type="button"
                onClick={closeMaintenanceModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Device</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={maintenanceForm.deviceId}
                  onChange={(e) =>
                    setMaintenanceForm((prev) => ({
                      ...prev,
                      deviceId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select a device</option>
                  {devices.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.id} — {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Maintenance Date
                </label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={maintenanceForm.maintenanceDate}
                  onChange={(e) =>
                    setMaintenanceForm((prev) => ({
                      ...prev,
                      maintenanceDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Assigned Technician
                </label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Usman Khan"
                  value={maintenanceForm.technician}
                  onChange={(e) =>
                    setMaintenanceForm((prev) => ({
                      ...prev,
                      technician: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">Reason</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Routine inspection"
                  value={maintenanceForm.reason}
                  onChange={(e) =>
                    setMaintenanceForm((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">Remarks</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={2}
                  placeholder="Optional note"
                  value={maintenanceForm.remarks}
                  onChange={(e) =>
                    setMaintenanceForm((prev) => ({
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
                onClick={closeMaintenanceModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleScheduleMaintenance}
                className="btn btn-primary shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Maintenance Scheduler Modal */}
    </>
  );
}

export default Main;