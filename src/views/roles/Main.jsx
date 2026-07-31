import { Lucide, Tippy } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// BEGIN: Roles & permissions setup
const MODULES = [
  "Dashboard",
  "Subscribers",
  "Packages",
  "Billing",
  "Payments",
  "Invoices",
  "Resellers / LCO",
  "Support Tickets",
  "Inventory",
  "Network",
  "Employees",
  "Users & Roles",
  "Reports",
  "Settings",
];

const ACTIONS = [
  { key: "view", label: "View" },
  { key: "create", label: "Create" },
  { key: "edit", label: "Edit" },
  { key: "delete", label: "Delete" },
  { key: "export", label: "Export" },
];

const PRESETS = {
  full: { view: true, create: true, edit: true, delete: true, export: true },
  none: { view: false, create: false, edit: false, delete: false, export: false },
  viewOnly: { view: true, create: false, edit: false, delete: false, export: false },
  viewCreateEdit: { view: true, create: true, edit: true, delete: false, export: false },
  viewCreateEditExport: { view: true, create: true, edit: true, delete: false, export: true },
};

function buildPermissions(overrides, defaultPreset) {
  const perms = {};
  MODULES.forEach((m) => {
    perms[m] = { ...(overrides[m] || defaultPreset) };
  });
  return perms;
}

const DEFAULT_ROLES = [
  {
    name: "Administrator",
    isSystem: true,
    permissions: buildPermissions({}, PRESETS.full),
  },
  {
    name: "Manager",
    isSystem: true,
    permissions: buildPermissions(
      { "Users & Roles": PRESETS.viewOnly, Settings: PRESETS.viewOnly },
      PRESETS.viewCreateEditExport
    ),
  },
  {
    name: "Billing Staff",
    isSystem: true,
    permissions: buildPermissions(
      {
        Billing: PRESETS.viewCreateEditExport,
        Payments: PRESETS.viewCreateEditExport,
        Invoices: PRESETS.viewCreateEditExport,
        "Users & Roles": PRESETS.none,
        Settings: PRESETS.none,
      },
      PRESETS.viewOnly
    ),
  },
  {
    name: "Support Staff",
    isSystem: true,
    permissions: buildPermissions(
      {
        "Support Tickets": PRESETS.viewCreateEditExport,
        Subscribers: PRESETS.viewCreateEdit,
        "Users & Roles": PRESETS.none,
        Settings: PRESETS.none,
      },
      PRESETS.viewOnly
    ),
  },
  {
    name: "Technician",
    isSystem: true,
    permissions: buildPermissions(
      {
        "Support Tickets": PRESETS.viewCreateEdit,
        Inventory: PRESETS.viewCreateEdit,
        Network: PRESETS.viewCreateEdit,
        "Users & Roles": PRESETS.none,
        Settings: PRESETS.none,
        Billing: PRESETS.none,
        Payments: PRESETS.none,
      },
      PRESETS.viewOnly
    ),
  },
  {
    name: "Inventory Manager",
    isSystem: true,
    permissions: buildPermissions(
      {
        Inventory: PRESETS.viewCreateEditExport,
        Network: PRESETS.viewOnly,
        "Users & Roles": PRESETS.none,
        Settings: PRESETS.none,
      },
      PRESETS.viewOnly
    ),
  },
  {
    name: "Read Only",
    isSystem: true,
    permissions: buildPermissions({}, PRESETS.viewOnly),
  },
];
// END: Roles & permissions setup

// BEGIN: Placeholder user data
const DEPARTMENTS = [
  "Administration",
  "Billing",
  "Support",
  "Technical",
  "Sales",
  "Inventory",
  "Management",
];

const ROLE_NAMES = DEFAULT_ROLES.map((r) => r.name);

