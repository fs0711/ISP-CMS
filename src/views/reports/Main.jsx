import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// =====================================================================
// BEGIN: Report catalog (categories -> report names)
// =====================================================================
const REPORT_CATALOG = {
  Subscribers: [
    "Active Subscribers",
    "Inactive Subscribers",
    "New Connections",
    "Disconnected Subscribers",
    "Package Wise Subscribers",
    "Area Wise Subscribers",
  ],
  Billing: [
    "Monthly Billing",
    "Outstanding Bills",
    "Paid Bills",
    "Overdue Bills",
    "Tax Summary",
  ],
  Payments: [
    "Daily Collection",
    "Monthly Collection",
    "Payment History",
    "Collection by Employee",
    "Collection by Reseller",
  ],
  Invoices: [
    "Generated Invoices",
    "Paid Invoices",
    "Pending Invoices",
    "Cancelled Invoices",
  ],
  "Support Tickets": [
    "Open Tickets",
    "Closed Tickets",
    "Technician Performance",
    "Complaint Categories",
    "Average Resolution Time",
  ],
  Inventory: [
    "Available Equipment",
    "Assigned Equipment",
    "Damaged Equipment",
    "Low Stock",
    "Warranty Expiry",
  ],
  Employees: [
    "Employee List",
    "Technician Workload",
    "Assigned Installations",
    "Assigned Tickets",
  ],
  "Resellers / LCO": [],
  Network: [],
};

const CATEGORY_ICONS = {
  Subscribers: "Users",
  Billing: "Wallet",
  Payments: "Download",
  Invoices: "FileText",
  "Support Tickets": "LifeBuoy",
  Inventory: "Package",
  Employees: "Shield",
  "Resellers / LCO": "Users",
  Network: "Wifi",
};

const CATEGORIES = Object.keys(REPORT_CATALOG);
// END: Report catalog
// =====================================================================

// =====================================================================
// BEGIN: Dummy data (realistic Pakistani ISP examples)
// =====================================================================
const AREAS = [
  "Gulshan-e-Iqbal",
  "DHA Phase 5",
  "North Nazimabad",
  "Clifton",
  "Malir",
  "Korangi",
  "Gulistan-e-Johar",
];

const PACKAGES = [
  "10 Mbps Home",
  "20 Mbps Home",
  "50 Mbps Home",
  "100 Mbps Business",
  "20 Mbps Student",
];

const RESELLERS = ["Al-Noor Networks", "City Link LCO", "Fast Cable Services"];

const EMPLOYEE_NAMES = [
  "Ahmed Khan",
  "Bilal Hussain",
  "Sana Malik",
  "Usman Khan",
  "Hina Farooq",
];

const SUBSCRIBER_NAMES = [
  "Ahmed Ali",
  "Fatima Sheikh",
  "Muhammad Bilal",
  "Ayesha Siddiqui",
  "Kashif Raza",
  "Sara Aslam",
  "Imran Qureshi",
  "Mariam Yousaf",
  "Tariq Mehmood",
  "Nida Aziz",
  "Zeeshan Baig",
  "Rabia Naeem",
];

function pick(arr, i) {
  return arr[i % arr.length];
}

const MONTH_MAP = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

// Parses dummy-data dates like "26-Jul-2026" into a real Date; returns null if unparsable.
function parseDisplayDate(value) {
  if (typeof value !== "string") return null;
  const match = value.match(/^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/);
  if (!match) return null;
  const [, day, monAbbr, year] = match;
  const month = MONTH_MAP[monAbbr];
  if (month === undefined) return null;
  return new Date(Number(year), month, Number(day));
}

// Returns true if any date-like field on the row falls within [from, to] (inclusive).
// Rows with no parsable date field, or when no range is set, pass through unaffected.
function rowMatchesDateRange(row, dateFrom, dateTo) {
  if (!dateFrom && !dateTo) return true;
  const dateValues = Object.values(row).map(parseDisplayDate).filter(Boolean);
  if (dateValues.length === 0) return true;
  const fromDate = dateFrom ? new Date(dateFrom) : null;
  const toDate = dateTo ? new Date(dateTo) : null;
  return dateValues.some((d) => {
    if (fromDate && d < fromDate) return false;
    if (toDate && d > toDate) return false;
    return true;
  });
}

// --- Subscribers -------------------------------------------------------
const SUBSCRIBER_ROWS = SUBSCRIBER_NAMES.map((name, i) => {
  const active = i % 4 !== 0;
  return {
    id: `SUB-${1000 + i}`,
    subscriberName: name,
    package: pick(PACKAGES, i),
    area: pick(AREAS, i),
    monthlyBill: [1500, 2000, 2500, 4500, 1200][i % 5],
    status: active ? "Active" : "Inactive",
    connectionDate: `0${(i % 9) + 1}-${["Jan", "Feb", "Mar", "Apr", "May", "Jun"][i % 6]}-2025`,
    disconnectionDate: active ? "—" : `1${i % 9}-Jul-2026`,
  };
});

