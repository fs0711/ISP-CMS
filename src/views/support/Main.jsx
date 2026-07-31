import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder ticket data
const TECHNICIAN_OPTIONS = [
  "Usman Khan",
  "Bilal Sheikh",
  "Kamran Iqbal",
  "Waqar Ahmed",
  "Unassigned",
];

const CATEGORY_OPTIONS = [
  "Internet Down",
  "Slow Speed",
  "No Connectivity",
  "Fiber Cut",
  "Router Issue",
  "ONU Issue",
  "WiFi Problem",
  "Billing Issue",
  "Package Upgrade",
  "Package Downgrade",
  "New Installation",
  "Other",
];

const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"];

const STATUS_OPTIONS = [
  "Open",
  "Assigned",
  "In Progress",
  "Waiting for Customer",
  "Resolved",
  "Closed",
];

const INITIAL_TICKETS = [
  {
    id: "TKT-1001",
    subscriber: "Ahmed Ali",
    subscriberId: "SUB-2045",
    phone: "0300-1112233",
    address: "House 12, Street 4, Gulshan-e-Iqbal, Karachi",
    package: "20 Mbps Home",
    category: "Internet Down",
    priority: "High",
    technician: "Usman Khan",
    createdDate: "24-Jul-2026",
    createdDateISO: "2026-07-24",
    lastUpdated: "24-Jul-2026",
    status: "Assigned",
    resolvedToday: false,
    description: "Customer reports complete internet outage since this morning.",
    notes: ["Checked OLT — no signal on this ONU port."],
    timeline: [
      { date: "24-Jul-2026", event: "Ticket created" },
      { date: "24-Jul-2026", event: "Assigned to Usman Khan" },
    ],
  },
  {
    id: "TKT-1002",
    subscriber: "Ayesha Siddiqui",
    subscriberId: "SUB-2202",
    phone: "0333-2345678",
    address: "Flat 5B, DHA Phase 5, Karachi",
    package: "50 Mbps Home",
    category: "Slow Speed",
    priority: "Medium",
    technician: "Unassigned",
    createdDate: "25-Jul-2026",
    createdDateISO: "2026-07-25",
    lastUpdated: "25-Jul-2026",
    status: "Open",
    resolvedToday: false,
    description: "Speed drops significantly during evening hours.",
    notes: [],
    timeline: [{ date: "25-Jul-2026", event: "Ticket created" }],
  },
  {
    id: "TKT-1003",
    subscriber: "Bilal Hussain",
    subscriberId: "SUB-2203",
    phone: "0321-3456789",
    address: "House 8, North Nazimabad, Karachi",
    package: "100 Mbps Fiber",
    category: "Fiber Cut",
    priority: "Critical",
    technician: "Kamran Iqbal",
    createdDate: "26-Jul-2026",
    createdDateISO: "2026-07-26",
    lastUpdated: "26-Jul-2026",
    status: "In Progress",
    resolvedToday: false,
    description: "Fiber cable damaged near main road, area-wide outage.",
    notes: ["Splicing team dispatched.", "ETA 3 hours."],
    timeline: [
      { date: "26-Jul-2026", event: "Ticket created" },
      { date: "26-Jul-2026", event: "Assigned to Kamran Iqbal" },
      { date: "26-Jul-2026", event: "Status changed to In Progress" },
    ],
  },
  {
    id: "TKT-1004",
    subscriber: "Sana Malik",
    subscriberId: "SUB-2204",
    phone: "0345-4567890",
    address: "House 21, Malir, Karachi",
    package: "10 Mbps Home",
    category: "Router Issue",
    priority: "Low",
    technician: "Bilal Sheikh",
    createdDate: "20-Jul-2026",
    createdDateISO: "2026-07-20",
    lastUpdated: "26-Jul-2026",
    status: "Resolved",
    resolvedToday: true,
    description: "Router keeps restarting on its own.",
    notes: ["Replaced faulty power adapter."],
    timeline: [
      { date: "20-Jul-2026", event: "Ticket created" },
      { date: "21-Jul-2026", event: "Assigned to Bilal Sheikh" },
      { date: "26-Jul-2026", event: "Status changed to Resolved" },
    ],
  },
  {
    id: "TKT-1005",
    subscriber: "Usman Tariq",
    subscriberId: "SUB-2205",
    phone: "0312-5678901",
    address: "House 33, Korangi, Karachi",
    package: "20 Mbps Home",
    category: "Billing Issue",
    priority: "Low",
    technician: "Unassigned",
    createdDate: "23-Jul-2026",
    createdDateISO: "2026-07-23",
    lastUpdated: "23-Jul-2026",
    status: "Waiting for Customer",
    resolvedToday: false,
    description: "Customer disputes late fee charged on last invoice.",
    notes: ["Waiting for customer to share payment proof."],
    timeline: [
      { date: "23-Jul-2026", event: "Ticket created" },
      { date: "23-Jul-2026", event: "Status changed to Waiting for Customer" },
    ],
  },
  {
    id: "TKT-1006",
    subscriber: "Hina Farooq",
    subscriberId: "SUB-2206",
    phone: "0301-6789012",
    address: "House 7, Federal B Area, Karachi",
    package: "100 Mbps Fiber",
    category: "WiFi Problem",
    priority: "Medium",
    technician: "Usman Khan",
    createdDate: "25-Jul-2026",
    createdDateISO: "2026-07-25",
    lastUpdated: "26-Jul-2026",
    status: "In Progress",
    resolvedToday: false,
    description: "Weak WiFi signal in back rooms of the house.",
    notes: ["Recommended a WiFi extender, visit scheduled."],
    timeline: [
      { date: "25-Jul-2026", event: "Ticket created" },
      { date: "25-Jul-2026", event: "Assigned to Usman Khan" },
      { date: "26-Jul-2026", event: "Status changed to In Progress" },
    ],
  },
  {
    id: "TKT-1007",
    subscriber: "Kamran Iqbal Sr.",
    subscriberId: "SUB-2207",
    phone: "0332-7890123",
    address: "House 45, Landhi, Karachi",
    package: "50 Mbps Home",
    category: "No Connectivity",
    priority: "High",
    technician: "Waqar Ahmed",
    createdDate: "26-Jul-2026",
    createdDateISO: "2026-07-26",
    lastUpdated: "26-Jul-2026",
    status: "Open",
    resolvedToday: false,
    description: "No internet connectivity since last night.",
    notes: [],
    timeline: [{ date: "26-Jul-2026", event: "Ticket created" }],
  },
  {
    id: "TKT-1008",
    subscriber: "Nadia Yousaf",
    subscriberId: "SUB-2208",
    phone: "0300-8901234",
    address: "House 15, Gulistan-e-Johar, Karachi",
    package: "10 Mbps Home",
    category: "Package Upgrade",
    priority: "Low",
    technician: "Unassigned",
    createdDate: "22-Jul-2026",
    createdDateISO: "2026-07-22",
    lastUpdated: "23-Jul-2026",
    status: "Closed",
    resolvedToday: false,
    description: "Customer requested upgrade to 50 Mbps package.",
    notes: ["Package upgraded and confirmed with customer."],
    timeline: [
      { date: "22-Jul-2026", event: "Ticket created" },
      { date: "23-Jul-2026", event: "Status changed to Resolved" },
      { date: "23-Jul-2026", event: "Status changed to Closed" },
    ],
  },
  {
    id: "TKT-1009",
    subscriber: "Faisal Rehman",
    subscriberId: "SUB-2209",
    phone: "0334-9012345",
    address: "House 3, Clifton, Karachi",
    package: "100 Mbps Fiber",
    category: "ONU Issue",
    priority: "Critical",
    technician: "Kamran Iqbal",
    createdDate: "26-Jul-2026",
    createdDateISO: "2026-07-26",
    lastUpdated: "26-Jul-2026",
    status: "Assigned",
    resolvedToday: false,
    description: "ONU device showing red light, no signal.",
    notes: ["Replacement ONU arranged."],
    timeline: [
      { date: "26-Jul-2026", event: "Ticket created" },
      { date: "26-Jul-2026", event: "Assigned to Kamran Iqbal" },
    ],
  },
  {
    id: "TKT-1010",
    subscriber: "Zainab Abbas",
    subscriberId: "SUB-2210",
    phone: "0315-0123456",
    address: "House 19, North Karachi, Karachi",
    package: "20 Mbps Home",
    category: "New Installation",
    priority: "Medium",
    technician: "Bilal Sheikh",
    createdDate: "26-Jul-2026",
    createdDateISO: "2026-07-26",
    lastUpdated: "26-Jul-2026",
    status: "Resolved",
    resolvedToday: true,
    description: "New connection installation requested.",
    notes: ["Installation completed successfully."],
    timeline: [
      { date: "26-Jul-2026", event: "Ticket created" },
      { date: "26-Jul-2026", event: "Assigned to Bilal Sheikh" },
      { date: "26-Jul-2026", event: "Status changed to Resolved" },
    ],
  },
];
// END: Placeholder ticket data

