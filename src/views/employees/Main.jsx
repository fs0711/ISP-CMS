import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Placeholder employee data
const DEPARTMENTS = [
  "Administration",
  "Billing",
  "Support",
  "Technical",
  "Sales",
  "Inventory",
  "Management",
];

const ROLES = [
  "Admin",
  "Billing",
  "Support",
  "Technician",
  "Inventory Manager",
  "Manager",
];

const EMPLOYMENT_STATUS_OPTIONS = ["Active", "On Leave", "Suspended", "Resigned"];
const ACCOUNT_STATUS_OPTIONS = ["Enabled", "Disabled"];

const INITIAL_EMPLOYEES = [
  {
    id: "EMP-1001",
    name: "Usman Khan",
    cnic: "42101-1234567-1",
    phone: "0301-1234567",
    email: "usman@isp.com",
    address: "House 12, Gulshan-e-Iqbal, Karachi",
    department: "Technical",
    role: "Technician",
    manager: "Kamran Iqbal",
    joiningDate: "01-Feb-2024",
    salary: 45000,
    username: "usman.khan",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Handles installations and repairs in Gulshan zone.",
    assignedTickets: ["TKT-1001", "TKT-1006"],
    assignedInstallations: ["EQ-1001 — Ahmed Ali", "EQ-1006 — Hina Farooq"],
  },
  {
    id: "EMP-1002",
    name: "Ayesha Siddiqui",
    cnic: "42201-2233445-3",
    phone: "0333-2345678",
    email: "ayesha@isp.com",
    address: "Flat 5B, DHA Phase 5, Karachi",
    department: "Billing",
    role: "Billing",
    manager: "Sana Malik",
    joiningDate: "15-Mar-2024",
    salary: 38000,
    username: "ayesha.siddiqui",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Handles subscriber invoices and payments.",
    assignedTickets: [],
    assignedInstallations: [],
  },
  {
    id: "EMP-1003",
    name: "Bilal Hussain",
    cnic: "42101-3344556-5",
    phone: "0321-3456789",
    email: "bilal.h@isp.com",
    address: "House 8, North Nazimabad, Karachi",
    department: "Administration",
    role: "Admin",
    manager: "—",
    joiningDate: "10-Jan-2023",
    salary: 85000,
    username: "bilal.hussain",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Oversees daily office administration.",
    assignedTickets: [],
    assignedInstallations: [],
  },
  {
    id: "EMP-1004",
    name: "Sana Malik",
    cnic: "42301-4455667-7",
    phone: "0345-4567890",
    email: "sana@isp.com",
    address: "House 21, Malir, Karachi",
    department: "Management",
    role: "Manager",
    manager: "—",
    joiningDate: "05-Jun-2022",
    salary: 120000,
    username: "sana.malik",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Manages billing and support departments.",
    assignedTickets: [],
    assignedInstallations: [],
  },
  {
    id: "EMP-1005",
    name: "Kamran Iqbal",
    cnic: "42501-5566778-9",
    phone: "0332-7890123",
    email: "kamran@isp.com",
    address: "House 45, Landhi, Karachi",
    department: "Technical",
    role: "Manager",
    manager: "Sana Malik",
    joiningDate: "20-Aug-2022",
    salary: 95000,
    username: "kamran.iqbal",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Leads the field technician team.",
    assignedTickets: ["TKT-1003", "TKT-1009"],
    assignedInstallations: ["EQ-1003 — Bilal Hussain"],
  },
  {
    id: "EMP-1006",
    name: "Hina Farooq",
    cnic: "42101-6677889-1",
    phone: "0301-6667788",
    email: "hina.f@isp.com",
    address: "House 7, Federal B Area, Karachi",
    department: "Support",
    role: "Support",
    manager: "Sana Malik",
    joiningDate: "12-Sep-2024",
    salary: 36000,
    username: "hina.farooq",
    employmentStatus: "On Leave",
    accountStatus: "Enabled",
    remarks: "Handles customer support calls and complaints.",
    assignedTickets: [],
    assignedInstallations: [],
  },
  {
    id: "EMP-1007",
    name: "Waqar Ahmed",
    cnic: "42401-7788990-3",
    phone: "0312-5556677",
    email: "waqar@isp.com",
    address: "House 33, Korangi, Karachi",
    department: "Technical",
    role: "Technician",
    manager: "Kamran Iqbal",
    joiningDate: "01-Apr-2024",
    salary: 42000,
    username: "waqar.ahmed",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Field technician for Korangi and Landhi zones.",
    assignedTickets: ["TKT-1007"],
    assignedInstallations: [],
  },
  {
    id: "EMP-1008",
    name: "Nadia Yousaf",
    cnic: "42101-8899001-5",
    phone: "0300-8889900",
    email: "nadia@isp.com",
    address: "House 15, Gulistan-e-Johar, Karachi",
    department: "Inventory",
    role: "Inventory Manager",
    manager: "Bilal Hussain",
    joiningDate: "18-Nov-2023",
    salary: 55000,
    username: "nadia.yousaf",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Manages equipment stock and store locations.",
    assignedTickets: [],
    assignedInstallations: [],
  },
  {
    id: "EMP-1009",
    name: "Faisal Rehman",
    cnic: "42201-9900112-7",
    phone: "0334-9990011",
    email: "faisal@isp.com",
    address: "House 3, Clifton, Karachi",
    department: "Sales",
    role: "Support",
    manager: "Sana Malik",
    joiningDate: "22-Dec-2023",
    salary: 34000,
    username: "faisal.rehman",
    employmentStatus: "Suspended",
    accountStatus: "Disabled",
    remarks: "Account suspended pending internal review.",
    assignedTickets: [],
    assignedInstallations: [],
  },
  {
    id: "EMP-1010",
    name: "Zainab Abbas",
    cnic: "42101-0011223-9",
    phone: "0315-0001122",
    email: "zainab@isp.com",
    address: "House 19, North Karachi, Karachi",
    department: "Billing",
    role: "Billing",
    manager: "Sana Malik",
    joiningDate: "03-May-2024",
    salary: 37000,
    username: "zainab.abbas",
    employmentStatus: "Resigned",
    accountStatus: "Disabled",
    remarks: "Left the company on 20-Jul-2026.",
    assignedTickets: [],
    assignedInstallations: [],
  },
  {
    id: "EMP-1011",
    name: "Bilal Sheikh",
    cnic: "42301-1122334-1",
    phone: "0333-1122334",
    email: "bilal.s@isp.com",
    address: "House 27, Malir, Karachi",
    department: "Technical",
    role: "Technician",
    manager: "Kamran Iqbal",
    joiningDate: "14-Jul-2024",
    salary: 41000,
    username: "bilal.sheikh",
    employmentStatus: "Active",
    accountStatus: "Enabled",
    remarks: "Handles equipment maintenance and repairs.",
    assignedTickets: ["TKT-1004"],
    assignedInstallations: ["EQ-1009 — Sana Malik"],
  },
];
// END: Placeholder employee data

