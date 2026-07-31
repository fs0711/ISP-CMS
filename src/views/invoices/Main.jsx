import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder invoice data
const INITIAL_INVOICES = [
  {
    id: "INV-2026-3001",
    subscriberId: "SUB-2201",
    subscriber: "Muhammad Ahmed Khan",
    phone: "0300-1234567",
    package: "20 Mbps Home",
    area: "Gulshan-e-Iqbal",
    billingMonth: "Jul 2026",
    charges: 2500,
    tax: 125,
    discount: 0,
    lateFee: 0,
    amount: 2625,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Paid",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3002",
    subscriberId: "SUB-2202",
    subscriber: "Ayesha Siddiqui",
    phone: "0333-2345678",
    package: "50 Mbps Home",
    area: "DHA Phase 5",
    billingMonth: "Jul 2026",
    charges: 3500,
    tax: 175,
    discount: 0,
    lateFee: 0,
    amount: 3675,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Unpaid",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3003",
    subscriberId: "SUB-2203",
    subscriber: "Bilal Hussain",
    phone: "0321-3456789",
    package: "100 Mbps Fiber",
    area: "North Nazimabad",
    billingMonth: "Jul 2026",
    charges: 5500,
    tax: 275,
    discount: 200,
    lateFee: 0,
    amount: 5575,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Paid",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3004",
    subscriberId: "SUB-2204",
    subscriber: "Sana Malik",
    phone: "0345-4567890",
    package: "10 Mbps Home",
    area: "Malir",
    billingMonth: "Jun 2026",
    charges: 1800,
    tax: 90,
    discount: 0,
    lateFee: 150,
    amount: 2040,
    dueDate: "05-Jul-2026",
    dueDateISO: "2026-07-05",
    paymentStatus: "Overdue",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3005",
    subscriberId: "SUB-2205",
    subscriber: "Usman Tariq",
    phone: "0312-5678901",
    package: "20 Mbps Home",
    area: "Korangi",
    billingMonth: "Jul 2026",
    charges: 2500,
    tax: 125,
    discount: 0,
    lateFee: 0,
    amount: 2625,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Unpaid",
    invoiceStatus: "Generated",
  },
  {
    id: "INV-2026-3006",
    subscriberId: "SUB-2206",
    subscriber: "Hina Farooq",
    phone: "0301-6789012",
    package: "100 Mbps Fiber",
    area: "Federal B Area",
    billingMonth: "Jul 2026",
    charges: 7500,
    tax: 375,
    discount: 0,
    lateFee: 0,
    amount: 7875,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Paid",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3007",
    subscriberId: "SUB-2207",
    subscriber: "Kamran Iqbal",
    phone: "0332-7890123",
    package: "50 Mbps Home",
    area: "Landhi",
    billingMonth: "Jun 2026",
    charges: 3500,
    tax: 175,
    discount: 0,
    lateFee: 200,
    amount: 3875,
    dueDate: "05-Jul-2026",
    dueDateISO: "2026-07-05",
    paymentStatus: "Overdue",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3008",
    subscriberId: "SUB-2208",
    subscriber: "Nadia Yousaf",
    phone: "0300-8901234",
    package: "10 Mbps Home",
    area: "Gulistan-e-Johar",
    billingMonth: "Jul 2026",
    charges: 1800,
    tax: 90,
    discount: 100,
    lateFee: 0,
    amount: 1790,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Partial",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3009",
    subscriberId: "SUB-2209",
    subscriber: "Faisal Rehman",
    phone: "0334-9012345",
    package: "100 Mbps Fiber",
    area: "Clifton",
    billingMonth: "Jul 2026",
    charges: 7500,
    tax: 375,
    discount: 0,
    lateFee: 0,
    amount: 7875,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Paid",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3010",
    subscriberId: "SUB-2210",
    subscriber: "Zainab Abbas",
    phone: "0315-0123456",
    package: "20 Mbps Home",
    area: "North Karachi",
    billingMonth: "Jul 2026",
    charges: 2500,
    tax: 125,
    discount: 0,
    lateFee: 0,
    amount: 2625,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Unpaid",
    invoiceStatus: "Generated",
  },
  {
    id: "INV-2026-3011",
    subscriberId: "SUB-2211",
    subscriber: "Tariq Mehmood",
    phone: "0308-1122334",
    package: "20 Mbps Home",
    area: "Malir",
    billingMonth: "Jun 2026",
    charges: 2500,
    tax: 125,
    discount: 0,
    lateFee: 150,
    amount: 2775,
    dueDate: "05-Jul-2026",
    dueDateISO: "2026-07-05",
    paymentStatus: "Overdue",
    invoiceStatus: "Sent",
  },
  {
    id: "INV-2026-3012",
    subscriberId: "SUB-2212",
    subscriber: "Rabia Naveed",
    phone: "0321-9988776",
    package: "50 Mbps Home",
    area: "Clifton",
    billingMonth: "Jul 2026",
    charges: 3500,
    tax: 175,
    discount: 0,
    lateFee: 0,
    amount: 3675,
    dueDate: "05-Aug-2026",
    dueDateISO: "2026-08-05",
    paymentStatus: "Partial",
    invoiceStatus: "Generated",
  },
];
// END: Placeholder invoice data