const STATUS_FILTER_OPTIONS = ["All Statuses", ...STATUS_OPTIONS];
const PRIORITY_FILTER_OPTIONS = ["All Priorities", ...PRIORITY_OPTIONS];
const TECHNICIAN_FILTER_OPTIONS = ["All Technicians", ...TECHNICIAN_OPTIONS];
const CATEGORY_FILTER_OPTIONS = ["All Categories", ...CATEGORY_OPTIONS];

const PRIORITY_BADGE_CLASSES = {
  Low: "bg-slate-200 text-slate-500 dark:bg-darkmode-300",
  Medium: "bg-warning/20 text-warning",
  High: "bg-danger/20 text-danger",
  Critical: "bg-danger text-white",
};

const STATUS_BADGE_CLASSES = {
  Open: "bg-pending/20 text-pending",
  Assigned: "bg-primary/20 text-primary",
  "In Progress": "bg-warning/20 text-warning",
  "Waiting for Customer": "bg-slate-200 text-slate-500 dark:bg-darkmode-300",
  Resolved: "bg-success/20 text-success",
  Closed: "bg-slate-300 text-slate-600 dark:bg-darkmode-400 dark:text-slate-300",
};

const NEW_TICKET_FORM_DEFAULT = {
  subscriber: "",
  phone: "",
  category: CATEGORY_OPTIONS[0],
  priority: "Medium",
  description: "",
  visitTime: "",
  technician: "Unassigned",
};