const DEPARTMENT_FILTER_OPTIONS = ["All Departments", ...DEPARTMENTS];
const ROLE_FILTER_OPTIONS = ["All Roles", ...ROLES];
const EMPLOYMENT_STATUS_FILTER_OPTIONS = ["All Employment Statuses", ...EMPLOYMENT_STATUS_OPTIONS];
const ACCOUNT_STATUS_FILTER_OPTIONS = ["All Account Statuses", ...ACCOUNT_STATUS_OPTIONS];

const EMPLOYMENT_BADGE_CLASSES = {
  Active: "bg-success/20 text-success",
  "On Leave": "bg-warning/20 text-warning",
  Suspended: "bg-danger/20 text-danger",
  Resigned: "bg-slate-300 text-slate-600 dark:bg-darkmode-400 dark:text-slate-300",
};

const ACCOUNT_BADGE_CLASSES = {
  Enabled: "bg-success/20 text-success",
  Disabled: "bg-slate-200 text-slate-500 dark:bg-darkmode-300",
};

const ADD_FORM_DEFAULT = {
  employeeId: "",
  name: "",
  cnic: "",
  phone: "",
  email: "",
  address: "",
  department: DEPARTMENTS[0],
  role: ROLES[0],
  joiningDate: "",
  salary: "",
  manager: "",
  username: "",
  password: "",
  remarks: "",
};