const INVOICE_STATUS_OPTIONS = ["All Invoice Statuses", "Generated", "Sent"];
const PAYMENT_STATUS_OPTIONS = [
  "All Payment Statuses",
  "Paid",
  "Unpaid",
  "Partial",
  "Overdue",
];
const MONTH_OPTIONS = [
  "All Months",
  ...Array.from(new Set(INITIAL_INVOICES.map((i) => i.billingMonth))),
];
const AREA_OPTIONS = [
  "All Areas",
  ...Array.from(new Set(INITIAL_INVOICES.map((i) => i.area))),
];

const PAYMENT_BADGE_CLASSES = {
  Paid: "bg-success/20 text-success",
  Unpaid: "bg-pending/20 text-pending",
  Partial: "bg-warning/20 text-warning",
  Overdue: "bg-danger/20 text-danger",
};

const INVOICE_BADGE_CLASSES = {
  Generated: "bg-primary/20 text-primary",
  Sent: "bg-slate-200 text-slate-500 dark:bg-darkmode-300",
};

function PaymentBadge({ status }) {
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        PAYMENT_BADGE_CLASSES[status]
      )}
    >
      {status}
    </div>
  );
}

function InvoiceStatusBadge({ status }) {
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        INVOICE_BADGE_CLASSES[status]
      )}
    >
      {status}
    </div>
  );
}