const INITIAL_USERS = [
  {
    username: "akhan",
    employeeName: "Ahmed Khan",
    department: "Billing",
    role: "Billing Staff",
    email: "akhan@isp.com",
    phone: "0300-1112233",
    lastLogin: "Today 09:15 AM",
    accountStatus: "Active",
    createdDate: "01-Feb-2024",
    passwordLastChanged: "10-Jun-2026",
  },
  {
    username: "b.hussain",
    employeeName: "Bilal Hussain",
    department: "Administration",
    role: "Administrator",
    email: "bilal.h@isp.com",
    phone: "0321-3456789",
    lastLogin: "Today 08:40 AM",
    accountStatus: "Active",
    createdDate: "10-Jan-2023",
    passwordLastChanged: "01-Jul-2026",
  },
  {
    username: "s.malik",
    employeeName: "Sana Malik",
    department: "Management",
    role: "Manager",
    email: "sana@isp.com",
    phone: "0345-4567890",
    lastLogin: "Yesterday 06:20 PM",
    accountStatus: "Active",
    createdDate: "05-Jun-2022",
    passwordLastChanged: "15-May-2026",
  },
  {
    username: "u.khan",
    employeeName: "Usman Khan",
    department: "Technical",
    role: "Technician",
    email: "usman@isp.com",
    phone: "0301-1234567",
    lastLogin: "Today 07:55 AM",
    accountStatus: "Active",
    createdDate: "01-Feb-2024",
    passwordLastChanged: "20-Jun-2026",
  },
  {
    username: "h.farooq",
    employeeName: "Hina Farooq",
    department: "Support",
    role: "Support Staff",
    email: "hina.f@isp.com",
    phone: "0301-6667788",
    lastLogin: "22-Jul-2026 04:10 PM",
    accountStatus: "Active",
    createdDate: "12-Sep-2024",
    passwordLastChanged: "12-Sep-2024",
  },
  {
    username: "n.yousaf",
    employeeName: "Nadia Yousaf",
    department: "Inventory",
    role: "Inventory Manager",
    email: "nadia@isp.com",
    phone: "0300-8889900",
    lastLogin: "Today 09:02 AM",
    accountStatus: "Active",
    createdDate: "18-Nov-2023",
    passwordLastChanged: "05-Jul-2026",
  },
  {
    username: "f.rehman",
    employeeName: "Faisal Rehman",
    department: "Sales",
    role: "Read Only",
    email: "faisal@isp.com",
    phone: "0334-9990011",
    lastLogin: "18-Jul-2026 11:30 AM",
    accountStatus: "Disabled",
    createdDate: "22-Dec-2023",
    passwordLastChanged: "22-Dec-2023",
  },
  {
    username: "k.iqbal",
    employeeName: "Kamran Iqbal",
    department: "Technical",
    role: "Manager",
    email: "kamran@isp.com",
    phone: "0332-7890123",
    lastLogin: "Today 08:15 AM",
    accountStatus: "Active",
    createdDate: "20-Aug-2022",
    passwordLastChanged: "02-Jul-2026",
  },
  {
    username: "z.abbas",
    employeeName: "Zainab Abbas",
    department: "Billing",
    role: "Billing Staff",
    email: "zainab@isp.com",
    phone: "0315-0001122",
    lastLogin: "20-Jul-2026 02:45 PM",
    accountStatus: "Locked",
    createdDate: "03-May-2024",
    passwordLastChanged: "03-May-2024",
  },
  {
    username: "w.ahmed",
    employeeName: "Waqar Ahmed",
    department: "Technical",
    role: "Technician",
    email: "waqar@isp.com",
    phone: "0312-5556677",
    lastLogin: "Today 07:30 AM",
    accountStatus: "Active",
    createdDate: "01-Apr-2024",
    passwordLastChanged: "18-Jun-2026",
  },
];
// END: Placeholder user data

const ROLE_FILTER_OPTIONS = ["All Roles", ...ROLE_NAMES];
const DEPARTMENT_FILTER_OPTIONS = ["All Departments", ...DEPARTMENTS];
const ACCOUNT_STATUS_OPTIONS = ["Active", "Disabled", "Locked"];
const ACCOUNT_STATUS_FILTER_OPTIONS = ["All Account Statuses", ...ACCOUNT_STATUS_OPTIONS];

const ACCOUNT_BADGE_CLASSES = {
  Active: "bg-success/20 text-success",
  Disabled: "bg-slate-300 text-slate-600 dark:bg-darkmode-400 dark:text-slate-300",
  Locked: "bg-warning/20 text-warning",
};

const ADD_USER_FORM_DEFAULT = {
  employeeName: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  role: ROLE_NAMES[0],
  department: DEPARTMENTS[0],
  accountStatus: "Active",
};