const ASSIGN_ROLE_FORM_DEFAULT = {
  department: DEPARTMENTS[0],
  role: ROLES[0],
  manager: "",
};

function EmploymentBadge({ status }) {
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        EMPLOYMENT_BADGE_CLASSES[status]
      )}
    >
      {status}
    </div>
  );
}

function AccountBadge({ status }) {
  return (
    <div
      className={classnames(
        "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
        ACCOUNT_BADGE_CLASSES[status]
      )}
    >
      {status}
    </div>
  );
}

function Main() {
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [departmentDraft, setDepartmentDraft] = useState("All Departments");
  const [roleDraft, setRoleDraft] = useState("All Roles");
  const [employmentDraft, setEmploymentDraft] = useState("All Employment Statuses");
  const [accountDraft, setAccountDraft] = useState("All Account Statuses");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    department: "All Departments",
    role: "All Roles",
    employment: "All Employment Statuses",
    account: "All Account Statuses",
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [addForm, setAddForm] = useState(ADD_FORM_DEFAULT);

  const [detailsEmployeeId, setDetailsEmployeeId] = useState(null);

  const [assignRoleModal, setAssignRoleModal] = useState({ open: false, employeeId: null });
  const [assignRoleForm, setAssignRoleForm] = useState(ASSIGN_ROLE_FORM_DEFAULT);

  const [banner, setBanner] = useState(null);

  const showBanner = (message) => {
    setBanner(message);
    window.clearTimeout(showBanner._t);
    showBanner._t = window.setTimeout(() => setBanner(null), 3500);
  };

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      department: departmentDraft,
      role: roleDraft,
      employment: employmentDraft,
      account: accountDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setDepartmentDraft("All Departments");
    setRoleDraft("All Roles");
    setEmploymentDraft("All Employment Statuses");
    setAccountDraft("All Account Statuses");
    setAppliedFilters({
      search: "",
      department: "All Departments",
      role: "All Roles",
      employment: "All Employment Statuses",
      account: "All Account Statuses",
    });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      emp.id.toLowerCase().includes(appliedFilters.search) ||
      emp.name.toLowerCase().includes(appliedFilters.search) ||
      emp.phone.toLowerCase().includes(appliedFilters.search) ||
      emp.email.toLowerCase().includes(appliedFilters.search) ||
      emp.department.toLowerCase().includes(appliedFilters.search);

    const matchesDepartment =
      appliedFilters.department === "All Departments" ||
      emp.department === appliedFilters.department;

    const matchesRole =
      appliedFilters.role === "All Roles" || emp.role === appliedFilters.role;

    const matchesEmployment =
      appliedFilters.employment === "All Employment Statuses" ||
      emp.employmentStatus === appliedFilters.employment;

    const matchesAccount =
      appliedFilters.account === "All Account Statuses" ||
      emp.accountStatus === appliedFilters.account;

    return (
      matchesSearch &&
      matchesDepartment &&
      matchesRole &&
      matchesEmployment &&
      matchesAccount
    );
  });

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.employmentStatus === "Active").length;
  const technicians = employees.filter((e) => e.role === "Technician").length;
  const supportStaff = employees.filter((e) => e.role === "Support").length;
  const inactiveEmployees = employees.filter(
    (e) => e.employmentStatus === "Suspended" || e.employmentStatus === "Resigned"
  ).length;

  const detailsEmployee = employees.find((e) => e.id === detailsEmployeeId) || null;

  const openAddForm = () => {
    setAddForm({
      ...ADD_FORM_DEFAULT,
      employeeId: `EMP-${
        Math.max(...employees.map((e) => Number(e.id.replace("EMP-", "")) || 0), 1000) + 1
      }`,
    });
    setIsAddOpen(true);
  };
  const closeAddForm = () => setIsAddOpen(false);

  const handleSaveEmployee = () => {
    if (!addForm.name.trim() || !addForm.phone.trim()) {
      closeAddForm();
      return;
    }
    const newEmployee = {
      id: addForm.employeeId,
      name: addForm.name.trim(),
      cnic: addForm.cnic.trim() || "—",
      phone: addForm.phone.trim(),
      email: addForm.email.trim() || "—",
      address: addForm.address.trim() || "—",
      department: addForm.department,
      role: addForm.role,
      manager: addForm.manager.trim() || "—",
      joiningDate: addForm.joiningDate || "—",
      salary: Number(addForm.salary) || 0,
      username: addForm.username.trim() || addForm.name.trim().toLowerCase().replace(/\s+/g, "."),
      employmentStatus: "Active",
      accountStatus: "Enabled",
      remarks: addForm.remarks.trim() || "—",
      assignedTickets: [],
      assignedInstallations: [],
    };
    setEmployees((prev) => [newEmployee, ...prev]);
    showBanner(`Employee ${newEmployee.id} added.`);
    closeAddForm();
  };

  const openAssignRoleModal = (employeeId) => {
    const employee = employees.find((e) => e.id === employeeId);
    setAssignRoleForm({
      department: employee ? employee.department : DEPARTMENTS[0],
      role: employee ? employee.role : ROLES[0],
      manager: employee ? employee.manager : "",
    });
    setAssignRoleModal({ open: true, employeeId });
  };
  const closeAssignRoleModal = () => setAssignRoleModal({ open: false, employeeId: null });

  const handleAssignRole = () => {
    if (assignRoleModal.employeeId) {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === assignRoleModal.employeeId
            ? {
                ...e,
                department: assignRoleForm.department,
                role: assignRoleForm.role,
                manager: assignRoleForm.manager.trim() || e.manager,
              }
            : e
        )
      );
      showBanner(`Role updated for ${assignRoleModal.employeeId}.`);
    }
    closeAssignRoleModal();
  };

  const handleResetPassword = (employeeId) => {
    showBanner(`A temporary password has been generated for ${employeeId}.`);
  };

  const handleToggleAccount = (employeeId) => {
    setEmployees((prev) =>
      prev.map((e) =>
        e.id === employeeId
          ? {
              ...e,
              accountStatus: e.accountStatus === "Enabled" ? "Disabled" : "Enabled",
            }
          : e
      )
    );
    const employee = employees.find((e) => e.id === employeeId);
    const nextStatus = employee?.accountStatus === "Enabled" ? "Disabled" : "Enabled";
    showBanner(`${employeeId} account is now ${nextStatus}.`);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Employees</h2>
            <div className="text-slate-500 mt-1">
              Manage staff, departments and employee accounts.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={openAddForm}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Employee
            </button>
            <button type="button" className="btn btn-outline-secondary">
              <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export Employees
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
                placeholder="Search by Employee ID, Employee Name, Phone Number, Email or Department"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Department</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={departmentDraft}
                  onChange={(e) => setDepartmentDraft(e.target.value)}
                >
                  {DEPARTMENT_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Role</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={roleDraft}
                  onChange={(e) => setRoleDraft(e.target.value)}
                >
                  {ROLE_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">
                  Employment Status
                </label>
                <select
                  className="form-select box mt-1 w-full"
                  value={employmentDraft}
                  onChange={(e) => setEmploymentDraft(e.target.value)}
                >
                  {EMPLOYMENT_STATUS_FILTER_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 sm:col-span-6 lg:col-span-3">
                <label className="text-xs text-slate-500">Account Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={accountDraft}
                  onChange={(e) => setAccountDraft(e.target.value)}
                >
                  {ACCOUNT_STATUS_FILTER_OPTIONS.map((option) => (
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
              <div className="text-xl font-medium">{totalEmployees}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Employees</div>
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
              <div className="text-xl font-medium">{activeEmployees}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Active Employees
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="User" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">{technicians}</div>
              <div className="text-slate-500 text-xs mt-0.5">Technicians</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Users" className="w-8 h-8 mr-4 flex-none text-warning" />
            <div>
              <div className="text-xl font-medium">{supportStaff}</div>
              <div className="text-slate-500 text-xs mt-0.5">Support Staff</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-danger" />
            <div>
              <div className="text-xl font-medium">{inactiveEmployees}</div>
              <div className="text-slate-500 text-xs mt-0.5">
                Inactive Employees
              </div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Employees Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">Employee Records</h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredEmployees.length} result
              {filteredEmployees.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredEmployees.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="Users" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">No employees found.</div>
              <button
                type="button"
                onClick={openAddForm}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add Employee
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1400px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">EMPLOYEE ID</th>
                    <th className="whitespace-nowrap">EMPLOYEE NAME</th>
                    <th className="whitespace-nowrap">DEPARTMENT</th>
                    <th className="whitespace-nowrap">ROLE</th>
                    <th className="whitespace-nowrap">PHONE NUMBER</th>
                    <th className="whitespace-nowrap">EMAIL</th>
                    <th className="text-center whitespace-nowrap">
                      EMPLOYMENT STATUS
                    </th>
                    <th className="text-center whitespace-nowrap">
                      ACCOUNT STATUS
                    </th>
                    <th className="text-center whitespace-nowrap min-w-[200px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="intro-x">
                      <td className="whitespace-nowrap font-medium">{emp.id}</td>
                      <td className="whitespace-nowrap">{emp.name}</td>
                      <td className="whitespace-nowrap">{emp.department}</td>
                      <td className="whitespace-nowrap">{emp.role}</td>
                      <td className="whitespace-nowrap">{emp.phone}</td>
                      <td className="whitespace-nowrap">{emp.email}</td>
                      <td className="w-36">
                        <div className="flex justify-center">
                          <EmploymentBadge status={emp.employmentStatus} />
                        </div>
                      </td>
                      <td className="w-32">
                        <div className="flex justify-center">
                          <AccountBadge status={emp.accountStatus} />
                        </div>
                      </td>
                      <td className="table-report__action w-auto min-w-[200px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy
                            tag="a"
                            href=""
                            content="View Details"
                            onClick={(e) => {
                              e.preventDefault();
                              setDetailsEmployeeId(emp.id);
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
                            content="Assign Role"
                            onClick={(e) => {
                              e.preventDefault();
                              openAssignRoleModal(emp.id);
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
                            content="Reset Password"
                            onClick={(e) => {
                              e.preventDefault();
                              handleResetPassword(emp.id);
                            }}
                          >
                            <Lucide
                              icon="Key"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content={
                              emp.accountStatus === "Enabled"
                                ? "Disable Account"
                                : "Enable Account"
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleAccount(emp.id);
                            }}
                          >
                            <Lucide
                              icon="Power"
                              className={classnames(
                                "w-4 h-4 hover:text-primary",
                                emp.accountStatus === "Enabled"
                                  ? "text-success"
                                  : "text-slate-400"
                              )}
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="View Assigned Work"
                            onClick={(e) => {
                              e.preventDefault();
                              setDetailsEmployeeId(emp.id);
                            }}
                          >
                            <Lucide
                              icon="List"
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
        {/* END: Employees Table */}
      </div>

      {/* BEGIN: Add Employee Modal (UI only) */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAddForm}></div>
          <div className="relative box w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Add Employee</h2>
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
                <label className="text-xs text-slate-500">Employee ID</label>
                <input
                  type="text"
                  disabled
                  className="form-control box mt-1 w-full bg-slate-100 dark:bg-darkmode-800 text-slate-500"
                  value={addForm.employeeId}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Full Name</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Usman Khan"
                  value={addForm.name}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">CNIC</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 42101-1234567-1"
                  value={addForm.cnic}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, cnic: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Phone Number</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 0300-1234567"
                  value={addForm.phone}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Email</label>
                <input
                  type="email"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. usman@isp.com"
                  value={addForm.email}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Address</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="Optional"
                  value={addForm.address}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Department</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addForm.department}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, department: e.target.value }))
                  }
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Role</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addForm.role}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, role: e.target.value }))}
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Joining Date</label>
                <input
                  type="date"
                  className="form-control box mt-1 w-full"
                  value={addForm.joiningDate}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, joiningDate: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Salary (Optional, PKR)
                </label>
                <input
                  type="number"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 45000"
                  value={addForm.salary}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, salary: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Manager</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Kamran Iqbal"
                  value={addForm.manager}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, manager: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Username</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. usman.khan"
                  value={addForm.username}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, username: e.target.value }))}
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Password</label>
                <input
                  type="password"
                  className="form-control box mt-1 w-full"
                  placeholder="Set a temporary password"
                  value={addForm.password}
                  onChange={(e) => setAddForm((prev) => ({ ...prev, password: e.target.value }))}
                />
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Remarks</label>
                <textarea
                  className="form-control box mt-1 w-full"
                  rows={2}
                  placeholder="Optional note about this employee"
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
                onClick={handleSaveEmployee}
                className="btn btn-primary shadow-md"
              >
                Save Employee
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Add Employee Modal */}

      {/* BEGIN: Assign Role Modal (UI only) */}
      {assignRoleModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAssignRoleModal}></div>
          <div className="relative box w-full max-w-md p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Assign Role</h2>
              <button
                type="button"
                onClick={closeAssignRoleModal}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Department</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={assignRoleForm.department}
                  onChange={(e) =>
                    setAssignRoleForm((prev) => ({
                      ...prev,
                      department: e.target.value,
                    }))
                  }
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">System Role</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={assignRoleForm.role}
                  onChange={(e) =>
                    setAssignRoleForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Manager</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Kamran Iqbal"
                  value={assignRoleForm.manager}
                  onChange={(e) =>
                    setAssignRoleForm((prev) => ({ ...prev, manager: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeAssignRoleModal}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAssignRole}
                className="btn btn-primary shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Assign Role Modal */}

      {/* BEGIN: Employee Details Panel (UI only) */}
      {detailsEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDetailsEmployeeId(null)}
          ></div>
          <div className="relative box w-full max-w-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Employee Details</h2>
              <button
                type="button"
                onClick={() => setDetailsEmployeeId(null)}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Employee ID</div>
                <div className="font-medium">{detailsEmployee.id}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Full Name</div>
                <div className="font-medium">{detailsEmployee.name}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">CNIC</div>
                <div className="font-medium">{detailsEmployee.cnic}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Phone Number</div>
                <div className="font-medium">{detailsEmployee.phone}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Email</div>
                <div className="font-medium">{detailsEmployee.email}</div>
              </div>
              <div className="col-span-2">
                <div className="text-slate-500 text-xs">Address</div>
                <div className="font-medium">{detailsEmployee.address}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Department</div>
                <div className="font-medium">{detailsEmployee.department}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Role</div>
                <div className="font-medium">{detailsEmployee.role}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Manager</div>
                <div className="font-medium">{detailsEmployee.manager}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Joining Date</div>
                <div className="font-medium">{detailsEmployee.joiningDate}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">
                  Employment Status
                </div>
                <EmploymentBadge status={detailsEmployee.employmentStatus} />
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Account Status</div>
                <AccountBadge status={detailsEmployee.accountStatus} />
              </div>
              <div className="col-span-2">
                <div className="text-slate-500 text-xs">Remarks</div>
                <div className="font-medium">{detailsEmployee.remarks}</div>
              </div>
            </div>

            {detailsEmployee.role === "Technician" && (
              <>
                <div className="mt-6 border-t border-slate-200/60 dark:border-darkmode-400 pt-4">
                  <div className="text-sm font-medium mb-2">
                    Assigned Support Tickets
                  </div>
                  {detailsEmployee.assignedTickets.length === 0 ? (
                    <div className="text-slate-400 text-xs">
                      No tickets currently assigned.
                    </div>
                  ) : (
                    <ul className="space-y-1.5">
                      {detailsEmployee.assignedTickets.map((t) => (
                        <li
                          key={t}
                          className="text-xs bg-slate-100 dark:bg-darkmode-300 rounded-md px-3 py-2"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-4 border-t border-slate-200/60 dark:border-darkmode-400 pt-4">
                  <div className="text-sm font-medium mb-2">
                    Assigned Installations
                  </div>
                  {detailsEmployee.assignedInstallations.length === 0 ? (
                    <div className="text-slate-400 text-xs">
                      No installations currently assigned.
                    </div>
                  ) : (
                    <ul className="space-y-1.5">
                      {detailsEmployee.assignedInstallations.map((i) => (
                        <li
                          key={i}
                          className="text-xs bg-slate-100 dark:bg-darkmode-300 rounded-md px-3 py-2"
                        >
                          {i}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </>
            )}

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDetailsEmployeeId(null)}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = detailsEmployee.id;
                  setDetailsEmployeeId(null);
                  openAssignRoleModal(id);
                }}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Users" className="w-4 h-4 mr-2" /> Assign Role
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Employee Details Panel */}
    </>
  );
}

export default Main;