// --- Billing -------------------------------------------------------------
const BILLING_ROWS = SUBSCRIBER_NAMES.map((name, i) => {
  const amount = [1500, 2000, 2500, 4500, 1200][i % 5];
  const tax = Math.round(amount * 0.03);
  const statusOptions = ["Paid", "Outstanding", "Overdue", "Paid", "Overdue"];
  return {
    id: `BILL-${5000 + i}`,
    subscriberName: name,
    package: pick(PACKAGES, i),
    amount,
    tax,
    total: amount + tax,
    status: pick(statusOptions, i),
    dueDate: `0${(i % 9) + 1}-Jul-2026`,
    month: "Jul-2026",
  };
});

// --- Payments -------------------------------------------------------------
const PAYMENT_METHODS = ["Cash", "Bank Transfer", "JazzCash", "Easypaisa"];
const PAYMENT_ROWS = SUBSCRIBER_NAMES.map((name, i) => ({
  id: `PAY-${7000 + i}`,
  subscriberName: name,
  amount: [1500, 2000, 2500, 4500, 1200][i % 5],
  method: pick(PAYMENT_METHODS, i),
  collectedBy: pick(EMPLOYEE_NAMES, i),
  collectedByReseller: pick(RESELLERS, i),
  date: `2${i % 6}-Jul-2026`,
}));

// --- Invoices --------------------------------------------------------------
const INVOICE_ROWS = SUBSCRIBER_NAMES.map((name, i) => ({
  id: `INV-${9000 + i}`,
  subscriberName: name,
  amount: [1500, 2000, 2500, 4500, 1200][i % 5],
  issueDate: `0${(i % 9) + 1}-Jul-2026`,
  dueDate: `1${(i % 9)}-Jul-2026`,
  status: pick(["Paid", "Pending", "Generated", "Cancelled", "Paid"], i),
}));

// --- Support Tickets ---------------------------------------------------
const TICKET_CATEGORIES = [
  "No Internet",
  "Slow Speed",
  "Billing Query",
  "Equipment Fault",
  "New Connection Request",
];
const TICKET_ROWS = SUBSCRIBER_NAMES.map((name, i) => ({
  id: `TCK-${3000 + i}`,
  subscriberName: name,
  category: pick(TICKET_CATEGORIES, i),
  assignedTo: pick(EMPLOYEE_NAMES, i),
  status: i % 3 === 0 ? "Open" : "Closed",
  openedDate: `1${i % 9}-Jul-2026`,
  resolutionHours: (i % 6) + 1,
}));

// --- Inventory -----------------------------------------------------------
const EQUIPMENT_NAMES = [
  "ONU Device",
  "Wi-Fi Router",
  "Fiber Patch Cord",
  "Splitter 1x8",
  "OLT Card",
];
const INVENTORY_ROWS = EQUIPMENT_NAMES.map((item, i) => ({
  id: `INVT-${100 + i}`,
  itemName: item,
  category: i % 2 === 0 ? "Network Equipment" : "Consumer Premises Equipment",
  status: pick(["Available", "Assigned", "Damaged", "Available"], i),
  assignedTo: i % 2 === 0 ? "—" : pick(EMPLOYEE_NAMES, i),
  quantity: [50, 30, 200, 15, 4][i % 5],
  warrantyExpiry: `2${(i % 8) + 1}-Dec-2026`,
})).concat(
  SUBSCRIBER_NAMES.slice(0, 5).map((name, i) => ({
    id: `INVT-${200 + i}`,
    itemName: pick(EQUIPMENT_NAMES, i),
    category: "Consumer Premises Equipment",
    status: "Assigned",
    assignedTo: name,
    quantity: 1,
    warrantyExpiry: `1${i}-Nov-2026`,
  }))
);

// --- Employees -------------------------------------------------------------
const EMPLOYEE_ROWS = EMPLOYEE_NAMES.map((name, i) => ({
  id: `EMP-${10 + i}`,
  employeeName: name,
  department: pick(["Billing", "Technical", "Support", "Management"], i),
  role: pick(["Billing Staff", "Technician", "Support Staff", "Manager"], i),
  assignedTasks: (i % 5) + 1,
  status: "Active",
}));
// END: Dummy data
// =====================================================================

