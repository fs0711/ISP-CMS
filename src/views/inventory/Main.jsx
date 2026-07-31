import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder inventory data
const LOW_STOCK_THRESHOLD = 3;

const EQUIPMENT_TYPES = [
  "ONU",
  "Router",
  "Fiber Cable",
  "Fiber Box",
  "Splitter",
  "Switch",
  "Access Point",
  "Power Adapter",
  "Network Cable",
  "Other",
];

const STATUS_OPTIONS = [
  "Available",
  "Assigned",
  "In Stock",
  "Under Maintenance",
  "Damaged",
  "Lost",
];

const LOCATIONS = ["Main Warehouse", "Gulshan Store", "Korangi Store", "Field Team"];

const INITIAL_EQUIPMENT = [
  {
    id: "EQ-1001",
    type: "ONU",
    brand: "Huawei",
    model: "HG8245H",
    serial: "ONU-45879621",
    mac: "AC:DE:48:00:11:22",
    assignedSubscriber: "Ahmed Ali",
    assignedTechnician: "Usman Khan",
    location: "Field Team",
    status: "Assigned",
    purchaseDate: "12-Jan-2026",
    supplier: "Huawei Pakistan Distributors",
    purchasePrice: 4200,
    warrantyExpiry: "12-Jan-2028",
    installationDate: "15-Jan-2026",
    history: [
      { date: "12-Jan-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
      { date: "15-Jan-2026", subscriber: "Ahmed Ali", technician: "Usman Khan", action: "Assigned", remarks: "Installed at subscriber premises" },
    ],
  },
  {
    id: "EQ-1002",
    type: "Router",
    brand: "TP-Link",
    model: "Archer C6",
    serial: "RTR-11223344",
    mac: "B8:27:EB:00:33:44",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Main Warehouse",
    status: "Available",
    purchaseDate: "02-Mar-2026",
    supplier: "TP-Link Karachi Hub",
    purchasePrice: 3800,
    warrantyExpiry: "02-Mar-2028",
    installationDate: "—",
    history: [
      { date: "02-Mar-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
    ],
  },
  {
    id: "EQ-1003",
    type: "ONU",
    brand: "ZTE",
    model: "F609",
    serial: "ONU-98765432",
    mac: "AC:DE:48:00:55:66",
    assignedSubscriber: "Bilal Hussain",
    assignedTechnician: "Kamran Iqbal",
    location: "Field Team",
    status: "Assigned",
    purchaseDate: "20-Feb-2026",
    supplier: "ZTE Distribution Karachi",
    purchasePrice: 3900,
    warrantyExpiry: "20-Feb-2028",
    installationDate: "22-Feb-2026",
    history: [
      { date: "20-Feb-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
      { date: "22-Feb-2026", subscriber: "Bilal Hussain", technician: "Kamran Iqbal", action: "Assigned", remarks: "Fiber installation" },
    ],
  },
  {
    id: "EQ-1004",
    type: "Fiber Cable",
    brand: "Corning",
    model: "SMF-28e 2-Core",
    serial: "FC-55667788",
    mac: "—",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Korangi Store",
    status: "In Stock",
    purchaseDate: "10-Apr-2026",
    supplier: "Corning Cable Systems",
    purchasePrice: 1200,
    warrantyExpiry: "—",
    installationDate: "—",
    history: [
      { date: "10-Apr-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "500m reel purchased" },
    ],
  },
  {
    id: "EQ-1005",
    type: "Router",
    brand: "TP-Link",
    model: "Archer C6",
    serial: "RTR-22334455",
    mac: "B8:27:EB:00:77:88",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Main Warehouse",
    status: "Damaged",
    purchaseDate: "05-Jan-2026",
    supplier: "TP-Link Karachi Hub",
    purchasePrice: 3800,
    warrantyExpiry: "05-Jan-2028",
    installationDate: "—",
    history: [
      { date: "05-Jan-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
      { date: "18-Jul-2026", subscriber: "—", technician: "Bilal Sheikh", action: "Marked as Damaged", remarks: "Power surge damage, returned by technician" },
    ],
  },
  {
    id: "EQ-1006",
    type: "Access Point",
    brand: "Ubiquiti",
    model: "UAP-AC-LR",
    serial: "AP-33445566",
    mac: "24:5A:4C:00:99:11",
    assignedSubscriber: "Hina Farooq",
    assignedTechnician: "Usman Khan",
    location: "Field Team",
    status: "Assigned",
    purchaseDate: "15-May-2026",
    supplier: "Ubiquiti Store Pakistan",
    purchasePrice: 9500,
    warrantyExpiry: "15-May-2028",
    installationDate: "20-May-2026",
    history: [
      { date: "15-May-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
      { date: "20-May-2026", subscriber: "Hina Farooq", technician: "Usman Khan", action: "Assigned", remarks: "WiFi coverage extension" },
    ],
  },
  {
    id: "EQ-1007",
    type: "Splitter",
    brand: "FiberHome",
    model: "1x8 PLC Splitter",
    serial: "SPL-11002200",
    mac: "—",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Korangi Store",
    status: "In Stock",
    purchaseDate: "01-Jun-2026",
    supplier: "FiberHome Pakistan",
    purchasePrice: 850,
    warrantyExpiry: "—",
    installationDate: "—",
    history: [
      { date: "01-Jun-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "Bulk purchase, 20 units" },
    ],
  },
  {
    id: "EQ-1008",
    type: "Switch",
    brand: "TP-Link",
    model: "TL-SG1008D",
    serial: "SW-77889900",
    mac: "B8:27:EB:00:22:33",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Main Warehouse",
    status: "Under Maintenance",
    purchaseDate: "10-Mar-2026",
    supplier: "TP-Link Karachi Hub",
    purchasePrice: 4500,
    warrantyExpiry: "10-Mar-2028",
    installationDate: "—",
    history: [
      { date: "10-Mar-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
      { date: "10-Jul-2026", subscriber: "—", technician: "Waqar Ahmed", action: "Sent for Maintenance", remarks: "Port not working" },
    ],
  },
  {
    id: "EQ-1009",
    type: "Power Adapter",
    brand: "Generic",
    model: "12V 1A",
    serial: "PA-99001122",
    mac: "—",
    assignedSubscriber: "Sana Malik",
    assignedTechnician: "Bilal Sheikh",
    location: "Field Team",
    status: "Assigned",
    purchaseDate: "08-Jul-2026",
    supplier: "Local Electronics Market",
    purchasePrice: 350,
    warrantyExpiry: "08-Jan-2027",
    installationDate: "10-Jul-2026",
    history: [
      { date: "08-Jul-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "Replacement stock" },
      { date: "10-Jul-2026", subscriber: "Sana Malik", technician: "Bilal Sheikh", action: "Assigned", remarks: "Router adapter replacement" },
    ],
  },
  {
    id: "EQ-1010",
    type: "Network Cable",
    brand: "Belden",
    model: "Cat6 UTP 305m",
    serial: "NC-44556677",
    mac: "—",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Main Warehouse",
    status: "In Stock",
    purchaseDate: "22-Jun-2026",
    supplier: "Belden Cable Karachi",
    purchasePrice: 15000,
    warrantyExpiry: "—",
    installationDate: "—",
    history: [
      { date: "22-Jun-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "1 box purchased" },
    ],
  },
  {
    id: "EQ-1011",
    type: "ONU",
    brand: "Huawei",
    model: "HG8245H",
    serial: "ONU-11335577",
    mac: "AC:DE:48:00:88:99",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Gulshan Store",
    status: "Available",
    purchaseDate: "01-Jul-2026",
    supplier: "Huawei Pakistan Distributors",
    purchasePrice: 4200,
    warrantyExpiry: "01-Jul-2028",
    installationDate: "—",
    history: [
      { date: "01-Jul-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
    ],
  },
  {
    id: "EQ-1012",
    type: "Fiber Box",
    brand: "FiberHome",
    model: "Wall Mount FDB-4",
    serial: "FB-22446688",
    mac: "—",
    assignedSubscriber: "—",
    assignedTechnician: "—",
    location: "Korangi Store",
    status: "Lost",
    purchaseDate: "14-Feb-2026",
    supplier: "FiberHome Pakistan",
    purchasePrice: 1600,
    warrantyExpiry: "—",
    installationDate: "—",
    history: [
      { date: "14-Feb-2026", subscriber: "—", technician: "—", action: "Added to stock", remarks: "New purchase" },
      { date: "05-Jul-2026", subscriber: "—", technician: "Kamran Iqbal", action: "Marked as Lost", remarks: "Not returned after field visit" },
    ],
  },
];
// END: Placeholder inventory data

const TYPE_FILTER_OPTIONS = ["All Types", ...EQUIPMENT_TYPES];
const BRAND_FILTER_OPTIONS = [
  "All Brands",
  ...Array.from(new Set(INITIAL_EQUIPMENT.map((e) => e.brand))),
];
const STATUS_FILTER_OPTIONS = ["All Statuses", ...STATUS_OPTIONS];
const ASSIGNED_TO_FILTER_OPTIONS = [
  "All Assignees",
  ...Array.from(
    new Set(
      INITIAL_EQUIPMENT.filter((e) => e.assignedSubscriber !== "—").map(
        (e) => e.assignedSubscriber
      )
    )
  ),
];
const LOCATION_FILTER_OPTIONS = ["All Locations", ...LOCATIONS];

const STATUS_BADGE_CLASSES = {
  Available: "bg-success/20 text-success",
  Assigned: "bg-primary/20 text-primary",
  "In Stock": "bg-pending/20 text-pending",
  "Under Maintenance": "bg-warning/20 text-warning",
  Damaged: "bg-danger/20 text-danger",
  Lost: "bg-slate-300 text-slate-600 dark:bg-darkmode-400 dark:text-slate-300",
};

const ADD_FORM_DEFAULT = {
  type: EQUIPMENT_TYPES[0],
  brand: "",
  model: "",
  serial: "",
  mac: "",
  purchaseDate: "",
  supplier: "",
  purchasePrice: "",
  warrantyExpiry: "",
  location: LOCATIONS[0],
  remarks: "",
};

const ASSIGN_FORM_DEFAULT = {
  subscriber: "",
  technician: "",
  installationDate: "",
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

function LowStockBadge() {
  return (
    <div className="py-0.5 px-2 rounded-full text-[10px] font-medium inline-block whitespace-nowrap bg-danger/20 text-danger ml-2">
      Low Stock
    </div>
  );
}

function Main() {
  const [equipment, setEquipment] = useState(INITIAL_EQUIPMENT);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [typeDraft, setTypeDraft] = useState("All Types");
  const [brandDraft, setBrandDraft] = useState("All Brands");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [assignedDraft, setAssignedDraft] = useState("All Assignees");
  const [locationDraft, setLocationDraft] = useState("All Locations");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    type: "All Types",
    brand: "All Brands",
    status: "All Statuses",
    assigned: "All Assignees",
    location: "All Locations",
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState(ADD_FORM_DEFAULT);

  const [assignModal, setAssignModal] = useState({ open: false, equipmentId: null });
  const [assignForm, setAssignForm] = useState(ASSIGN_FORM_DEFAULT);

  const [detailsEquipmentId, setDetailsEquipmentId] = useState(null);

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
      brand: brandDraft,
      status: statusDraft,
      assigned: assignedDraft,
      location: locationDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setTypeDraft("All Types");
    setBrandDraft("All Brands");
    setStatusDraft("All Statuses");
    setAssignedDraft("All Assignees");
    setLocationDraft("All Locations");
    setAppliedFilters({
      search: "",
      type: "All Types",
      brand: "All Brands",
      status: "All Statuses",
      assigned: "All Assignees",
      location: "All Locations",
    });
  };

  // Available + In Stock count per equipment type, used for the Low Stock badge
  const stockCountByType = EQUIPMENT_TYPES.reduce((acc, type) => {
    acc[type] = equipment.filter(
      (e) => e.type === type && (e.status === "Available" || e.status === "In Stock")
    ).length;
    return acc;
  }, {});

  const isTypeLowStock = (type) => stockCountByType[type] < LOW_STOCK_THRESHOLD;

  const filteredEquipment = equipment.filter((e) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      e.serial.toLowerCase().includes(appliedFilters.search) ||
      e.type.toLowerCase().includes(appliedFilters.search) ||
      e.brand.toLowerCase().includes(appliedFilters.search) ||
      e.assignedSubscriber.toLowerCase().includes(appliedFilters.search) ||
      e.assignedTechnician.toLowerCase().includes(appliedFilters.search) ||
      e.id.toLowerCase().includes(appliedFilters.search);

    const matchesType = appliedFilters.type === "All Types" || e.type === appliedFilters.type;

    const matchesBrand =
      appliedFilters.brand === "All Brands" || e.brand === appliedFilters.brand;

    const matchesStatus =
      appliedFilters.status === "All Statuses" || e.status === appliedFilters.status;

    const matchesAssigned =
      appliedFilters.assigned === "All Assignees" ||
      e.assignedSubscriber === appliedFilters.assigned;

    const matchesLocation =
      appliedFilters.location === "All Locations" || e.location === appliedFilters.location;

    return (
      matchesSearch &&
      matchesType &&
      matchesBrand &&
      matchesStatus &&
      matchesAssigned &&
      matchesLocation
    );
  });

  const totalEquipment = equipment.length;
  const availableStock = equipment.filter(
    (e) => e.status === "Available" || e.status === "In Stock"
  ).length;
  const assignedEquipment = equipment.filter((e) => e.status === "Assigned").length;
  const damagedEquipment = equipment.filter((e) => e.status === "Damaged").length;
  const lowStockItems = EQUIPMENT_TYPES.filter((type) => isTypeLowStock(type)).length;

  const detailsEquipment = equipment.find((e) => e.id === detailsEquipmentId) || null;

  const openAddForm = () => {
    setAddForm(ADD_FORM_DEFAULT);
    setIsAddOpen(true);
  };
  const closeAddForm = () => setIsAddOpen(false);

  const handleSaveEquipment = () => {
    if (!addForm.brand.trim() || !addForm.serial.trim()) {
      closeAddForm();
      return;
    }
    const nextNumber =
      Math.max(...equipment.map((e) => Number(e.id.replace("EQ-", "")) || 0), 1000) + 1;
    const newItem = {
      id: `EQ-${nextNumber}`,
      type: addForm.type,
      brand: addForm.brand.trim(),
      model: addForm.model.trim() || "—",
      serial: addForm.serial.trim(),
      mac: addForm.mac.trim() || "—",
      assignedSubscriber: "—",
      assignedTechnician: "—",
      location: addForm.location,
      status: "In Stock",
      purchaseDate: addForm.purchaseDate || "—",
      supplier: addForm.supplier.trim() || "—",
      purchasePrice: Number(addForm.purchasePrice) || 0,
      warrantyExpiry: addForm.warrantyExpiry || "—",
      installationDate: "—",
      history: [
        {
          date: addForm.purchaseDate || "—",
          subscriber: "—",
          technician: "—",
          action: "Added to stock",
          remarks: addForm.remarks.trim() || "New purchase",
        },
      ],
    };
    setEquipment((prev) => [newItem, ...prev]);
    showBanner(`Equipment ${newItem.id} added to inventory.`);
    closeAddForm();
  };

  const openAssignModal = (equipmentId) => {
    setAssignForm(ASSIGN_FORM_DEFAULT);
    setAssignModal({ open: true, equipmentId });
  };
  const closeAssignModal = () => setAssignModal({ open: false, equipmentId: null });

  const handleAssignEquipment = () => {
    if (!assignModal.equipmentId) {
      closeAssignModal();
      return;
    }
    setEquipment((prev) =>
      prev.map((e) => {
        if (e.id !== assignModal.equipmentId) return e;
        return {
          ...e,
          assignedSubscriber: assignForm.subscriber.trim() || e.assignedSubscriber,
          assignedTechnician: assignForm.technician.trim() || e.assignedTechnician,
          installationDate: assignForm.installationDate || e.installationDate,
          location: "Field Team",
          status: "Assigned",
          history: [
            ...e.history,
            {
              date: assignForm.installationDate || "—",
              subscriber: assignForm.subscriber.trim() || "—",
              technician: assignForm.technician.trim() || "—",
              action: "Assigned",
              remarks: assignForm.remarks.trim() || "—",
            },
          ],
        };
      })
    );
    showBanner(`${assignModal.equipmentId} assigned successfully.`);
    closeAssignModal();
  };

  const handleReturnEquipment = (equipmentId) => {
    setEquipment((prev) =>
      prev.map((e) =>
        e.id === equipmentId
          ? {
              ...e,
              assignedSubscriber: "—",
              assignedTechnician: "—",
              location: "Main Warehouse",
              status: "In Stock",
              history: [
                ...e.history,
                {
                  date: "26-Jul-2026",
                  subscriber: e.assignedSubscriber,
                  technician: e.assignedTechnician,
                  action: "Returned",
                  remarks: "Returned to warehouse",
                },
              ],
            }
          : e
      )
    );
    showBanner(`${equipmentId} returned to stock.`);
  };

  const handleMarkDamaged = (equipmentId) => {
    setEquipment((prev) =>
      prev.map((e) =>
        e.id === equipmentId
          ? {
              ...e,
              status: "Damaged",
              history: [
                ...e.history,
                {
                  date: "26-Jul-2026",
                  subscriber: e.assignedSubscriber,
                  technician: e.assignedTechnician,
                  action: "Marked as Damaged",
                  remarks: "Reported damaged",
                },
              ],
            }
          : e
      )
    );
    showBanner(`${equipmentId} marked as damaged.`);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Inventory</h2>
            <div className="text-slate-500 mt-1">
              Manage ISP equipment, stock and assigned devices.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={openAddForm}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Equipment
            </button>
            <button
              type="button"
              onClick={() => openAssignModal(null)}
              className="btn btn-outline-secondary"
            >
              <Lucide icon="Send" className="w-4 h-4 mr-2" /> Assign Equipment
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export Inventory
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
                placeholder="Search by Serial Number, Equipment Name, Subscriber, Technician or Brand"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Equipment Type</label>
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
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Brand</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={brandDraft}
                  onChange={(e) => setBrandDraft(e.target.value)}
                >
                  {BRAND_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
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
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Assigned To</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={assignedDraft}
                  onChange={(e) => setAssignedDraft(e.target.value)}
                >
                  {ASSIGNED_TO_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Location / Store</label>
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
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Package" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">{totalEquipment}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Equipment</div>
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
              <div className="text-xl font-medium">{availableStock}</div>
              <div className="text-slate-500 text-xs mt-0.5">Available Stock</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="User" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">{assignedEquipment}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Assigned Equipment
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-danger" />
            <div>
              <div className="text-xl font-medium">{damagedEquipment}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Damaged Equipment
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="AlertTriangle"
              className="w-8 h-8 mr-4 flex-none text-warning"
            />
            <div>
              <div className="text-xl font-medium">{lowStockItems}</div>
              <div className="text-slate-500 text-xs mt-0.5">Low Stock Items</div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Inventory Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">Equipment Records</h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredEquipment.length} result
              {filteredEquipment.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredEquipment.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="Package" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">No equipment found.</div>
              <button
                type="button"
                onClick={openAddForm}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Equipment
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1400px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">EQUIPMENT ID</th>
                    <th className="whitespace-nowrap">EQUIPMENT TYPE</th>
                    <th className="whitespace-nowrap">BRAND</th>
                    <th className="whitespace-nowrap">MODEL</th>
                    <th className="whitespace-nowrap">SERIAL NUMBER</th>
                    <th className="whitespace-nowrap">ASSIGNED TO</th>
                    <th className="whitespace-nowrap">CURRENT LOCATION</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="whitespace-nowrap">PURCHASE DATE</th>
                    <th className="text-center whitespace-nowrap min-w-[200px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEquipment.map((e) => (
                    <tr key={e.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">{e.id}</td>
                      <td className="whitespace-nowrap">
                        <div className="flex items-center">
                          {e.type}
                          {isTypeLowStock(e.type) && <LowStockBadge />}
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{e.brand}</td>
                      <td className="whitespace-nowrap">{e.model}</td>
                      <td className="whitespace-nowrap">{e.serial}</td>
                      <td className="whitespace-nowrap">
                        {e.assignedSubscriber !== "—"
                          ? e.assignedSubscriber
                          : e.assignedTechnician !== "—"
                          ? e.assignedTechnician
                          : "—"}
                      </td>
                      <td className="whitespace-nowrap">{e.location}</td>
                      <td className="w-40">
                        <div className="flex justify-center">
                          <StatusBadge status={e.status} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{e.purchaseDate}</td>
                      <td className="table-report__action w-auto min-w-[200px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy
                            tag="a"
                            href=""
                            content="View Details"
                            onClick={(e2) => {
                              e2.preventDefault();
                              setDetailsEquipmentId(e.id);
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
                            content="Assign Equipment"
                            onClick={(e2) => {
                              e2.preventDefault();
                              openAssignModal(e.id);
                            }}
                          >
                            <Lucide
                              icon="Send"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Return Equipment"
                            onClick={(e2) => {
                              e2.preventDefault();
                              handleReturnEquipment(e.id);
                            }}
                          >
                            <Lucide
                              icon="RotateCcw"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Mark as Damaged"
                            onClick={(e2) => {
                              e2.preventDefault();
                              handleMarkDamaged(e.id);
                            }}
                          >
                            <Lucide
                              icon="AlertTriangle"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="View Assignment History"
                            onClick={(e2) => {
                              e2.preventDefault();
                              setDetailsEquipmentId(e.id);
                            }}
                          >
                            <Lucide
                              icon="Clock"
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
        {/* END: Inventory Table */}
      </div>

      {/* BEGIN: Add Equipment Modal (UI only) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAddForm}></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Add Equipment</h2>
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
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Equipment Type</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addForm.type}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, type: e.target.value }))}
                >
                  {EQUIPMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Brand</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Huawei"
                  value={addForm.brand}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, brand: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Model</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. HG8245H"
                  value={addForm.model}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, model: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Serial Number</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. ONU-45879621"
                  value={addForm.serial}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, serial: e.target.value }))}
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
                <label className="text-xs text-slate-500">Purchase Date</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={addForm.purchaseDate}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, purchaseDate: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Supplier</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="Optional"
                  value={addForm.supplier}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, supplier: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Purchase Price (PKR)</label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 4200"
                  value={addForm.purchasePrice}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, purchasePrice: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Warranty Expiry</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={addForm.warrantyExpiry}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, warrantyExpiry: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Location</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addForm.location}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, location: e.target.value }))}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Remarks</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={2}
                  placeholder="Optional note about this equipment"
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
                onClick={handleSaveEquipment}
                className="btn btn-primary shadow-md"
              >
                Save Equipment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Add Equipment Modal */}

      {/* BEGIN: Assign Equipment Modal (UI only) */}
      {assignModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAssignModal}></div>
          <div className="relative box w-full max-w-md p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Assign Equipment</h2>
              <button
                type="button"
                onClick={closeAssignModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Subscriber</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Ahmed Ali"
                  value={assignForm.subscriber}
                  onChange={(e) =>
                    setAssignForm((prev) => ({ ...prev, subscriber: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Technician</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Usman Khan"
                  value={assignForm.technician}
                  onChange={(e) =>
                    setAssignForm((prev) => ({ ...prev, technician: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Installation Date</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={assignForm.installationDate}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      installationDate: e.target.value,
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
                  value={assignForm.remarks}
                  onChange={(e) =>
                    setAssignForm((prev) => ({ ...prev, remarks: e.target.value }))
                  }
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeAssignModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssignEquipment}
                className="btn btn-primary shadow-md"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Assign Equipment Modal */}

      {/* BEGIN: Equipment Details Panel (UI only) */}
      {detailsEquipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDetailsEquipmentId(null)}
          ></div>
          <div className="relative box w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Equipment Details</h2>
              <button
                type="button"
                onClick={() => setDetailsEquipmentId(null)}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Equipment ID</div>
                <div className="font-medium">{detailsEquipment.id}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Equipment Type</div>
                <div className="font-medium">{detailsEquipment.type}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Brand</div>
                <div className="font-medium">{detailsEquipment.brand}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Model</div>
                <div className="font-medium">{detailsEquipment.model}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Serial Number</div>
                <div className="font-medium">{detailsEquipment.serial}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">MAC Address</div>
                <div className="font-medium">{detailsEquipment.mac}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Purchase Date</div>
                <div className="font-medium">{detailsEquipment.purchaseDate}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Supplier</div>
                <div className="font-medium">{detailsEquipment.supplier}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Purchase Price</div>
                <div className="font-medium">
                  PKR {detailsEquipment.purchasePrice.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Warranty Expiry</div>
                <div className="font-medium">{detailsEquipment.warrantyExpiry}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Current Status</div>
                <StatusBadge status={detailsEquipment.status} />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Current Location</div>
                <div className="font-medium">{detailsEquipment.location}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Assigned Subscriber</div>
                <div className="font-medium">{detailsEquipment.assignedSubscriber}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Assigned Technician</div>
                <div className="font-medium">{detailsEquipment.assignedTechnician}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Installation Date</div>
                <div className="font-medium">{detailsEquipment.installationDate}</div>
              </div>
            </div>

            {/* Assignment History */}
            <div className="mt-6 border-t border-slate-200/60 dark:border-darkmode-400 pt-4">
              <div className="text-sm font-medium mb-2">Assignment History</div>
              <div className="w-full overflow-x-auto">
                <table className="table table-report w-full min-w-[560px]">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap">DATE</th>
                      <th className="whitespace-nowrap">SUBSCRIBER</th>
                      <th className="whitespace-nowrap">TECHNICIAN</th>
                      <th className="whitespace-nowrap">ACTION</th>
                      <th className="whitespace-nowrap">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailsEquipment.history.map((h, idx) => (
                      <tr key={idx}>
                        <td className="whitespace-nowrap">{h.date}</td>
                        <td className="whitespace-nowrap">{h.subscriber}</td>
                        <td className="whitespace-nowrap">{h.technician}</td>
                        <td className="whitespace-nowrap">{h.action}</td>
                        <td className="whitespace-nowrap">{h.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDetailsEquipmentId(null)}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = detailsEquipment.id;
                  setDetailsEquipmentId(null);
                  openAssignModal(id);
                }}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Send" className="w-4 h-4 mr-2" /> Assign Equipment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Equipment Details Panel */}
    </>
  );
}

export default Main;