const CHANGE_ROLE_FORM_DEFAULT = { role: ROLE_NAMES[0] };

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
  const [users, setUsers] = useState(INITIAL_USERS);
  const [roles, setRoles] = useState(DEFAULT_ROLES);

  // Draft filter values (bound to inputs, only applied on "Search")
  const [searchDraft, setSearchDraft] = useState("");
  const [roleDraft, setRoleDraft] = useState("All Roles");
  const [departmentDraft, setDepartmentDraft] = useState("All Departments");
  const [accountDraft, setAccountDraft] = useState("All Account Statuses");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    role: "All Roles",
    department: "All Departments",
    account: "All Account Statuses",
  });

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [addUserForm, setAddUserForm] = useState(ADD_USER_FORM_DEFAULT);

  const [detailsUsername, setDetailsUsername] = useState(null);

  const [changeRoleModal, setChangeRoleModal] = useState({ open: false, username: null });
  const [changeRoleForm, setChangeRoleForm] = useState(CHANGE_ROLE_FORM_DEFAULT);

  const [roleEditor, setRoleEditor] = useState({ open: false, roleName: null });
  const [roleEditorName, setRoleEditorName] = useState("");
  const [roleEditorPermissions, setRoleEditorPermissions] = useState(null);

  const [banner, setBanner] = useState(null);

  const showBanner = (message) => {
    setBanner(message);
    window.clearTimeout(showBanner._t);
    showBanner._t = window.setTimeout(() => setBanner(null), 3500);
  };

  const handleSearch = () => {
    setAppliedFilters({
      search: searchDraft.trim().toLowerCase(),
      role: roleDraft,
      department: departmentDraft,
      account: accountDraft,
    });
  };

  const handleReset = () => {
    setSearchDraft("");
    setRoleDraft("All Roles");
    setDepartmentDraft("All Departments");
    setAccountDraft("All Account Statuses");
    setAppliedFilters({
      search: "",
      role: "All Roles",
      department: "All Departments",
      account: "All Account Statuses",
    });
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      appliedFilters.search === "" ||
      u.username.toLowerCase().includes(appliedFilters.search) ||
      u.employeeName.toLowerCase().includes(appliedFilters.search) ||
      u.email.toLowerCase().includes(appliedFilters.search) ||
      u.phone.toLowerCase().includes(appliedFilters.search) ||
      u.role.toLowerCase().includes(appliedFilters.search);

    const matchesRole = appliedFilters.role === "All Roles" || u.role === appliedFilters.role;

    const matchesDepartment =
      appliedFilters.department === "All Departments" ||
      u.department === appliedFilters.department;

    const matchesAccount =
      appliedFilters.account === "All Account Statuses" ||
      u.accountStatus === appliedFilters.account;

    return matchesSearch && matchesRole && matchesDepartment && matchesAccount;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.accountStatus === "Active").length;
  const disabledUsers = users.filter((u) => u.accountStatus === "Disabled").length;
  const customRoles = roles.filter((r) => !r.isSystem).length;

  const detailsUser = users.find((u) => u.username === detailsUsername) || null;

  // BEGIN: Add User
  const openAddUser = () => {
    setAddUserForm(ADD_USER_FORM_DEFAULT);
    setIsAddUserOpen(true);
  };
  const closeAddUser = () => setIsAddUserOpen(false);

  const handleCreateUser = () => {
    if (!addUserForm.employeeName.trim() || !addUserForm.username.trim()) {
      closeAddUser();
      return;
    }
    if (addUserForm.password !== addUserForm.confirmPassword) {
      showBanner("Passwords do not match. Please try again.");
      return;
    }
    const today = "26-Jul-2026";
    const newUser = {
      username: addUserForm.username.trim(),
      employeeName: addUserForm.employeeName.trim(),
      department: addUserForm.department,
      role: addUserForm.role,
      email: addUserForm.email.trim() || "—",
      phone: addUserForm.phone.trim() || "—",
      lastLogin: "Never",
      accountStatus: addUserForm.accountStatus,
      createdDate: today,
      passwordLastChanged: today,
    };
    setUsers((prev) => [newUser, ...prev]);
    showBanner(`User account ${newUser.username} created.`);
    closeAddUser();
  };
  // END: Add User

  // BEGIN: Reset Password / Enable-Disable
  const handleResetPassword = (username) => {
    showBanner(`A temporary password has been generated for ${username}.`);
  };

  const handleToggleAccount = (username) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.username === username
          ? { ...u, accountStatus: u.accountStatus === "Active" ? "Disabled" : "Active" }
          : u
      )
    );
    const user = users.find((u) => u.username === username);
    const nextStatus = user?.accountStatus === "Active" ? "Disabled" : "Active";
    showBanner(`${username} is now ${nextStatus}.`);
  };
  // END: Reset Password / Enable-Disable

  // BEGIN: Change Role
  const openChangeRole = (username) => {
    const user = users.find((u) => u.username === username);
    setChangeRoleForm({ role: user ? user.role : ROLE_NAMES[0] });
    setChangeRoleModal({ open: true, username });
  };
  const closeChangeRole = () => setChangeRoleModal({ open: false, username: null });

  const handleChangeRole = () => {
    if (changeRoleModal.username) {
      setUsers((prev) =>
        prev.map((u) =>
          u.username === changeRoleModal.username ? { ...u, role: changeRoleForm.role } : u
        )
      );
      showBanner(`${changeRoleModal.username} is now assigned the ${changeRoleForm.role} role.`);
    }
    closeChangeRole();
  };
  // END: Change Role

  // BEGIN: Role Editor (Create / Edit)
  const openCreateRole = () => {
    setRoleEditorName("");
    setRoleEditorPermissions(buildPermissions({}, PRESETS.none));
    setRoleEditor({ open: true, roleName: null });
  };

  const openEditRole = (roleName) => {
    const role = roles.find((r) => r.name === roleName);
    if (!role) return;
    setRoleEditorName(role.name);
    setRoleEditorPermissions(JSON.parse(JSON.stringify(role.permissions)));
    setRoleEditor({ open: true, roleName });
  };

  const closeRoleEditor = () => setRoleEditor({ open: false, roleName: null });

  const toggleCell = (moduleName, actionKey) => {
    setRoleEditorPermissions((prev) => ({
      ...prev,
      [moduleName]: {
        ...prev[moduleName],
        [actionKey]: !prev[moduleName][actionKey],
      },
    }));
  };

  const toggleColumn = (actionKey) => {
    setRoleEditorPermissions((prev) => {
      const allChecked = MODULES.every((m) => prev[m][actionKey]);
      const next = {};
      MODULES.forEach((m) => {
        next[m] = { ...prev[m], [actionKey]: !allChecked };
      });
      return next;
    });
  };

  const handleSaveRole = () => {
    if (!roleEditorName.trim()) {
      closeRoleEditor();
      return;
    }
    if (roleEditor.roleName) {
      // Editing an existing role
      setRoles((prev) =>
        prev.map((r) =>
          r.name === roleEditor.roleName
            ? { ...r, name: roleEditorName.trim(), permissions: roleEditorPermissions }
            : r
        )
      );
      showBanner(`Role "${roleEditorName.trim()}" updated.`);
    } else {
      // Creating a new role
      setRoles((prev) => [
        ...prev,
        { name: roleEditorName.trim(), isSystem: false, permissions: roleEditorPermissions },
      ]);
      showBanner(`Role "${roleEditorName.trim()}" created.`);
    }
    closeRoleEditor();
  };

  const handleDuplicateRole = (roleName) => {
    const role = roles.find((r) => r.name === roleName);
    if (!role) return;
    let copyName = `${role.name} (Copy)`;
    let suffix = 2;
    while (roles.some((r) => r.name === copyName)) {
      copyName = `${role.name} (Copy ${suffix})`;
      suffix += 1;
    }
    setRoles((prev) => [
      ...prev,
      {
        name: copyName,
        isSystem: false,
        permissions: JSON.parse(JSON.stringify(role.permissions)),
      },
    ]);
    showBanner(`Role "${role.name}" duplicated as "${copyName}".`);
  };

  const handleDeleteRole = (roleName) => {
    const role = roles.find((r) => r.name === roleName);
    if (!role || role.isSystem) return;
    setRoles((prev) => prev.filter((r) => r.name !== roleName));
    showBanner(`Role "${roleName}" deleted.`);
  };
  // END: Role Editor

  return (
    <>
      <div className="grid grid-cols-12 gap-6">
        {/* BEGIN: Page Header */}
        <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-medium">Users & Roles</h2>
            <div className="text-slate-500 mt-1">
              Manage system users, roles and permissions.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
            <button
              type="button"
              onClick={openAddUser}
              className="btn btn-primary shadow-md"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add User
            </button>
            <button
              type="button"
              onClick={openCreateRole}
              className="btn btn-outline-secondary"
            >
              <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Create Role
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
                placeholder="Search by User Name, Employee Name, Email, Phone Number or Role"
              />
            </div>

            {/* BEGIN: Filters */}
            <div className="grid grid-cols-12 gap-3 mt-4">
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
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
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
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
              <div className="col-span-12 sm:col-span-6 lg:col-span-4">
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
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Users" className="w-8 h-8 mr-4 flex-none text-primary" />
            <div>
              <div className="text-xl font-medium">{totalUsers}</div>
              <div className="text-slate-500 text-xs mt-0.5">Total Users</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide
              icon="CheckCircle2"
              className="w-8 h-8 mr-4 flex-none text-success"
            />
            <div>
              <div className="text-xl font-medium">{activeUsers}</div>
              <div className="text-slate-500 text-xs mt-0.5">Active Users</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-danger" />
            <div>
              <div className="text-xl font-medium">{disabledUsers}</div>
              <div className="text-slate-500 text-xs mt-0.5">Disabled Users</div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
          <div className="box p-5 flex items-center">
            <Lucide icon="Shield" className="w-8 h-8 mr-4 flex-none text-pending" />
            <div>
              <div className="text-xl font-medium">{customRoles}</div>
              <div className="text-slate-500 text-xs mt-0.5">Custom Roles</div>
            </div>
          </div>
        </div>
        {/* END: Summary Cards */}

        {/* BEGIN: Users Table */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">System Users</h2>
            <div className="ml-auto text-slate-500 text-sm">
              {filteredUsers.length} result{filteredUsers.length === 1 ? "" : "s"}
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            // BEGIN: Empty State
            <div className="intro-y box p-10 mt-5 flex flex-col items-center justify-center text-center">
              <Lucide icon="Users" className="w-12 h-12 text-slate-300 mb-3" />
              <div className="text-slate-500 mb-5">No users found.</div>
              <button
                type="button"
                onClick={openAddUser}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Plus" className="w-4 h-4 mr-2" /> Add User
              </button>
            </div>
          ) : (
            // END: Empty State
            <div className="intro-y w-full overflow-x-auto mt-5">
              <table className="table table-report w-full min-w-[1360px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">USERNAME</th>
                    <th className="whitespace-nowrap">EMPLOYEE NAME</th>
                    <th className="whitespace-nowrap">DEPARTMENT</th>
                    <th className="whitespace-nowrap">ROLE</th>
                    <th className="whitespace-nowrap">EMAIL</th>
                    <th className="whitespace-nowrap">PHONE NUMBER</th>
                    <th className="whitespace-nowrap">LAST LOGIN</th>
                    <th className="text-center whitespace-nowrap">
                      ACCOUNT STATUS
                    </th>
                    <th className="text-center whitespace-nowrap min-w-[180px]">
                      ACTIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.username} className="intro-x">
                      <td className="whitespace-nowrap font-medium">{u.username}</td>
                      <td className="whitespace-nowrap">{u.employeeName}</td>
                      <td className="whitespace-nowrap">{u.department}</td>
                      <td className="whitespace-nowrap">{u.role}</td>
                      <td className="whitespace-nowrap">{u.email}</td>
                      <td className="whitespace-nowrap">{u.phone}</td>
                      <td className="whitespace-nowrap">{u.lastLogin}</td>
                      <td className="w-32">
                        <div className="flex justify-center">
                          <AccountBadge status={u.accountStatus} />
                        </div>
                      </td>
                      <td className="table-report__action w-auto min-w-[180px] whitespace-nowrap">
                        <div className="flex justify-center items-center gap-3">
                          <Tippy
                            tag="a"
                            href=""
                            content="View User"
                            onClick={(e) => {
                              e.preventDefault();
                              setDetailsUsername(u.username);
                            }}
                          >
                            <Lucide
                              icon="Eye"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy tag="a" href="" content="Edit User">
                            <Lucide
                              icon="Edit"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content="Reset Password"
                            onClick={(e) => {
                              e.preventDefault();
                              handleResetPassword(u.username);
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
                            content="Change Role"
                            onClick={(e) => {
                              e.preventDefault();
                              openChangeRole(u.username);
                            }}
                          >
                            <Lucide
                              icon="Shield"
                              className="w-4 h-4 text-slate-500 hover:text-primary"
                            />
                          </Tippy>
                          <Tippy
                            tag="a"
                            href=""
                            content={u.accountStatus === "Active" ? "Disable" : "Enable"}
                            onClick={(e) => {
                              e.preventDefault();
                              handleToggleAccount(u.username);
                            }}
                          >
                            <Lucide
                              icon="Power"
                              className={classnames(
                                "w-4 h-4 hover:text-primary",
                                u.accountStatus === "Active"
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
        {/* END: Users Table */}

        {/* BEGIN: Roles Management */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Roles & Permissions
            </h2>
            <div className="ml-auto text-slate-500 text-sm">
              {roles.length} role{roles.length === 1 ? "" : "s"}
            </div>
          </div>

          <div className="intro-y w-full overflow-x-auto mt-5">
            <table className="table table-report w-full min-w-[720px]">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">ROLE NAME</th>
                  <th className="whitespace-nowrap">TYPE</th>
                  <th className="text-right whitespace-nowrap">USERS</th>
                  <th className="text-center whitespace-nowrap min-w-[160px]">
                    ACTIONS
                  </th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.name} className="intro-x">
                    <td className="whitespace-nowrap font-medium">{r.name}</td>
                    <td className="whitespace-nowrap">
                      <div
                        className={classnames(
                          "py-1 px-2 rounded-full text-xs font-medium inline-block whitespace-nowrap",
                          r.isSystem
                            ? "bg-primary/20 text-primary"
                            : "bg-pending/20 text-pending"
                        )}
                      >
                        {r.isSystem ? "System" : "Custom"}
                      </div>
                    </td>
                    <td className="text-right whitespace-nowrap">
                      {users.filter((u) => u.role === r.name).length}
                    </td>
                    <td className="table-report__action w-auto min-w-[160px] whitespace-nowrap">
                      <div className="flex justify-center items-center gap-3">
                        <Tippy
                          tag="a"
                          href=""
                          content="Edit Role"
                          onClick={(e) => {
                            e.preventDefault();
                            openEditRole(r.name);
                          }}
                        >
                          <Lucide
                            icon="Edit"
                            className="w-4 h-4 text-slate-500 hover:text-primary"
                          />
                        </Tippy>
                        <Tippy
                          tag="a"
                          href=""
                          content="Duplicate Role"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDuplicateRole(r.name);
                          }}
                        >
                          <Lucide
                            icon="Copy"
                            className="w-4 h-4 text-slate-500 hover:text-primary"
                          />
                        </Tippy>
                        <Tippy
                          tag="a"
                          href=""
                          content={
                            r.isSystem
                              ? "System roles cannot be deleted"
                              : "Delete Role"
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            if (!r.isSystem) handleDeleteRole(r.name);
                          }}
                        >
                          <Lucide
                            icon="Trash2"
                            className={classnames(
                              "w-4 h-4",
                              r.isSystem
                                ? "text-slate-300 cursor-not-allowed"
                                : "text-slate-500 hover:text-danger"
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
        </div>
        {/* END: Roles Management */}
      </div>

      {/* BEGIN: Add User Modal (UI only) */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeAddUser}></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Add User</h2>
              <button
                type="button"
                onClick={closeAddUser}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <label className="text-xs text-slate-500">Employee</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. Ahmed Khan"
                  value={addUserForm.employeeName}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, employeeName: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Username</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. akhan"
                  value={addUserForm.username}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, username: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Email</label>
                <input
                  type="email"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. akhan@isp.com"
                  value={addUserForm.email}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Phone Number</label>
                <input
                  type="text"
                  className="form-control box mt-1 w-full"
                  placeholder="e.g. 0300-1234567"
                  value={addUserForm.phone}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Account Status</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addUserForm.accountStatus}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, accountStatus: e.target.value }))
                  }
                >
                  {ACCOUNT_STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Password</label>
                <input
                  type="password"
                  className="form-control box mt-1 w-full"
                  placeholder="Set a password"
                  value={addUserForm.password}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control box mt-1 w-full"
                  placeholder="Re-enter password"
                  value={addUserForm.confirmPassword}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Role</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addUserForm.role}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, role: e.target.value }))
                  }
                >
                  {ROLE_NAMES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-6">
                <label className="text-xs text-slate-500">Department</label>
                <select
                  className="form-select box mt-1 w-full"
                  value={addUserForm.department}
                  onChange={(e) =>
                    setAddUserForm((prev) => ({ ...prev, department: e.target.value }))
                  }
                >
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeAddUser}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateUser}
                className="btn btn-primary shadow-md"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Add User Modal */}

      {/* BEGIN: User Details Panel (UI only) */}
      {detailsUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setDetailsUsername(null)}
          ></div>
          <div className="relative box w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">User Details</h2>
              <button
                type="button"
                onClick={() => setDetailsUsername(null)}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Username</div>
                <div className="font-medium">{detailsUser.username}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Employee Name</div>
                <div className="font-medium">{detailsUser.employeeName}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Department</div>
                <div className="font-medium">{detailsUser.department}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Role</div>
                <div className="font-medium">{detailsUser.role}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Phone Number</div>
                <div className="font-medium">{detailsUser.phone}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Email</div>
                <div className="font-medium">{detailsUser.email}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs mb-1">Account Status</div>
                <AccountBadge status={detailsUser.accountStatus} />
              </div>
              <div>
                <div className="text-slate-500 text-xs">Last Login</div>
                <div className="font-medium">{detailsUser.lastLogin}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">Created Date</div>
                <div className="font-medium">{detailsUser.createdDate}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">
                  Password Last Changed
                </div>
                <div className="font-medium">
                  {detailsUser.passwordLastChanged}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setDetailsUsername(null)}
                className="btn btn-outline-secondary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const username = detailsUser.username;
                  setDetailsUsername(null);
                  openChangeRole(username);
                }}
                className="btn btn-primary shadow-md"
              >
                <Lucide icon="Shield" className="w-4 h-4 mr-2" /> Change Role
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: User Details Panel */}

      {/* BEGIN: Change Role Modal (UI only) */}
      {changeRoleModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeChangeRole}></div>
          <div className="relative box w-full max-w-md p-6">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">Change Role</h2>
              <button
                type="button"
                onClick={closeChangeRole}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="col-span-12">
              <label className="text-xs text-slate-500">New Role</label>
              <select
                className="form-select box mt-1 w-full"
                value={changeRoleForm.role}
                onChange={(e) => setChangeRoleForm({ role: e.target.value })}
              >
                {roles.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeChangeRole}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleChangeRole}
                className="btn btn-primary shadow-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Change Role Modal */}

      {/* BEGIN: Role Editor Modal (Create / Edit Role, UI only) */}
      {roleEditor.open && roleEditorPermissions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={closeRoleEditor}></div>
          <div className="relative box w-full max-w-3xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center mb-5">
              <h2 className="text-lg font-medium">
                {roleEditor.roleName ? "Edit Role" : "Create Role"}
              </h2>
              <button
                type="button"
                onClick={closeRoleEditor}
                className="ml-auto text-slate-500 hover:text-slate-700"
                aria-label="Close"
              >
                <Lucide icon="X" className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-5">
              <label className="text-xs text-slate-500">Role Name</label>
              <input
                type="text"
                className="form-control box mt-1 w-full sm:w-72"
                placeholder="e.g. Front Desk Staff"
                value={roleEditorName}
                onChange={(e) => setRoleEditorName(e.target.value)}
              />
            </div>

            <div className="text-xs text-slate-500 mb-2">
              Choose what this role is allowed to do in each part of the system.
            </div>

            <div className="w-full overflow-x-auto">
              <table className="table table-report w-full min-w-[640px]">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">MODULE</th>
                    {ACTIONS.map((a) => (
                      <th key={a.key} className="text-center whitespace-nowrap">
                        <div className="flex flex-col items-center gap-1">
                          <span>{a.label}</span>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={MODULES.every(
                              (m) => roleEditorPermissions[m][a.key]
                            )}
                            onChange={() => toggleColumn(a.key)}
                            title={`Toggle ${a.label} for all modules`}
                          />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MODULES.map((m) => (
                    <tr key={m}>
                      <td className="whitespace-nowrap">{m}</td>
                      {ACTIONS.map((a) => (
                        <td key={a.key} className="text-center">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={roleEditorPermissions[m][a.key]}
                            onChange={() => toggleCell(m, a.key)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={closeRoleEditor}
                className="btn btn-outline-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveRole}
                className="btn btn-primary shadow-md"
              >
                Save Role
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Role Editor Modal */}
    </>
  );
}

export default Main;