function Main() {
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [selectedIds, setSelectedIds] = useState([]);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [invoiceStatusDraft, setInvoiceStatusDraft] = useState("All Invoice Statuses");
  const [paymentStatusDraft, setPaymentStatusDraft] = useState("All Payment Statuses");
  const [monthDraft, setMonthDraft] = useState("All Months");
  const [areaDraft, setAreaDraft] = useState("All Areas");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    invoiceStatus: "All Invoice Statuses",
    paymentStatus: "All Payment Statuses",
    month: "All Months",
    area: "All Areas",
  });

  const [previewInvoiceId, setPreviewInvoiceId] = useState(null);
  const [banner, setBanner] = useState(null);

  const showBanner = (message) => {
    setBanner(message);
    window.clearTimeout(showBanner._t);
    showBanner._t = window.setTimeout(() => setBanner(null), 3500);
  };

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      invoiceStatus: invoiceStatusDraft,
      paymentStatus: paymentStatusDraft,
      month: monthDraft,
      area: areaDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setInvoiceStatusDraft("All Invoice Statuses");
    setPaymentStatusDraft("All Payment Statuses");
    setMonthDraft("All Months");
    setAreaDraft("All Areas");
    setAppliedFilters({
      search: "",
      invoiceStatus: "All Invoice Statuses",
      paymentStatus: "All Payment Statuses",
      month: "All Months",
      area: "All Areas",
    });
  };

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      inv.id.toLowerCase().includes(appliedFilters.search) ||
      inv.subscriber.toLowerCase().includes(appliedFilters.search) ||
      inv.subscriberId.toLowerCase().includes(appliedFilters.search) ||
      inv.phone.toLowerCase().includes(appliedFilters.search);

    const matchesInvoiceStatus =
      appliedFilters.invoiceStatus === "All Invoice Statuses" ||
      inv.invoiceStatus === appliedFilters.invoiceStatus;

    const matchesPaymentStatus =
      appliedFilters.paymentStatus === "All Payment Statuses" ||
      inv.paymentStatus === appliedFilters.paymentStatus;

    const matchesMonth =
      appliedFilters.month === "All Months" || inv.billingMonth === appliedFilters.month;

    const matchesArea =
      appliedFilters.area === "All Areas" || inv.area === appliedFilters.area;

    return (
      matchesSearch &&
      matchesInvoiceStatus &&
      matchesPaymentStatus &&
      matchesMonth &&
      matchesArea
    );
  });

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((i) => i.paymentStatus === "Paid").length;
  const unpaidInvoices = invoices.filter((i) => i.paymentStatus === "Unpaid").length;
  const overdueInvoices = invoices.filter((i) => i.paymentStatus === "Overdue").length;
  const totalInvoiceAmount = invoices.reduce((sum, i) => sum + i.amount, 0);

  const isAllSelected =
    filteredInvoices.length > 0 &&
    filteredInvoices.every((inv) => selectedIds.includes(inv.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !filteredInvoices.some((inv) => inv.id === id))
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...filteredInvoices
          .filter((inv) => !prev.includes(inv.id))
          .map((inv) => inv.id),
      ]);
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleGenerateInvoice = () => {
    showBanner("Use the Billing page to generate new monthly invoices.");
  };

  const handlePrintSelected = () => {
    if (selectedIds.length === 0) {
      showBanner("Select at least one invoice to print.");
      return;
    }
    showBanner(`Sending ${selectedIds.length} invoice(s) to the printer.`);
  };

  const handlePrintOne = (invoiceId) => {
    showBanner(`Sending invoice ${invoiceId} to the printer.`);
  };

  const handleDownloadPdf = (invoiceId) => {
    showBanner(`Downloading PDF for invoice ${invoiceId}.`);
  };

  const handleSendInvoice = (invoiceId) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === invoiceId ? { ...inv, invoiceStatus: "Sent" } : inv
      )
    );
    showBanner(`Invoice ${invoiceId} sent to subscriber.`);
  };

  const previewInvoice = invoices.find((inv) => inv.id === previewInvoiceId) || null;

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Invoices</h2>
            <div className="text-slate-500 mt-1">
              View, print and manage subscriber invoices.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={handleGenerateInvoice}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Generate Invoice
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
            </button>
            <button
              type="button"
              onClick={handlePrintSelected}
              className="btn btn-outline-secondary"
            >
              <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print Selected
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
                placeholder="Search by Invoice Number, Subscriber Name, Subscriber ID or Phone Number"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Invoice Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={invoiceStatusDraft}
                  onChange={(e) => setInvoiceStatusDraft(e.target.value)}
                >
                  {INVOICE_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Payment Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={paymentStatusDraft}
                  onChange={(e) => setPaymentStatusDraft(e.target.value)}
                >
                  {PAYMENT_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
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
            <Lucide icon="FileText" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">{totalInvoices}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Invoices</div>
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
              <div className="text-xl font-medium">{paidInvoices}</div>
              <div className="text-slate-500 text-xs mt-0.5">Paid</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Clock" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">{unpaidInvoices}</div>
              <div className="text-slate-500 text-xs mt-0.5">Unpaid</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="AlertCircle"
              className="w-8 h-8 mr-4 flex-none text-danger"
            />
            <div>
              <div className="text-xl font-medium">{overdueInvoices}</div>
              <div className="text-slate-500 text-xs mt-0.5">Overdue</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Wallet" className="w-8 h-8 mr-4 flex-none text-warning" />
            <div>
              <div className="text-xl font-medium">
                PKR {totalInvoiceAmount.toLocaleString()}
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                Total Invoice Amount
              </div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Invoice Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">Invoice Records</h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredInvoices.length} result
              {filteredInvoices.length === 1 ? "" : "s"}
              {selectedIds.length > 0 ? ` · ${selectedIds.length} selected` : ""}
            </div>
          </div>

          {filteredInvoices.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="FileText" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">No invoices found.</div>
              <button
                type="button"
                onClick={handleGenerateInvoice}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Generate Invoice
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
                        checked={isAllSelected}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th className="whitespace-nowrap">INVOICE NUMBER</th>
                    <th className="whitespace-nowrap">SUBSCRIBER</th>
                    <th className="whitespace-nowrap">PACKAGE</th>
                    <th className="whitespace-nowrap">BILLING MONTH</th>
                    <th className="text-right whitespace-nowrap">
                      INVOICE AMOUNT
                    </th>
                    <th className="whitespace-nowrap">DUE DATE</th>
                    <th className="text-center whitespace-nowrap">
                      PAYMENT STATUS
                    </th>
                    <th className="text-center whitespace-nowrap">
                      INVOICE STATUS
                    </th>
                    <th className="text-center whitespace-nowrap min-w-[180px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="intro-x">
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedIds.includes(inv.id)}
                          onChange={() => toggleSelectOne(inv.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap font-medium">{inv.id}</td>
                      <td className="whitespace-nowrap">{inv.subscriber}</td>
                      <td className="whitespace-nowrap">{inv.package}</td>
                      <td className="whitespace-nowrap">{inv.billingMonth}</td>
                      <td className="text-right whitespace-nowrap">
                        PKR {inv.amount.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap">{inv.dueDate}</td>
                      <td className="w-36">
                        <div className="flex justify-center">
                          <PaymentBadge status={inv.paymentStatus} />
                        </div>
                      </td>
                      <td className="w-32">
                        <div className="flex justify-center">
                          <InvoiceStatusBadge status={inv.invoiceStatus} />
                        </div>
                      </td>
                      <td className="table-report__action w-auto min-w-[180px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy
                            tag="a"
                            href=""
                            content="View Invoice"
                            onClick={(e) => {
                              e.preventDefault();
                              setPreviewInvoiceId(inv.id);
                            }}
                          >
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Print"
                            onClick={(e) => {
                              e.preventDefault();
                              handlePrintOne(inv.id);
                            }}
                          >
                            <Lucide
                              icon="Printer"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Download PDF"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDownloadPdf(inv.id);
                            }}
                          >
                            <Lucide
                              icon="Download"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Send Invoice"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSendInvoice(inv.id);
                            }}
                          >
                            <Lucide
                              icon="Send"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="View Subscriber">
                            <Lucide
                              icon="User"
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
        {/* END: Invoice Table */}
      </div>

      {/* BEGIN: Invoice Preview Modal */}
      {previewInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setPreviewInvoiceId(null)}
          ></div>
          <div className="relative box w-full max-w-xl p-0 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="text-lg font-medium">Invoice Preview</h2>
              <button
                type="button"
                onClick={() => setPreviewInvoiceId(null)}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="p-8">
              {/* Invoice letterhead */}
              <div className="flex items-start justify-between pb-5 border-b border-dashed border-slate-300 dark:border-darkmode-400">
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-darkmode-300 flex items-center justify-center mr-3 flex-none">
                    <Lucide icon="Wifi" className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-medium">Karachi Broadband Services</div>
                    <div className="text-slate-500 text-xs">
                      Internet Service Provider
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-slate-500 text-xs">Invoice Number</div>
                  <div className="font-medium">{previewInvoice.id}</div>
                </div>
              </div>

              {/* Subscriber + billing info */}
              <div className="grid grid-cols-2 gap-y-3 mt-5 text-sm">
                <div>
                  <div className="text-slate-500 text-xs">Subscriber Name</div>
                  <div className="font-medium">{previewInvoice.subscriber}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Subscriber ID</div>
                  <div className="font-medium">{previewInvoice.subscriberId}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Package</div>
                  <div className="font-medium">{previewInvoice.package}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Billing Month</div>
                  <div className="font-medium">{previewInvoice.billingMonth}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Due Date</div>
                  <div className="font-medium">{previewInvoice.dueDate}</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs">Payment Status</div>
                  <PaymentBadge status={previewInvoice.paymentStatus} />
                </div>
              </div>

              {/* Charges breakdown */}
              <div className="mt-6 border-t border-slate-200/60 dark:border-darkmode-400 pt-4">
                <div className="flex justify-between py-1.5 text-sm">
                  <div className="text-slate-500">Monthly Charges</div>
                  <div>PKR {previewInvoice.charges.toLocaleString()}</div>
                </div>
                <div className="flex justify-between py-1.5 text-sm">
                  <div className="text-slate-500">Taxes</div>
                  <div>PKR {previewInvoice.tax.toLocaleString()}</div>
                </div>
                <div className="flex justify-between py-1.5 text-sm">
                  <div className="text-slate-500">Discount</div>
                  <div>- PKR {previewInvoice.discount.toLocaleString()}</div>
                </div>
                <div className="flex justify-between py-1.5 text-sm">
                  <div className="text-slate-500">Late Fee</div>
                  <div>PKR {previewInvoice.lateFee.toLocaleString()}</div>
                </div>
                <div className="flex justify-between py-3 mt-2 border-t border-slate-200/60 dark:border-darkmode-400 text-base font-medium">
                  <div>Total Amount</div>
                  <div>PKR {previewInvoice.amount.toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 p-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <button
                type="button"
                onClick={() => setPreviewInvoiceId(null)}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleDownloadPdf(previewInvoice.id)}
                className="btn btn-outline-secondary"
              >
                <Lucide icon="Download" className="w-4 h-4 mr-2" /> Download PDF
              </button>
              <button
                type="button"
                onClick={() => handlePrintOne(previewInvoice.id)}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Invoice Preview Modal */}
    </>
  );
}

export default Main;