const ASSIGN_FORM_DEFAULT = {
  technician: TECHNICIAN_OPTIONS[0],
  visitDate: "",
  remarks: "",
};

function PriorityBadge({ priority }) {
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        PRIORITY_BADGE_CLASSES[priority]
      )}
    >
      {priority}
    </div>
  );
}

function TicketStatusBadge({ status }) {
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
  const [tickets, setTickets] = useState(INITIAL_TICKETS);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [priorityDraft, setPriorityDraft] = useState("All Priorities");
  const [technicianDraft, setTechnicianDraft] = useState("All Technicians");
  const [categoryDraft, setCategoryDraft] = useState("All Categories");
  const [dateFromDraft, setDateFromDraft] = useState("");
  const [dateToDraft, setDateToDraft] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Statuses",
    priority: "All Priorities",
    technician: "All Technicians",
    category: "All Categories",
    dateFrom: "",
    dateTo: "",
  });

  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [newTicketForm, setNewTicketForm] = useState(NEW_TICKET_FORM_DEFAULT);

  const [detailsTicketId, setDetailsTicketId] = useState(null);
  const [noteDraft, setNoteDraft] = useState("");

  const [assignModal, setAssignModal] = useState({ open: false, ticketId: null });
  const [assignForm, setAssignForm] = useState(ASSIGN_FORM_DEFAULT);

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
      priority: priorityDraft,
      technician: technicianDraft,
      category: categoryDraft,
      dateFrom: dateFromDraft,
      dateTo: dateToDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setStatusDraft("All Statuses");
    setPriorityDraft("All Priorities");
    setTechnicianDraft("All Technicians");
    setCategoryDraft("All Categories");
    setDateFromDraft("");
    setDateToDraft("");
    setAppliedFilters({
      search: "",
      status: "All Statuses",
      priority: "All Priorities",
      technician: "All Technicians",
      category: "All Categories",
      dateFrom: "",
      dateTo: "",
    });
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      t.id.toLowerCase().includes(appliedFilters.search) ||
      t.subscriberId.toLowerCase().includes(appliedFilters.search) ||
      t.subscriber.toLowerCase().includes(appliedFilters.search) ||
      t.phone.toLowerCase().includes(appliedFilters.search) ||
      t.address.toLowerCase().includes(appliedFilters.search);

    const matchesStatus =
      appliedFilters.status === "All Statuses" || t.status === appliedFilters.status;

    const matchesPriority =
      appliedFilters.priority === "All Priorities" ||
      t.priority === appliedFilters.priority;

    const matchesTechnician =
      appliedFilters.technician === "All Technicians" ||
      t.technician === appliedFilters.technician;

    const matchesCategory =
      appliedFilters.category === "All Categories" ||
      t.category === appliedFilters.category;

    const matchesDateFrom =
      appliedFilters.dateFrom === "" || t.createdDateISO >= appliedFilters.dateFrom;

    const matchesDateTo =
      appliedFilters.dateTo === "" || t.createdDateISO <= appliedFilters.dateTo;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesTechnician &&
      matchesCategory &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const totalTickets = tickets.length;
  const openTickets = tickets.filter((t) => t.status === "Open").length;
  const inProgressTickets = tickets.filter((t) => t.status === "In Progress").length;
  const resolvedTodayTickets = tickets.filter((t) => t.resolvedToday).length;
  const highPriorityTickets = tickets.filter(
    (t) => t.priority === "High" || t.priority === "Critical"
  ).length;

  const detailsTicket = tickets.find((t) => t.id === detailsTicketId) || null;

  const openNewTicketForm = () => {
    setNewTicketForm(NEW_TICKET_FORM_DEFAULT);
    setIsNewTicketOpen(true);
  };
  const closeNewTicketForm = () => setIsNewTicketOpen(false);

  const handleCreateTicket = () => {
    if (!newTicketForm.subscriber.trim() || !newTicketForm.description.trim()) {
      closeNewTicketForm();
      return;
    }
    const nextNumber =
      Math.max(...tickets.map((t) => Number(t.id.replace("TKT-", "")) || 0), 1000) + 1;
    const today = "26-Jul-2026";
    const newTicket = {
      id: `TKT-${nextNumber}`,
      subscriber: newTicketForm.subscriber.trim(),
      subscriberId: `SUB-${2000 + nextNumber}`,
      phone: newTicketForm.phone.trim() || "—",
      address: "—",
      package: "—",
      category: newTicketForm.category,
      priority: newTicketForm.priority,
      technician: newTicketForm.technician,
      createdDate: today,
      createdDateISO: "2026-07-26",
      lastUpdated: today,
      status: newTicketForm.technician === "Unassigned" ? "Open" : "Assigned",
      resolvedToday: false,
      description: newTicketForm.description.trim(),
      notes: [],
      timeline: [{ date: today, event: "Ticket created" }],
    };
    setTickets((prev) => [newTicket, ...prev]);
    showBanner(`Ticket ${newTicket.id} created.`);
    closeNewTicketForm();
  };

  const openAssignModal = (ticketId) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    setAssignForm({
      technician:
        ticket && ticket.technician !== "Unassigned"
          ? ticket.technician
          : TECHNICIAN_OPTIONS[0],
      visitDate: "",
      remarks: "",
    });
    setAssignModal({ open: true, ticketId });
  };
  const closeAssignModal = () => setAssignModal({ open: false, ticketId: null });

  const handleAssignTechnician = () => {
    if (assignModal.ticketId) {
      setTickets((prev) =>
        prev.map((t) =>
          t.id === assignModal.ticketId
            ? {
                ...t,
                technician: assignForm.technician,
                status: t.status === "Open" ? "Assigned" : t.status,
                lastUpdated: "26-Jul-2026",
                timeline: [
                  ...t.timeline,
                  {
                    date: "26-Jul-2026",
                    event: `Assigned to ${assignForm.technician}`,
                  },
                ],
              }
            : t
        )
      );
      showBanner(`${assignModal.ticketId} assigned to ${assignForm.technician}.`);
    }
    closeAssignModal();
  };

  const handleChangeStatus = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== ticketId) return t;
        const currentIndex = STATUS_OPTIONS.indexOf(t.status);
        const nextStatus =
          STATUS_OPTIONS[(currentIndex + 1) % STATUS_OPTIONS.length];
        return {
          ...t,
          status: nextStatus,
          lastUpdated: "26-Jul-2026",
          resolvedToday: nextStatus === "Resolved" ? true : t.resolvedToday,
          timeline: [
            ...t.timeline,
            { date: "26-Jul-2026", event: `Status changed to ${nextStatus}` },
          ],
        };
      })
    );
    showBanner(`${ticketId} status updated.`);
  };

  const handleCloseTicket = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? {
              ...t,
              status: "Closed",
              lastUpdated: "26-Jul-2026",
              timeline: [
                ...t.timeline,
                { date: "26-Jul-2026", event: "Status changed to Closed" },
              ],
            }
          : t
      )
    );
    showBanner(`${ticketId} closed.`);
  };

  const handleAddNote = () => {
    if (!noteDraft.trim() || !detailsTicketId) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === detailsTicketId
          ? { ...t, notes: [...t.notes, noteDraft.trim()] }
          : t
      )
    );
    setNoteDraft("");
    showBanner("Internal note added.");
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Support Tickets</h2>
            <div className="text-slate-500 mt-1">
              Manage customer complaints and technician assignments.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={openNewTicketForm}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> New Ticket
            </button>
            <button
              type="button"
              onClick={() => openAssignModal(null)}
              className="btn btn-outline-secondary"
            >
              <Lucide icon="User" className="w-4 h-4 mr-2" /> Assign Technician
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
                placeholder="Search by Ticket ID, Subscriber ID, Subscriber Name, Phone Number or Address"
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
                  {STATUS_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Priority</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={priorityDraft}
                  onChange={(e) => setPriorityDraft(e.target.value)}
                >
                  {PRIORITY_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">
                  Assigned Technician
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={technicianDraft}
                  onChange={(e) => setTechnicianDraft(e.target.value)}
                >
                  {TECHNICIAN_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">
                  Complaint Category
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={categoryDraft}
                  onChange={(e) => setCategoryDraft(e.target.value)}
                >
                  {CATEGORY_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Date From</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={dateFromDraft}
                  onChange={(e) => setDateFromDraft(e.target.value)}
                />
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Date To</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={dateToDraft}
                  onChange={(e) => setDateToDraft(e.target.value)}
                />
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
            <Lucide icon="List" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">{totalTickets}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Tickets</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Clock" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">{openTickets}</div>
              <div className="text-slate-500 text-xs mt-0.5">Open Tickets</div>
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
              <div className="text-xl font-medium">{inProgressTickets}</div>
              <div className="text-slate-500 text-xs mt-0.5">In Progress</div>
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
              <div className="text-xl font-medium">{resolvedTodayTickets}</div>
              <div className="text-slate-500 text-xs mt-0.5">Resolved Today</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-danger" />
            <div>
              <div className="text-xl font-medium">{highPriorityTickets}</div>
              <div className="text-slate-500 text-xs mt-0.5">High Priority</div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Tickets Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">Ticket Records</h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredTickets.length} result
              {filteredTickets.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredTickets.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="FileText" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">No support tickets found.</div>
              <button
                type="button"
                onClick={openNewTicketForm}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Create New Ticket
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1400px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">TICKET ID</th>
                    <th className="whitespace-nowrap">SUBSCRIBER NAME</th>
                    <th className="whitespace-nowrap">SUBSCRIBER ID</th>
                    <th className="whitespace-nowrap">PHONE NUMBER</th>
                    <th className="whitespace-nowrap">COMPLAINT CATEGORY</th>
                    <th className="text-center whitespace-nowrap">PRIORITY</th>
                    <th className="whitespace-nowrap">ASSIGNED TECHNICIAN</th>
                    <th className="whitespace-nowrap">CREATED DATE</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="text-center whitespace-nowrap min-w-[200px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((t) => (
                    <tr key={t.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">{t.id}</td>
                      <td className="whitespace-nowrap">{t.subscriber}</td>
                      <td className="whitespace-nowrap">{t.subscriberId}</td>
                      <td className="whitespace-nowrap">{t.phone}</td>
                      <td className="whitespace-nowrap">{t.category}</td>
                      <td className="w-28">
                        <div className="flex justify-center">
                          <PriorityBadge priority={t.priority} />
                        </div>
                      </td>
                      <td className="whitespace-nowrap">{t.technician}</td>
                      <td className="whitespace-nowrap">{t.createdDate}</td>
                      <td className="w-40">
                        <div className="flex justify-center">
                          <TicketStatusBadge status={t.status} />
                        </div>
                      </td>
                      <td className="table-report__action w-auto min-w-[200px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy
                            tag="a"
                            href=""
                            content="View Ticket"
                            onClick={(e) => {
                              e.preventDefault();
                              setDetailsTicketId(t.id);
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
                            content="Assign Technician"
                            onClick={(e) => {
                              e.preventDefault();
                              openAssignModal(t.id);
                            }}
                          >
                            <Lucide
                              icon="User"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Change Status"
                            onClick={(e) => {
                              e.preventDefault();
                              handleChangeStatus(t.id);
                            }}
                          >
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Add Internal Note"
                            onClick={(e) => {
                              e.preventDefault();
                              setDetailsTicketId(t.id);
                            }}
                          >
                            <Lucide
                              icon="FileText"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Close Ticket"
                            onClick={(e) => {
                              e.preventDefault();
                              handleCloseTicket(t.id);
                            }}
                          >
                            <Lucide
                              icon="X"
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
        {/* END: Tickets Table */}
      </div>

      {/* BEGIN: New Ticket Modal (UI only) */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeNewTicketForm}></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">New Ticket</h2>
              <button
                type="button"
                onClick={closeNewTicketForm}
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
                  value={newTicketForm.subscriber}
                  onChange={(e) =>
                    setNewTicketForm((prev) => ({
                      ...prev,
                      subscriber: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">Phone Number</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 0300-1234567"
                  value={newTicketForm.phone}
                  onChange={(e) =>
                    setNewTicketForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Complaint Category
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={newTicketForm.category}
                  onChange={(e) =>
                    setNewTicketForm((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                >
                  {CATEGORY_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">Priority</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={newTicketForm.priority}
                  onChange={(e) =>
                    setNewTicketForm((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                >
                  {PRIORITY_OPTIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Assign Technician (Optional)
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={newTicketForm.technician}
                  onChange={(e) =>
                    setNewTicketForm((prev) => ({
                      ...prev,
                      technician: e.target.value,
                    }))
                  }
                >
                  {TECHNICIAN_OPTIONS.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">
                  Preferred Visit Time
                </label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Tomorrow 3:00 PM - 5:00 PM"
                  value={newTicketForm.visitTime}
                  onChange={(e) =>
                    setNewTicketForm((prev) => ({
                      ...prev,
                      visitTime: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">
                  Complaint Description
                </label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={3}
                  placeholder="Describe the customer's complaint"
                  value={newTicketForm.description}
                  onChange={(e) =>
                    setNewTicketForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeNewTicketForm}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateTicket}
                className="btn btn-primary shadow-md"
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: New Ticket Modal */}

      {/* BEGIN: Ticket Details Panel (UI only) */}
      {detailsTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDetailsTicketId(null)}
          ></div>
          <div className="relative box w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Ticket Details</h2>
              <button
                type="button"
                onClick={() => setDetailsTicketId(null)}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Ticket ID</div>
                <div className="font-medium">{detailsTicket.id}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Subscriber Name</div>
                <div className="font-medium">{detailsTicket.subscriber}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Subscriber ID</div>
                <div className="font-medium">{detailsTicket.subscriberId}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Phone Number</div>
                <div className="font-medium">{detailsTicket.phone}</div>
              </div>
              <div className="col-span-2">
                <div className="text-slate-500 text-xs">
                  Installation Address
                </div>
                <div className="font-medium">{detailsTicket.address}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Package</div>
                <div className="font-medium">{detailsTicket.package}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Complaint Category</div>
                <div className="font-medium">{detailsTicket.category}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Priority</div>
                <PriorityBadge priority={detailsTicket.priority} />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Assigned Technician</div>
                <div className="font-medium">{detailsTicket.technician}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Created Date</div>
                <div className="font-medium">{detailsTicket.createdDate}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Last Updated</div>
                <div className="font-medium">{detailsTicket.lastUpdated}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Current Status</div>
                <TicketStatusBadge status={detailsTicket.status} />
              </div>
              <div className="col-span-2">
                <div className="text-slate-500 text-xs">
                  Complaint Description
                </div>
                <div className="font-medium">{detailsTicket.description}</div>
              </div>
            </div>

            {/* Internal Notes */}
            <div className="mt-6 border-t border-slate-200/60 dark:border-darkmode-400 pt-4">
              <div className="text-sm font-medium mb-2">Internal Notes</div>
              {detailsTicket.notes.length === 0 ? (
                <div className="text-slate-400 text-xs mb-2">No notes yet.</div>
              ) : (
                <ul className="space-y-1.5 mb-3">
                  {detailsTicket.notes.map((note, idx) => (
                    <li
                      key={idx}
                      className="text-xs bg-slate-100 dark:bg-darkmode-300 rounded-md px-3 py-2"
                    >
                      {note}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  className="form-control box w-full"
                  placeholder="Add an internal note"
                  value={noteDraft}
                  onChange={(e) => setNoteDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddNote();
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  className="btn btn-outline-secondary flex-none"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-6 border-t border-slate-200/60 dark:border-darkmode-400 pt-4">
              <div className="text-sm font-medium mb-2">
                Timeline of Status Changes
              </div>
              <ul className="space-y-2">
                {detailsTicket.timeline.map((event, idx) => (
                  <li key={idx} className="flex items-start text-xs">
                    <Lucide
                      icon="Clock"
                      className="w-3.5 h-3.5 text-slate-400 mr-2 mt-0.5 flex-none"
                    />
                    <div>
                      <span className="text-slate-500 mr-2">{event.date}</span>
                      {event.event}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDetailsTicketId(null)}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = detailsTicket.id;
                  setDetailsTicketId(null);
                  openAssignModal(id);
                }}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="User" className="w-4 h-4 mr-2" /> Assign Technician
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Ticket Details Panel */}

      {/* BEGIN: Technician Assignment Modal (UI only) */}
      {assignModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAssignModal}></div>
          <div className="relative box w-full max-w-md p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Assign Technician</h2>
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
                <label className="text-xs text-slate-500">Technician</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={assignForm.technician}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      technician: e.target.value,
                    }))
                  }
                >
                  {TECHNICIAN_OPTIONS.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">
                  Expected Visit Date
                </label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={assignForm.visitDate}
                  onChange={(e) =>
                    setAssignForm((prev) => ({
                      ...prev,
                      visitDate: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">Remarks</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={2}
                  placeholder="Optional note for the technician"
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
                onClick={handleAssignTechnician}
                className="btn btn-primary shadow-md"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Technician Assignment Modal */}
    </>
  );
}

export default Main;