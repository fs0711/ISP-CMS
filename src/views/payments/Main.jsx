import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder payment data
const INITIAL_PAYMENTS = [
  {
    id: "RCPT-1001",
    subscriber: "Muhammad Ahmed Khan",
    phone: "0300-1234567",
    area: "Gulshan-e-Iqbal",
    invoice: "INV-2026-1001",
    amountPaid: 2500,
    outstanding: 0,
    method: "Cash",
    status: "Paid",
    date: "24-Jul-2026",
    dateISO: "2026-07-24",
  },
  {
    id: "RCPT-1002",
    subscriber: "Ayesha Siddiqui",
    phone: "0333-2345678",
    area: "DHA Phase 5",
    invoice: "INV-2026-1002",
    amountPaid: 0,
    outstanding: 3500,
    method: "—",
    status: "Pending",
    date: "—",
    dateISO: "2026-07-24",
  },
  {
    id: "RCPT-1003",
    subscriber: "Bilal Hussain",
    phone: "0321-3456789",
    area: "North Nazimabad",
    invoice: "INV-2026-1003",
    amountPaid: 5500,
    outstanding: 0,
    method: "Online",
    status: "Paid",
    date: "22-Jul-2026",
    dateISO: "2026-07-22",
  },
  {
    id: "RCPT-1004",
    subscriber: "Sana Malik",
    phone: "0345-4567890",
    area: "Malir",
    invoice: "INV-2026-1004",
    amountPaid: 3000,
    outstanding: 3000,
    method: "Cheque",
    status: "Partial",
    date: "20-Jul-2026",
    dateISO: "2026-07-20",
  },
  {
    id: "RCPT-1005",
    subscriber: "Usman Tariq",
    phone: "0312-5678901",
    area: "Korangi",
    invoice: "INV-2026-1005",
    amountPaid: 0,
    outstanding: 2500,
    method: "—",
    status: "Pending",
    date: "—",
    dateISO: "2026-07-24",
  },
  {
    id: "RCPT-1006",
    subscriber: "Hina Farooq",
    phone: "0301-6789012",
    area: "Federal B Area",
    invoice: "INV-2026-1006",
    amountPaid: 7500,
    outstanding: 0,
    method: "Cash",
    status: "Paid",
    date: "23-Jul-2026",
    dateISO: "2026-07-23",
  },
  {
    id: "RCPT-1007",
    subscriber: "Kamran Iqbal",
    phone: "0332-7890123",
    area: "Landhi",
    invoice: "INV-2026-1007",
    amountPaid: 3500,
    outstanding: 0,
    method: "Bank Transfer",
    status: "Paid",
    date: "21-Jul-2026",
    dateISO: "2026-07-21",
  },
  {
    id: "RCPT-1008",
    subscriber: "Nadia Yousaf",
    phone: "0300-8901234",
    area: "Gulistan-e-Johar",
    invoice: "INV-2026-1008",
    amountPaid: 600,
    outstanding: 600,
    method: "Cash",
    status: "Partial",
    date: "19-Jul-2026",
    dateISO: "2026-07-19",
  },
  {
    id: "RCPT-1009",
    subscriber: "Faisal Rehman",
    phone: "0334-9012345",
    area: "Clifton",
    invoice: "INV-2026-1009",
    amountPaid: 12000,
    outstanding: 0,
    method: "Online",
    status: "Refunded",
    date: "18-Jul-2026",
    dateISO: "2026-07-18",
  },
  {
    id: "RCPT-1010",
    subscriber: "Zainab Abbas",
    phone: "0315-0123456",
    area: "North Karachi",
    invoice: "INV-2026-1010",
    amountPaid: 1800,
    outstanding: 0,
    method: "Cash",
    status: "Paid",
    date: "24-Jul-2026",
    dateISO: "2026-07-24",
  },
];
// END: Placeholder payment data

const STATUS_OPTIONS = ["All Statuses", "Paid", "Pending", "Partial", "Refunded"];
const METHOD_OPTIONS = ["All Methods", "Cash", "Bank Transfer", "Online", "Cheque"];
const AREA_OPTIONS = [
  "All Areas",
  ...Array.from(new Set(INITIAL_PAYMENTS.map((p) => p.area))),
];
const SUBSCRIBER_OPTIONS = Array.from(
  new Set(INITIAL_PAYMENTS.map((p) => p.subscriber))
);

const STATUS_BADGE_CLASSES = {
  Paid: "bg-success/20 text-success",
  Pending: "bg-pending/20 text-pending",
  Partial: "bg-warning/20 text-warning",
  Refunded: "bg-slate-200 text-slate-500 dark:bg-darkmode-300",
};