// =====================================================================
// BEGIN: Report definitions (columns + row source + filters/status)
// =====================================================================
function buildReportDefinition(reportName) {
  switch (reportName) {
    case "Active Subscribers":
      return {
        category: "Subscribers",
        columns: [
          { key: "id", label: "Subscriber ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "package", label: "Package" },
          { key: "area", label: "Area" },
          { key: "monthlyBill", label: "Monthly Bill (PKR)" },
          { key: "status", label: "Status" },
        ],
        rows: SUBSCRIBER_ROWS.filter((r) => r.status === "Active"),
      };
    case "Inactive Subscribers":
      return {
        category: "Subscribers",
        columns: [
          { key: "id", label: "Subscriber ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "package", label: "Package" },
          { key: "area", label: "Area" },
          { key: "disconnectionDate", label: "Disconnection Date" },
          { key: "status", label: "Status" },
        ],
        rows: SUBSCRIBER_ROWS.filter((r) => r.status === "Inactive"),
      };
    case "New Connections":
      return {
        category: "Subscribers",
        columns: [
          { key: "id", label: "Subscriber ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "package", label: "Package" },
          { key: "area", label: "Area" },
          { key: "connectionDate", label: "Connection Date" },
        ],
        rows: SUBSCRIBER_ROWS.slice(0, 6),
      };
    case "Disconnected Subscribers":
      return {
        category: "Subscribers",
        columns: [
          { key: "id", label: "Subscriber ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "package", label: "Package" },
          { key: "area", label: "Area" },
          { key: "disconnectionDate", label: "Disconnection Date" },
        ],
        rows: SUBSCRIBER_ROWS.filter((r) => r.status === "Inactive"),
      };
    case "Package Wise Subscribers":
      return {
        category: "Subscribers",
        columns: [
          { key: "package", label: "Package" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "area", label: "Area" },
          { key: "monthlyBill", label: "Monthly Bill (PKR)" },
          { key: "status", label: "Status" },
        ],
        rows: [...SUBSCRIBER_ROWS].sort((a, b) => a.package.localeCompare(b.package)),
      };
    case "Area Wise Subscribers":
      return {
        category: "Subscribers",
        columns: [
          { key: "area", label: "Area" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "package", label: "Package" },
          { key: "status", label: "Status" },
        ],
        rows: [...SUBSCRIBER_ROWS].sort((a, b) => a.area.localeCompare(b.area)),
      };

    case "Monthly Billing":
      return {
        category: "Billing",
        columns: [
          { key: "id", label: "Bill ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "package", label: "Package" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "tax", label: "Tax (PKR)" },
          { key: "total", label: "Total (PKR)" },
          { key: "month", label: "Month" },
          { key: "status", label: "Status" },
        ],
        rows: BILLING_ROWS,
      };
    case "Outstanding Bills":
      return {
        category: "Billing",
        columns: [
          { key: "id", label: "Bill ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "total", label: "Total (PKR)" },
          { key: "dueDate", label: "Due Date" },
          { key: "status", label: "Status" },
        ],
        rows: BILLING_ROWS.filter((r) => r.status === "Outstanding"),
      };
    case "Paid Bills":
      return {
        category: "Billing",
        columns: [
          { key: "id", label: "Bill ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "total", label: "Total (PKR)" },
          { key: "month", label: "Month" },
          { key: "status", label: "Status" },
        ],
        rows: BILLING_ROWS.filter((r) => r.status === "Paid"),
      };
    case "Overdue Bills":
      return {
        category: "Billing",
        columns: [
          { key: "id", label: "Bill ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "total", label: "Total (PKR)" },
          { key: "dueDate", label: "Due Date" },
          { key: "status", label: "Status" },
        ],
        rows: BILLING_ROWS.filter((r) => r.status === "Overdue"),
      };
    case "Tax Summary":
      return {
        category: "Billing",
        columns: [
          { key: "id", label: "Bill ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "tax", label: "Tax (PKR)" },
          { key: "month", label: "Month" },
        ],
        rows: BILLING_ROWS,
      };

    case "Daily Collection":
      return {
        category: "Payments",
        columns: [
          { key: "id", label: "Payment ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "method", label: "Payment Method" },
          { key: "date", label: "Date" },
        ],
        rows: PAYMENT_ROWS,
      };
    case "Monthly Collection":
      return {
        category: "Payments",
        columns: [
          { key: "id", label: "Payment ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "method", label: "Payment Method" },
        ],
        rows: PAYMENT_ROWS,
      };
    case "Payment History":
      return {
        category: "Payments",
        columns: [
          { key: "id", label: "Payment ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "method", label: "Payment Method" },
          { key: "date", label: "Date" },
        ],
        rows: PAYMENT_ROWS,
      };
    case "Collection by Employee":
      return {
        category: "Payments",
        columns: [
          { key: "collectedBy", label: "Employee" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "date", label: "Date" },
        ],
        rows: [...PAYMENT_ROWS].sort((a, b) => a.collectedBy.localeCompare(b.collectedBy)),
      };
    case "Collection by Reseller":
      return {
        category: "Payments",
        columns: [
          { key: "collectedByReseller", label: "Reseller / LCO" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "date", label: "Date" },
        ],
        rows: [...PAYMENT_ROWS].sort((a, b) =>
          a.collectedByReseller.localeCompare(b.collectedByReseller)
        ),
      };

    case "Generated Invoices":
      return {
        category: "Invoices",
        columns: [
          { key: "id", label: "Invoice #" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "issueDate", label: "Issue Date" },
          { key: "status", label: "Status" },
        ],
        rows: INVOICE_ROWS,
      };
    case "Paid Invoices":
      return {
        category: "Invoices",
        columns: [
          { key: "id", label: "Invoice #" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "issueDate", label: "Issue Date" },
        ],
        rows: INVOICE_ROWS.filter((r) => r.status === "Paid"),
      };
    case "Pending Invoices":
      return {
        category: "Invoices",
        columns: [
          { key: "id", label: "Invoice #" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "dueDate", label: "Due Date" },
        ],
        rows: INVOICE_ROWS.filter((r) => r.status === "Pending"),
      };
    case "Cancelled Invoices":
      return {
        category: "Invoices",
        columns: [
          { key: "id", label: "Invoice #" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "amount", label: "Amount (PKR)" },
          { key: "issueDate", label: "Issue Date" },
        ],
        rows: INVOICE_ROWS.filter((r) => r.status === "Cancelled"),
      };

    case "Open Tickets":
      return {
        category: "Support Tickets",
        columns: [
          { key: "id", label: "Ticket ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "category", label: "Category" },
          { key: "assignedTo", label: "Assigned To" },
          { key: "openedDate", label: "Opened Date" },
        ],
        rows: TICKET_ROWS.filter((r) => r.status === "Open"),
      };
    case "Closed Tickets":
      return {
        category: "Support Tickets",
        columns: [
          { key: "id", label: "Ticket ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "category", label: "Category" },
          { key: "assignedTo", label: "Assigned To" },
          { key: "resolutionHours", label: "Resolution Time (hrs)" },
        ],
        rows: TICKET_ROWS.filter((r) => r.status === "Closed"),
      };
    case "Technician Performance":
      return {
        category: "Support Tickets",
        columns: [
          { key: "assignedTo", label: "Technician" },
          { key: "id", label: "Ticket ID" },
          { key: "status", label: "Status" },
          { key: "resolutionHours", label: "Resolution Time (hrs)" },
        ],
        rows: [...TICKET_ROWS].sort((a, b) => a.assignedTo.localeCompare(b.assignedTo)),
      };
    case "Complaint Categories":
      return {
        category: "Support Tickets",
        columns: [
          { key: "category", label: "Category" },
          { key: "id", label: "Ticket ID" },
          { key: "subscriberName", label: "Subscriber" },
          { key: "status", label: "Status" },
        ],
        rows: [...TICKET_ROWS].sort((a, b) => a.category.localeCompare(b.category)),
      };
    case "Average Resolution Time":
      return {
        category: "Support Tickets",
        columns: [
          { key: "id", label: "Ticket ID" },
          { key: "category", label: "Category" },
          { key: "assignedTo", label: "Technician" },
          { key: "resolutionHours", label: "Resolution Time (hrs)" },
        ],
        rows: TICKET_ROWS.filter((r) => r.status === "Closed"),
      };

    case "Available Equipment":
      return {
        category: "Inventory",
        columns: [
          { key: "id", label: "Item ID" },
          { key: "itemName", label: "Item" },
          { key: "category", label: "Category" },
          { key: "quantity", label: "Quantity" },
        ],
        rows: INVENTORY_ROWS.filter((r) => r.status === "Available"),
      };
    case "Assigned Equipment":
      return {
        category: "Inventory",
        columns: [
          { key: "id", label: "Item ID" },
          { key: "itemName", label: "Item" },
          { key: "assignedTo", label: "Assigned To" },
        ],
        rows: INVENTORY_ROWS.filter((r) => r.status === "Assigned"),
      };
    case "Damaged Equipment":
      return {
        category: "Inventory",
        columns: [
          { key: "id", label: "Item ID" },
          { key: "itemName", label: "Item" },
          { key: "category", label: "Category" },
          { key: "quantity", label: "Quantity" },
        ],
        rows: INVENTORY_ROWS.filter((r) => r.status === "Damaged"),
      };
    case "Low Stock":
      return {
        category: "Inventory",
        columns: [
          { key: "id", label: "Item ID" },
          { key: "itemName", label: "Item" },
          { key: "quantity", label: "Quantity" },
        ],
        rows: INVENTORY_ROWS.filter((r) => r.quantity <= 15),
      };
    case "Warranty Expiry":
      return {
        category: "Inventory",
        columns: [
          { key: "id", label: "Item ID" },
          { key: "itemName", label: "Item" },
          { key: "assignedTo", label: "Assigned To" },
          { key: "warrantyExpiry", label: "Warranty Expiry" },
        ],
        rows: [...INVENTORY_ROWS].sort((a, b) => a.warrantyExpiry.localeCompare(b.warrantyExpiry)),
      };

    case "Employee List":
      return {
        category: "Employees",
        columns: [
          { key: "id", label: "Employee ID" },
          { key: "employeeName", label: "Employee" },
          { key: "department", label: "Department" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status" },
        ],
        rows: EMPLOYEE_ROWS,
      };
    case "Technician Workload":
      return {
        category: "Employees",
        columns: [
          { key: "employeeName", label: "Technician" },
          { key: "assignedTasks", label: "Assigned Tasks" },
        ],
        rows: EMPLOYEE_ROWS.filter((r) => r.role === "Technician"),
      };
    case "Assigned Installations":
      return {
        category: "Employees",
        columns: [
          { key: "employeeName", label: "Employee" },
          { key: "department", label: "Department" },
          { key: "assignedTasks", label: "Assigned Installations" },
        ],
        rows: EMPLOYEE_ROWS,
      };
    case "Assigned Tickets":
      return {
        category: "Employees",
        columns: [
          { key: "employeeName", label: "Employee" },
          { key: "assignedTasks", label: "Assigned Tickets" },
        ],
        rows: EMPLOYEE_ROWS,
      };

    default:
      return { category: "", columns: [], rows: [] };
  }
}
// END: Report definitions
// =====================================================================

const STATUS_OPTIONS = [
  "Active",
  "Inactive",
  "Paid",
  "Outstanding",
  "Overdue",
  "Open",
  "Closed",
  "Pending",
  "Generated",
  "Cancelled",
  "Available",
  "Assigned",
  "Damaged",
];

const FILTERS_DEFAULT = {
  reportType: "",
  dateFrom: "",
  dateTo: "",
  subscriber: "All Subscribers",
  package: "All Packages",
  reseller: "All Resellers",
  employee: "All Employees",
  status: "All Statuses",
  area: "All Areas",
};

const PAGE_SIZE = 8;

function StatusBadge({ status }) {
  const positive = ["Active", "Paid", "Closed", "Available", "Generated"];
  const negative = ["Inactive", "Overdue", "Damaged", "Cancelled"];
  const classesFor = positive.includes(status)
    ? "bg-success/20 text-success"
    : negative.includes(status)
    ? "bg-danger/20 text-danger"
    : "bg-pending/20 text-pending";
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        classesFor
      )}
    >
      {status}
    </div>
  );
}

function Main() {
  const [activeCategory, setActiveCategory] = useState("Subscribers");
  const [filters, setFilters] = useState(FILTERS_DEFAULT);

  const [generatedReport, setGeneratedReport] = useState(null);
  const [reportsGeneratedToday, setReportsGeneratedToday] = useState(14);
  const [banner, setBanner] = useState(null);

  const [resultSearch, setResultSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(1);

  const showBanner = (message) => {
    setBanner(message);
    window.clearTimeout(showBanner._t);
    showBanner._t = window.setTimeout(() => setBanner(null), 3000);
  };

  // BEGIN: Summary card values (from underlying dummy data)
  const activeSubscribersCount = SUBSCRIBER_ROWS.filter((r) => r.status === "Active").length;
  const pendingPaymentsCount = BILLING_ROWS.filter(
    (r) => r.status === "Outstanding" || r.status === "Overdue"
  ).length;
  const openTicketsCount = TICKET_ROWS.filter((r) => r.status === "Open").length;
  const inventoryItemsCount = INVENTORY_ROWS.reduce((sum, r) => sum + r.quantity, 0);
  // END: Summary card values

  const handleSelectReport = (category, reportName) => {
    setActiveCategory(category);
    setFilters((prev) => ({ ...prev, reportType: reportName }));
  };

  const handleReset = () => {
    setFilters(FILTERS_DEFAULT);
    setGeneratedReport(null);
    setResultSearch("");
    setSortConfig({ key: null, direction: "asc" });
    setPage(1);
  };

  const handleGenerate = () => {
    if (!filters.reportType) {
      showBanner("Please select a report first.");
      return;
    }
    const definition = buildReportDefinition(filters.reportType);

    let rows = definition.rows;

    if (filters.status !== "All Statuses") {
      rows = rows.filter((r) => !("status" in r) || r.status === filters.status);
    }
    if (filters.area !== "All Areas") {
      rows = rows.filter((r) => !("area" in r) || r.area === filters.area);
    }
    if (filters.package !== "All Packages") {
      rows = rows.filter((r) => !("package" in r) || r.package === filters.package);
    }
    if (filters.employee !== "All Employees") {
      rows = rows.filter(
        (r) =>
          !("assignedTo" in r || "collectedBy" in r || "employeeName" in r) ||
          r.assignedTo === filters.employee ||
          r.collectedBy === filters.employee ||
          r.employeeName === filters.employee
      );
    }
    if (filters.reseller !== "All Resellers") {
      rows = rows.filter(
        (r) => !("collectedByReseller" in r) || r.collectedByReseller === filters.reseller
      );
    }
    if (filters.subscriber !== "All Subscribers") {
      rows = rows.filter(
        (r) => !("subscriberName" in r) || r.subscriberName === filters.subscriber
      );
    }
    if (filters.dateFrom || filters.dateTo) {
      rows = rows.filter((r) => rowMatchesDateRange(r, filters.dateFrom, filters.dateTo));
    }

    setGeneratedReport({
      reportName: filters.reportType,
      category: definition.category,
      columns: definition.columns,
      rows,
      generatedAt: "Today, 26-Jul-2026",
    });
    setReportsGeneratedToday((prev) => prev + 1);
    setResultSearch("");
    setSortConfig({ key: null, direction: "asc" });
    setPage(1);
    showBanner(`${filters.reportType} generated successfully.`);
  };

  // BEGIN: Report results — search, sort, pagination
  const resultRows = generatedReport ? generatedReport.rows : [];

  const searchedRows = resultSearch
    ? resultRows.filter((row) =>
        Object.values(row).some((val) =>
          String(val).toLowerCase().includes(resultSearch.toLowerCase())
        )
      )
    : resultRows;

  const sortedRows = sortConfig.key
    ? [...searchedRows].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
        }
        return sortConfig.direction === "asc"
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      })
    : searchedRows;

  const totalPages = Math.max(1, Math.ceil(sortedRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedRows = sortedRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleSort = (key) => {
    setSortConfig((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };
  // END: Report results

  // BEGIN: Print / Export
  const handlePrint = () => {
    if (!generatedReport) {
      showBanner("Generate a report before printing.");
      return;
    }
    window.print();
  };

  const buildExportHtml = () => {
    const cols = generatedReport.columns;
    const headerHtml = cols.map((c) => `<th>${c.label}</th>`).join("");
    const rowsHtml = sortedRows
      .map(
        (row) =>
          `<tr>${cols.map((c) => `<td>${row[c.key]}</td>`).join("")}</tr>`
      )
      .join("");
    return `<table border="1"><thead><tr>${headerHtml}</tr></thead><tbody>${rowsHtml}</tbody></table>`;
  };

  const handleExportExcel = () => {
    if (!generatedReport) {
      showBanner("Generate a report before exporting.");
      return;
    }
    const html = buildExportHtml();
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${generatedReport.reportName.replace(/\s+/g, "_")}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showBanner("Report exported to Excel.");
  };

  const handleExportPdf = () => {
    if (!generatedReport) {
      showBanner("Generate a report before exporting.");
      return;
    }
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      showBanner("Please allow pop-ups to export as PDF.");
      return;
    }
    printWindow.document.write(
      `<html><head><title>${generatedReport.reportName}</title></head><body><h2>${generatedReport.reportName}</h2>${buildExportHtml()}</body></html>`
    );
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  // END: Print / Export

  const hasResults = Boolean(generatedReport);

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* BEGIN: Page Header */}
      <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
        <div>
          <h2 className="text-lg font-medium">Reports</h2>
          <div className="text-slate-500 mt-1">
            Generate business, billing and operational reports.
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
          <button type="button" onClick={handleGenerate} className="btn btn-primary shadow-md">
            <Lucide icon="PlayCircle" className="w-4 h-4 mr-2" /> Generate Report
          </button>
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={!hasResults}
            className={classnames(
              "btn btn-outline-secondary",
              !hasResults && "opacity-50 cursor-not-allowed"
            )}
          >
            <Lucide icon="FileText" className="w-4 h-4 mr-2" /> Export PDF
          </button>
          <button
            type="button"
            onClick={handleExportExcel}
            disabled={!hasResults}
            className={classnames(
              "btn btn-outline-secondary",
              !hasResults && "opacity-50 cursor-not-allowed"
            )}
          >
            <Lucide icon="Sheet" className="w-4 h-4 mr-2" /> Export Excel
          </button>
          <button
            type="button"
            onClick={handlePrint}
            disabled={!hasResults}
            className={classnames(
              "btn btn-outline-secondary",
              !hasResults && "opacity-50 cursor-not-allowed"
            )}
          >
            <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
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

      {/* BEGIN: Report Categories */}
      <div className="col-span-12 intro-y">
        <div className="box p-4">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={classnames(
                  "py-2 px-4 rounded-full text-sm font-medium inline-flex items-center whitespace-nowrap",
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-darkmode-400 dark:text-slate-300"
                )}
              >
                <Lucide icon={CATEGORY_ICONS[category]} className="w-4 h-4 mr-2" />
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* END: Report Categories */}

      {/* BEGIN: Search & Filters */}
      <div className="col-span-12 intro-y">
        <div className="box p-5">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <label className="text-xs text-slate-500">Report Type</label>
              <select
                className="form-select box mt-1 w-full"
                value={filters.reportType}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, reportType: e.target.value }))
                }
              >
                <option value="">Select a report</option>
                {CATEGORIES.filter((c) => REPORT_CATALOG[c].length > 0).map((category) => (
                  <optgroup key={category} label={category}>
                    {REPORT_CATALOG[category].map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label className="text-xs text-slate-500">Date From</label>
              <input
                type="date"
                className="form-control box mt-1 w-full"
                value={filters.dateFrom}
                onChange={(e) => setFilters((prev) => ({ ...prev, dateFrom: e.target.value }))}
              />
            </div>
            <div className="col-span-6 sm:col-span-3 lg:col-span-2">
              <label className="text-xs text-slate-500">Date To</label>
              <input
                type="date"
                className="form-control box mt-1 w-full"
                value={filters.dateTo}
                onChange={(e) => setFilters((prev) => ({ ...prev, dateTo: e.target.value }))}
              />
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-4">
              <label className="text-xs text-slate-500">Subscriber</label>
              <select
                className="form-select box mt-1 w-full"
                value={filters.subscriber}
                onChange={(e) => setFilters((prev) => ({ ...prev, subscriber: e.target.value }))}
              >
                <option>All Subscribers</option>
                {SUBSCRIBER_NAMES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <label className="text-xs text-slate-500">Package</label>
              <select
                className="form-select box mt-1 w-full"
                value={filters.package}
                onChange={(e) => setFilters((prev) => ({ ...prev, package: e.target.value }))}
              >
                <option>All Packages</option>
                {PACKAGES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <label className="text-xs text-slate-500">Reseller</label>
              <select
                className="form-select box mt-1 w-full"
                value={filters.reseller}
                onChange={(e) => setFilters((prev) => ({ ...prev, reseller: e.target.value }))}
              >
                <option>All Resellers</option>
                {RESELLERS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <label className="text-xs text-slate-500">Employee</label>
              <select
                className="form-select box mt-1 w-full"
                value={filters.employee}
                onChange={(e) => setFilters((prev) => ({ ...prev, employee: e.target.value }))}
              >
                <option>All Employees</option>
                {EMPLOYEE_NAMES.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <label className="text-xs text-slate-500">Status</label>
              <select
                className="form-select box mt-1 w-full"
                value={filters.status}
                onChange={(e) => setFilters((prev) => ({ ...prev, status: e.target.value }))}
              >
                <option>All Statuses</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 sm:col-span-6 lg:col-span-3">
              <label className="text-xs text-slate-500">Area</label>
              <select
                className="form-select box mt-1 w-full"
                value={filters.area}
                onChange={(e) => setFilters((prev) => ({ ...prev, area: e.target.value }))}
              >
                <option>All Areas</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-12 flex gap-2 mt-1">
              <button
                type="button"
                onClick={handleGenerate}
                className="btn btn-primary w-full sm:w-48"
              >
                <Lucide icon="PlayCircle" className="w-4 h-4 mr-2" /> Generate Report
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
        </div>
      </div>
      {/* END: Search & Filters */}

      {/* BEGIN: Summary Cards */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-2 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="FileText" className="w-8 h-8 mr-4 flex-none text-primary" />
          <div>
            <div className="text-xl font-medium">{reportsGeneratedToday}</div>
            <div className="text-slate-500 text-xs mt-0.5">Reports Generated Today</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-2 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-warning" />
          <div>
            <div className="text-xl font-medium">{pendingPaymentsCount}</div>
            <div className="text-slate-500 text-xs mt-0.5">Pending Payments</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-2 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="Users" className="w-8 h-8 mr-4 flex-none text-success" />
          <div>
            <div className="text-xl font-medium">{activeSubscribersCount}</div>
            <div className="text-slate-500 text-xs mt-0.5">Active Subscribers</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-2 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="LifeBuoy" className="w-8 h-8 mr-4 flex-none text-danger" />
          <div>
            <div className="text-xl font-medium">{openTicketsCount}</div>
            <div className="text-slate-500 text-xs mt-0.5">Open Support Tickets</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-2 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="Package" className="w-8 h-8 mr-4 flex-none text-pending" />
          <div>
            <div className="text-xl font-medium">{inventoryItemsCount}</div>
            <div className="text-slate-500 text-xs mt-0.5">Inventory Items</div>
          </div>
        </div>
      </div>
      {/* END: Summary Cards */}

      {/* BEGIN: Available Reports */}
      <div className="col-span-12 mt-2">
        <div className="intro-y flex items-center h-10">
          <h2 className="text-lg font-medium truncate mr-5">Available Reports</h2>
        </div>
        <div className="intro-y box p-5 mt-5">
          <div className="text-base font-medium mb-3 flex items-center">
            <Lucide
              icon={CATEGORY_ICONS[activeCategory]}
              className="w-4 h-4 mr-2 text-primary"
            />
            {activeCategory}
          </div>
          {REPORT_CATALOG[activeCategory].length === 0 ? (
            <div className="text-slate-500 text-sm">
              No reports are available in this category yet.
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-2">
              {REPORT_CATALOG[activeCategory].map((name) => (
                <div key={name} className="col-span-12 sm:col-span-6 lg:col-span-4">
                  <button
                    type="button"
                    onClick={() => handleSelectReport(activeCategory, name)}
                    className={classnames(
                      "w-full text-left py-2.5 px-4 rounded-md border text-sm flex items-center",
                      filters.reportType === name
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-slate-200 dark:border-darkmode-400 hover:border-primary hover:text-primary"
                    )}
                  >
                    <Lucide icon="FileText" className="w-4 h-4 mr-2 flex-none" />
                    {name}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* END: Available Reports */}

      {/* BEGIN: Report Results */}
      <div className="col-span-12 mt-2">
        <div className="intro-y flex flex-col sm:flex-row sm:items-center h-auto sm:h-10 gap-3">
          <h2 className="text-lg font-medium truncate mr-5">
            {generatedReport ? generatedReport.reportName : "Report Results"}
          </h2>
          {generatedReport && (
            <div className="sm:ml-auto flex items-center gap-3 w-full sm:w-auto">
              <div className="relative text-slate-500 w-full sm:w-64">
                <Lucide
                  icon="Search"
                  className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
                />
                <input
                  type="text"
                  value={resultSearch}
                  onChange={(e) => {
                    setResultSearch(e.target.value);
                    setPage(1);
                  }}
                  className="form-control box pl-9 py-2 text-sm w-full"
                  placeholder="Search results"
                />
              </div>
              <div className="text-slate-500 text-sm whitespace-nowrap">
                {sortedRows.length} result{sortedRows.length === 1 ? "" : "s"}
              </div>
            </div>
          )}
        </div>

        {!generatedReport ? (
          // BEGIN: Empty State
          <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
            <Lucide icon="FileText" className="w-12 h-12 text-slate-300 mb-3" />
            <div className="text-slate-500">Select a report and click Generate Report.</div>
          </div>
        ) : sortedRows.length === 0 ? (
          // END: Empty State
          <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
            <Lucide icon="Search" className="w-12 h-12 text-slate-300 mb-3" />
            <div className="text-slate-500">No records match the selected filters.</div>
          </div>
        ) : (
          <>
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full">
                <thead>
                  <tr>
                    {generatedReport.columns.map((col) => (
                      <th
                        key={col.key}
                        className="whitespace-nowrap cursor-pointer select-none"
                        onClick={() => handleSort(col.key)}
                      >
                        <div className="flex items-center">
                          {col.label}
                          {sortConfig.key === col.key && (
                            <span className="ml-1 text-xs leading-none">
                              {sortConfig.direction === "asc" ? "▲" : "▼"}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pagedRows.map((row, idx) => (
                    <tr key={row.id || idx} className="intro-x">
                      {generatedReport.columns.map((col) => (
                        <td key={col.key} className="whitespace-nowrap">
                          {col.key === "status" ? (
                            <StatusBadge status={row[col.key]} />
                          ) : (
                            String(row[col.key])
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* BEGIN: Pagination */}
            <div className="intro-y flex flex-col sm:flex-row sm:items-center mt-5 gap-3">
              <div className="text-slate-500 text-sm">
                Page {currentPage} of {totalPages}
              </div>
              <div className="sm:ml-auto flex gap-2">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={classnames(
                    "btn btn-outline-secondary",
                    currentPage === 1 && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="text-sm leading-none px-1">‹ Prev</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={classnames(
                    "btn btn-outline-secondary",
                    currentPage === totalPages && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className="text-sm leading-none px-1">Next ›</span>
                </button>
              </div>
            </div>
            {/* END: Pagination */}
          </>
        )}
      </div>
      {/* END: Report Results */}
    </div>
  );
}

export default Main;