const EMPTY_FORM = {
  subscriber: SUBSCRIBER_OPTIONS[0] || "",
  invoice: "",
  amountReceived: "",
  method: "Cash",
  reference: "",
  date: "",
  notes: "",
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
  const [payments, setPayments] = useState(INITIAL_PAYMENTS);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [statusDraft, setStatusDraft] = useState("All Statuses");
  const [methodDraft, setMethodDraft] = useState("All Methods");
  const [areaDraft, setAreaDraft] = useState("All Areas");
  const [dateFromDraft, setDateFromDraft] = useState("");
  const [dateToDraft, setDateToDraft] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "All Statuses",
    method: "All Methods",
    area: "All Areas",
    dateFrom: "",
    dateTo: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      status: statusDraft,
      method: methodDraft,
      area: areaDraft,
      dateFrom: dateFromDraft,
      dateTo: dateToDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setStatusDraft("All Statuses");
    setMethodDraft("All Methods");
    setAreaDraft("All Areas");
    setDateFromDraft("");
    setDateToDraft("");
    setAppliedFilters({
      search: "",
      status: "All Statuses",
      method: "All Methods",
      area: "All Areas",
      dateFrom: "",
      dateTo: "",
    });
  };

  const filteredPayments = payments.filter((p) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      p.id.toLowerCase().includes(appliedFilters.search) ||
      p.subscriber.toLowerCase().includes(appliedFilters.search) ||
      p.phone.toLowerCase().includes(appliedFilters.search) ||
      p.invoice.toLowerCase().includes(appliedFilters.search);

    const matchesStatus =
      appliedFilters.status === "All Statuses" || p.status === appliedFilters.status;

    const matchesMethod =
      appliedFilters.method === "All Methods" || p.method === appliedFilters.method;

    const matchesArea =
      appliedFilters.area === "All Areas" || p.area === appliedFilters.area;

    const matchesDateFrom =
      appliedFilters.dateFrom === "" || p.dateISO >= appliedFilters.dateFrom;

    const matchesDateTo =
      appliedFilters.dateTo === "" || p.dateISO <= appliedFilters.dateTo;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesMethod &&
      matchesArea &&
      matchesDateFrom &&
      matchesDateTo
    );
  });

  const openModal = () => {
    setForm(EMPTY_FORM);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const selectedSubscriberRecord = payments.find(
    (p) => p.subscriber === form.subscriber
  );
  const outstandingForSelected = selectedSubscriberRecord
    ? selectedSubscriberRecord.outstanding
    : 0;

  const handleSavePayment = () => {
    const received = Number(form.amountReceived) || 0;
    if (!form.subscriber || received <= 0) {
      closeModal();
      return;
    }
    const newOutstanding = Math.max(outstandingForSelected - received, 0);
    const nextNumber =
      Math.max(
        ...payments.map((p) => Number(p.id.replace("RCPT-", "")) || 0),
        1000
      ) + 1;

    const newPayment = {
      id: `RCPT-${nextNumber}`,
      subscriber: form.subscriber,
      phone: selectedSubscriberRecord?.phone || "—",
      area: selectedSubscriberRecord?.area || "—",
      invoice: form.invoice.trim() || `INV-2026-${nextNumber}`,
      amountPaid: received,
      outstanding: newOutstanding,
      method: form.method,
      status: newOutstanding === 0 ? "Paid" : "Partial",
      date: form.date || "—",
      dateISO: form.date || "2026-07-24",
    };

    setPayments((prev) => [newPayment, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Payments</h2>
            <div className="text-slate-500 mt-1">
              Record and manage subscriber payments.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={openModal}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Record Payment
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
              Payments
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Printer" className="w-4 h-4 mr-2" /> Print Daily
              Collection
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
                placeholder="Search by Subscriber ID, Customer Name, Phone Number, Receipt No or Invoice No"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
                <label className="text-xs text-slate-500">Payment Status</label>
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
                <label className="text-xs text-slate-500">Payment Method</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={methodDraft}
                  onChange={(e) => setMethodDraft(e.target.value)}
                >
                  {METHOD_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
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
            <Lucide
              icon="CreditCard"
              className="w-8 h-8 mr-4 flex-none text-success"
            />
            <div>
              <div className="text-xl font-medium">PKR 26,900</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Today's Collection
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="Calendar"
              className="w-8 h-8 mr-4 flex-none text-primary"
            />
            <div>
              <div className="text-xl font-medium">PKR 412,600</div>
              <div className="text-slate-500 text-xs mt-0.5">
                This Month Collection
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Clock" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">62</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Pending Payments
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="AlertCircle"
              className="w-8 h-8 mr-4 flex-none text-warning"
            />
            <div>
              <div className="text-xl font-medium">18</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Partial Payments
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="List" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">1,046</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Total Transactions
              </div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Payments Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Payment Records
            </h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredPayments.length} result
              {filteredPayments.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredPayments.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide
                icon="CreditCard"
                className="w-12 h-12 text-slate-300 mb-3"
              />
              <div className="text-slate-500 mb-5">
                No payment records found.
              </div>
              <button
                type="button"
                onClick={openModal}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Record Payment
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1240px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">RECEIPT NO</th>
                    <th className="whitespace-nowrap">SUBSCRIBER</th>
                    <th className="whitespace-nowrap">PHONE</th>
                    <th className="whitespace-nowrap">INVOICE NO</th>
                    <th className="text-right whitespace-nowrap">
                      AMOUNT PAID
                    </th>
                    <th className="text-right whitespace-nowrap">
                      OUTSTANDING BALANCE
                    </th>
                    <th className="whitespace-nowrap">PAYMENT METHOD</th>
                    <th className="whitespace-nowrap">PAYMENT DATE</th>
                    <th className="text-center whitespace-nowrap">
                      PAYMENT STATUS
                    </th>
                    <th className="text-center whitespace-nowrap min-w-[160px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => (
                    <tr key={p.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">{p.id}</td>
                      <td className="whitespace-nowrap">{p.subscriber}</td>
                      <td className="whitespace-nowrap">{p.phone}</td>
                      <td className="whitespace-nowrap">{p.invoice}</td>
                      <td className="text-right whitespace-nowrap">
                        PKR {p.amountPaid.toLocaleString()}
                      </td>
                      <td
                        className={classnames(
                          "text-right whitespace-nowrap",
                          p.outstanding > 0 ? "text-danger" : "text-success"
                        )}
                      >
                        PKR {p.outstanding.toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap">{p.method}</td>
                      <td className="whitespace-nowrap">{p.date}</td>
                      <td className="w-40">
                        <div className="flex justify-center">
                          <StatusBadge status={p.status} />
                        </div>
                      </td>
                      <td className="table-report__action w-auto min-w-[160px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy tag="a" href="" content="View Receipt">
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="Print Receipt">
                            <Lucide
                              icon="Printer"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="View Subscriber">
                            <Lucide
                              icon="User"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="Payment Details">
                            <Lucide
                              icon="Info"
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
        {/* END: Payments Table */}
      </div>

      {/* BEGIN: Record Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
          ></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Record Payment</h2>
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
                <label className="text-xs text-slate-500">Subscriber</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={form.subscriber}
                  onChange={(e) =>
                    handleFormChange("subscriber", e.target.value)
                  }
                >
                  {SUBSCRIBER_OPTIONS.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">Invoice</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. INV-2026-1011"
                  value={form.invoice}
                  onChange={(e) => handleFormChange("invoice", e.target.value)}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Outstanding Amount
                </label>
                <input
                  type="text"
                  disabled
                  className="form-control box mt-1 w-full bg-slate-100 dark:bg-darkmode-800 text-slate-500"
                  value={`PKR ${outstandingForSelected.toLocaleString()}`}
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Amount Received (PKR)
                </label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 2500"
                  value={form.amountReceived}
                  onChange={(e) =>
                    handleFormChange("amountReceived", e.target.value)
                  }
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Payment Method
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={form.method}
                  onChange={(e) => handleFormChange("method", e.target.value)}
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Online">Online</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Transaction Reference
                </label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="Optional"
                  value={form.reference}
                  onChange={(e) =>
                    handleFormChange("reference", e.target.value)
                  }
                />
              </div>

              <div className="col-span-6">
                <label className="text-xs text-slate-500">Payment Date</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={form.date}
                  onChange={(e) => handleFormChange("date", e.target.value)}
                />
              </div>

              <div className="col-span-12">
                <label className="text-xs text-slate-500">Notes</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={3}
                  placeholder="Optional note about this payment"
                  value={form.notes}
                  onChange={(e) => handleFormChange("notes", e.target.value)}
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
                onClick={handleSavePayment}
                className="btn btn-primary shadow-md"
              >
                Save Payment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Record Payment Modal */}
    </>
  );
}

export default Main;