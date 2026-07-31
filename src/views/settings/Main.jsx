import { Lucide } from "@/base-components";
import classnames from "classnames";
import { useState } from "react";

// =====================================================================
// BEGIN: Section catalog
// =====================================================================
const SECTIONS = [
  { key: "company", label: "Company Information", icon: "Users" },
  { key: "billing", label: "Billing Settings", icon: "Wallet" },
  { key: "subscriber", label: "Subscriber Settings", icon: "Package" },
  { key: "payment", label: "Payment Settings", icon: "Download" },
  { key: "emailSms", label: "Email & SMS Settings", icon: "Key" },
  { key: "notifications", label: "Notifications", icon: "AlertCircle" },
  { key: "security", label: "Security", icon: "Shield" },
  { key: "backup", label: "Backup & Data", icon: "Copy" },
  { key: "system", label: "System Preferences", icon: "Sheet" },
];
// END: Section catalog
// =====================================================================

// =====================================================================
// BEGIN: Default settings (realistic ISP dummy data)
// =====================================================================
const DEFAULT_SETTINGS = {
  company: {
    ispName: "SkyNet Internet Services",
    ownerName: "Muhammad Ali",
    registrationNumber: "REG-45781-KHI",
    ntn: "1234567-8",
    strn: "3277896541234",
    companyEmail: "info@skynet-isp.com",
    supportEmail: "support@skynet-isp.com",
    phone: "021-34567890",
    whatsapp: "0300-1234567",
    website: "www.skynet-isp.com",
    address: "Plot 12, Block 4, Gulshan-e-Iqbal",
    city: "Karachi",
    province: "Sindh",
    country: "Pakistan",
    logoPreview: null,
  },
  billing: {
    billingDay: "1st of Every Month",
    gracePeriodDays: 5,
    lateFeeAmount: 100,
    invoicePrefix: "INV-",
    receiptPrefix: "RCT-",
    currency: "PKR",
    taxEnabled: true,
    taxPercentage: 3,
  },
  subscriber: {
    defaultPackage: "20 Mbps Home",
    autoSuspend: true,
    suspensionDays: 7,
    allowUpgrade: true,
    allowDowngrade: false,
    installationCharges: 2000,
    reconnectCharges: 500,
  },
  payment: {
    methods: {
      Cash: true,
      "Bank Transfer": true,
      JazzCash: true,
      EasyPaisa: true,
      Cheque: false,
    },
    confirmationRequired: true,
    receiptAutoGeneration: true,
  },
  emailSms: {
    smtpEmail: "smtp.skynet-isp.com",
    smtpPort: "587",
    senderEmail: "no-reply@skynet-isp.com",
    smsProvider: "Telenor SMS Gateway",
    apiKey: "••••••••••••3F9A",
  },
  notifications: {
    invoiceReminder: true,
    paymentConfirmation: true,
    ticketUpdates: true,
    installationUpdates: false,
    lowInventoryAlert: true,
    systemNotifications: false,
  },
  security: {
    passwordExpiryDays: 90,
    minPasswordLength: 8,
    twoFactorAuth: false,
    sessionTimeoutMinutes: 30,
    maxLoginAttempts: 5,
  },
  system: {
    timezone: "Asia/Karachi (PKT, UTC+5)",
    dateFormat: "DD-MM-YYYY",
    timeFormat: "12-hour",
    language: "English",
    theme: "Light",
    rowsPerPage: 10,
  },
};
// END: Default settings
// =====================================================================

const PROVINCES = ["Sindh", "Punjab", "Khyber Pakhtunkhwa", "Balochistan", "Islamabad Capital Territory"];
const PACKAGES_LIST = ["10 Mbps Home", "20 Mbps Home", "50 Mbps Home", "100 Mbps Business", "20 Mbps Student"];
const CURRENCIES = ["PKR", "USD"];
const TIMEZONES = ["Asia/Karachi (PKT, UTC+5)"];
const DATE_FORMATS = ["DD-MM-YYYY", "MM-DD-YYYY", "YYYY-MM-DD"];
const TIME_FORMATS = ["12-hour", "24-hour"];
const LANGUAGES = ["English", "Urdu"];
const THEMES = ["Light", "Dark"];

function Toggle({ checked, onChange, label }) {
  return (
    <label className="flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="ml-2 text-sm">{label}</span>
    </label>
  );
}

function SectionCard({ title, children, onSave, saveLabel = "Save" }) {
  return (
    <div className="intro-y box p-5">
      <div className="text-base font-medium mb-4">{title}</div>
      <div className="grid grid-cols-12 gap-4">{children}</div>
      {onSave && (
        <div className="flex justify-end mt-6">
          <button type="button" onClick={onSave} className="btn btn-primary shadow-md">
            <Lucide icon="CheckCircle2" className="w-4 h-4 mr-2" /> {saveLabel}
          </button>
        </div>
      )}
    </div>
  );
}

function Field({ span = "col-span-12 sm:col-span-6", label, children }) {
  return (
    <div className={span}>
      <label className="text-xs text-slate-500">{label}</label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function Main() {
  const [activeSection, setActiveSection] = useState("company");
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [banner, setBanner] = useState(null);

  const showBanner = (message) => {
    setBanner(message);
    window.clearTimeout(showBanner._t);
    showBanner._t = window.setTimeout(() => setBanner(null), 3000);
  };

  const updateSection = (sectionKey, field, value) => {
    setSettings((prev) => ({
      ...prev,
      [sectionKey]: { ...prev[sectionKey], [field]: value },
    }));
  };

  const updatePaymentMethod = (method, value) => {
    setSettings((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        methods: { ...prev.payment.methods, [method]: value },
      },
    }));
  };

  const handleSaveAll = () => {
    showBanner("All settings saved successfully.");
  };

  const handleResetAll = () => {
    setSettings(DEFAULT_SETTINGS);
    showBanner("Settings reset to default values.");
  };

  const handleSaveSection = (label) => {
    showBanner(`${label} saved successfully.`);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    updateSection("company", "logoPreview", previewUrl);
    showBanner("Company logo updated.");
  };

  const handleTestEmail = () => showBanner("Test email sent to " + settings.emailSms.senderEmail);
  const handleTestSms = () => showBanner("Test SMS sent using " + settings.emailSms.smsProvider);

  const handleBackupNow = () => {
    const blob = new Blob(
      [`Backup generated on ${new Date().toDateString()} for ${settings.company.ispName}`],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${settings.company.ispName.replace(/\s+/g, "_")}_backup.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showBanner("Backup created and downloaded.");
  };

  const handleRestoreFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    showBanner(`Backup file "${file.name}" restored.`);
  };

  // BEGIN: Summary card values (simple derived status, no charts)
  const companyFields = settings.company;
  const companyRequiredFilled = [
    companyFields.ispName,
    companyFields.ownerName,
    companyFields.companyEmail,
    companyFields.phone,
    companyFields.address,
    companyFields.city,
  ].filter(Boolean).length;
  const companyProfilePercent = Math.round((companyRequiredFilled / 6) * 100);

  const billingConfigured =
    settings.billing.invoicePrefix && settings.billing.receiptPrefix && settings.billing.currency
      ? "Configured"
      : "Incomplete";

  const notificationsOnCount = Object.values(settings.notifications).filter(Boolean).length;
  const notificationsTotal = Object.values(settings.notifications).length;

  const securityStatus = settings.security.twoFactorAuth ? "Strong" : "Basic";
  // END: Summary card values

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* BEGIN: Page Header */}
      <div className="col-span-12 intro-y flex flex-col lg:flex-row lg:items-center">
        <div>
          <h2 className="text-lg font-medium">Settings</h2>
          <div className="text-slate-500 mt-1">
            Configure your ISP account, branding and business preferences.
          </div>
        </div>
        <div className="flex flex-wrap gap-2 lg:ml-auto mt-4 lg:mt-0">
          <button type="button" onClick={handleSaveAll} className="btn btn-primary shadow-md">
            <Lucide icon="CheckCircle2" className="w-4 h-4 mr-2" /> Save Changes
          </button>
          <button type="button" onClick={handleResetAll} className="btn btn-outline-secondary">
            <Lucide icon="X" className="w-4 h-4 mr-2" /> Reset
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

      {/* BEGIN: Summary Cards */}
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="Users" className="w-8 h-8 mr-4 flex-none text-primary" />
          <div>
            <div className="text-xl font-medium">{companyProfilePercent}%</div>
            <div className="text-slate-500 text-xs mt-0.5">Company Profile Complete</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="Wallet" className="w-8 h-8 mr-4 flex-none text-success" />
          <div>
            <div className="text-xl font-medium">{billingConfigured}</div>
            <div className="text-slate-500 text-xs mt-0.5">Billing Configuration</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="AlertCircle" className="w-8 h-8 mr-4 flex-none text-pending" />
          <div>
            <div className="text-xl font-medium">
              {notificationsOnCount}/{notificationsTotal}
            </div>
            <div className="text-slate-500 text-xs mt-0.5">Notifications Enabled</div>
          </div>
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6 lg:col-span-3 intro-y">
        <div className="box p-5 flex items-center">
          <Lucide icon="Shield" className="w-8 h-8 mr-4 flex-none text-danger" />
          <div>
            <div className="text-xl font-medium">{securityStatus}</div>
            <div className="text-slate-500 text-xs mt-0.5">Security Status</div>
          </div>
        </div>
      </div>
      {/* END: Summary Cards */}

      {/* BEGIN: Section Tabs */}
      <div className="col-span-12 intro-y">
        <div className="box p-4">
          <div className="flex flex-wrap gap-2">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                type="button"
                onClick={() => setActiveSection(section.key)}
                className={classnames(
                  "py-2 px-4 rounded-full text-sm font-medium inline-flex items-center whitespace-nowrap",
                  activeSection === section.key
                    ? "bg-primary text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-darkmode-400 dark:text-slate-300"
                )}
              >
                <Lucide icon={section.icon} className="w-4 h-4 mr-2" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* END: Section Tabs */}

      {/* BEGIN: Company Information */}
      {activeSection === "company" && (
        <div className="col-span-12 mt-2">
          <SectionCard
            title="Company Information"
            onSave={() => handleSaveSection("Company information")}
          >
            <Field label="ISP Name">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.ispName}
                onChange={(e) => updateSection("company", "ispName", e.target.value)}
              />
            </Field>
            <Field label="Owner Name">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.ownerName}
                onChange={(e) => updateSection("company", "ownerName", e.target.value)}
              />
            </Field>
            <Field label="Business Registration Number">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.registrationNumber}
                onChange={(e) => updateSection("company", "registrationNumber", e.target.value)}
              />
            </Field>
            <Field label="NTN">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.ntn}
                onChange={(e) => updateSection("company", "ntn", e.target.value)}
              />
            </Field>
            <Field label="STRN">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.strn}
                onChange={(e) => updateSection("company", "strn", e.target.value)}
              />
            </Field>
            <Field label="Company Email">
              <input
                type="email"
                className="form-control box w-full"
                value={settings.company.companyEmail}
                onChange={(e) => updateSection("company", "companyEmail", e.target.value)}
              />
            </Field>
            <Field label="Support Email">
              <input
                type="email"
                className="form-control box w-full"
                value={settings.company.supportEmail}
                onChange={(e) => updateSection("company", "supportEmail", e.target.value)}
              />
            </Field>
            <Field label="Phone Number">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.phone}
                onChange={(e) => updateSection("company", "phone", e.target.value)}
              />
            </Field>
            <Field label="WhatsApp Number">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.whatsapp}
                onChange={(e) => updateSection("company", "whatsapp", e.target.value)}
              />
            </Field>
            <Field label="Website">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.website}
                onChange={(e) => updateSection("company", "website", e.target.value)}
              />
            </Field>
            <Field span="col-span-12" label="Company Address">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.address}
                onChange={(e) => updateSection("company", "address", e.target.value)}
              />
            </Field>
            <Field span="col-span-12 sm:col-span-4" label="City">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.city}
                onChange={(e) => updateSection("company", "city", e.target.value)}
              />
            </Field>
            <Field span="col-span-12 sm:col-span-4" label="Province">
              <select
                className="form-select box w-full"
                value={settings.company.province}
                onChange={(e) => updateSection("company", "province", e.target.value)}
              >
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <Field span="col-span-12 sm:col-span-4" label="Country">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.company.country}
                onChange={(e) => updateSection("company", "country", e.target.value)}
              />
            </Field>
            <Field span="col-span-12" label="Company Logo">
              <div className="flex items-center gap-4">
                {settings.company.logoPreview ? (
                  <img
                    src={settings.company.logoPreview}
                    alt="Company logo preview"
                    className="w-16 h-16 rounded-md object-cover border border-slate-200 dark:border-darkmode-400"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-md bg-slate-100 dark:bg-darkmode-400 flex items-center justify-center text-slate-400">
                    <Lucide icon="Users" className="w-6 h-6" />
                  </div>
                )}
                <label className="btn btn-outline-secondary cursor-pointer">
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />
                </label>
              </div>
            </Field>
          </SectionCard>
        </div>
      )}
      {/* END: Company Information */}

      {/* BEGIN: Billing Settings */}
      {activeSection === "billing" && (
        <div className="col-span-12 mt-2">
          <SectionCard title="Billing Settings" onSave={() => handleSaveSection("Billing settings")}>
            <Field label="Default Billing Day">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.billing.billingDay}
                onChange={(e) => updateSection("billing", "billingDay", e.target.value)}
              />
            </Field>
            <Field label="Grace Period (Days)">
              <input
                type="number"
                min="0"
                className="form-control box w-full"
                value={settings.billing.gracePeriodDays}
                onChange={(e) =>
                  updateSection("billing", "gracePeriodDays", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Late Fee Amount (PKR)">
              <input
                type="number"
                min="0"
                className="form-control box w-full"
                value={settings.billing.lateFeeAmount}
                onChange={(e) => updateSection("billing", "lateFeeAmount", Number(e.target.value))}
              />
            </Field>
            <Field label="Invoice Prefix">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.billing.invoicePrefix}
                onChange={(e) => updateSection("billing", "invoicePrefix", e.target.value)}
              />
            </Field>
            <Field label="Receipt Prefix">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.billing.receiptPrefix}
                onChange={(e) => updateSection("billing", "receiptPrefix", e.target.value)}
              />
            </Field>
            <Field label="Currency">
              <select
                className="form-select box w-full"
                value={settings.billing.currency}
                onChange={(e) => updateSection("billing", "currency", e.target.value)}
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Tax">
              <Toggle
                checked={settings.billing.taxEnabled}
                onChange={(v) => updateSection("billing", "taxEnabled", v)}
                label={settings.billing.taxEnabled ? "Enabled" : "Disabled"}
              />
            </Field>
            {settings.billing.taxEnabled && (
              <Field label="Tax Percentage (%)">
                <input
                  type="number"
                  min="0"
                  className="form-control box w-full"
                  value={settings.billing.taxPercentage}
                  onChange={(e) =>
                    updateSection("billing", "taxPercentage", Number(e.target.value))
                  }
                />
              </Field>
            )}
          </SectionCard>
        </div>
      )}
      {/* END: Billing Settings */}

      {/* BEGIN: Subscriber Settings */}
      {activeSection === "subscriber" && (
        <div className="col-span-12 mt-2">
          <SectionCard
            title="Subscriber Settings"
            onSave={() => handleSaveSection("Subscriber settings")}
          >
            <Field label="Default Package">
              <select
                className="form-select box w-full"
                value={settings.subscriber.defaultPackage}
                onChange={(e) => updateSection("subscriber", "defaultPackage", e.target.value)}
              >
                {PACKAGES_LIST.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Auto Suspend Overdue Customers">
              <Toggle
                checked={settings.subscriber.autoSuspend}
                onChange={(v) => updateSection("subscriber", "autoSuspend", v)}
                label={settings.subscriber.autoSuspend ? "Enabled" : "Disabled"}
              />
            </Field>
            {settings.subscriber.autoSuspend && (
              <Field label="Suspension Days">
                <input
                  type="number"
                  min="1"
                  className="form-control box w-full"
                  value={settings.subscriber.suspensionDays}
                  onChange={(e) =>
                    updateSection("subscriber", "suspensionDays", Number(e.target.value))
                  }
                />
              </Field>
            )}
            <Field label="Allow Package Upgrade">
              <Toggle
                checked={settings.subscriber.allowUpgrade}
                onChange={(v) => updateSection("subscriber", "allowUpgrade", v)}
                label={settings.subscriber.allowUpgrade ? "Allowed" : "Not Allowed"}
              />
            </Field>
            <Field label="Allow Package Downgrade">
              <Toggle
                checked={settings.subscriber.allowDowngrade}
                onChange={(v) => updateSection("subscriber", "allowDowngrade", v)}
                label={settings.subscriber.allowDowngrade ? "Allowed" : "Not Allowed"}
              />
            </Field>
            <Field label="Installation Charges (PKR)">
              <input
                type="number"
                min="0"
                className="form-control box w-full"
                value={settings.subscriber.installationCharges}
                onChange={(e) =>
                  updateSection("subscriber", "installationCharges", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Reconnect Charges (PKR)">
              <input
                type="number"
                min="0"
                className="form-control box w-full"
                value={settings.subscriber.reconnectCharges}
                onChange={(e) =>
                  updateSection("subscriber", "reconnectCharges", Number(e.target.value))
                }
              />
            </Field>
          </SectionCard>
        </div>
      )}
      {/* END: Subscriber Settings */}

      {/* BEGIN: Payment Settings */}
      {activeSection === "payment" && (
        <div className="col-span-12 mt-2">
          <SectionCard title="Payment Settings" onSave={() => handleSaveSection("Payment settings")}>
            <Field span="col-span-12" label="Accepted Payment Methods">
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
                {Object.keys(settings.payment.methods).map((method) => (
                  <Toggle
                    key={method}
                    checked={settings.payment.methods[method]}
                    onChange={(v) => updatePaymentMethod(method, v)}
                    label={method}
                  />
                ))}
              </div>
            </Field>
            <Field label="Payment Confirmation Required">
              <Toggle
                checked={settings.payment.confirmationRequired}
                onChange={(v) => updateSection("payment", "confirmationRequired", v)}
                label={settings.payment.confirmationRequired ? "Required" : "Not Required"}
              />
            </Field>
            <Field label="Receipt Auto Generation">
              <Toggle
                checked={settings.payment.receiptAutoGeneration}
                onChange={(v) => updateSection("payment", "receiptAutoGeneration", v)}
                label={settings.payment.receiptAutoGeneration ? "Enabled" : "Disabled"}
              />
            </Field>
          </SectionCard>
        </div>
      )}
      {/* END: Payment Settings */}

      {/* BEGIN: Email & SMS Settings (UI only) */}
      {activeSection === "emailSms" && (
        <div className="col-span-12 mt-2">
          <SectionCard
            title="Email & SMS Settings"
            onSave={() => handleSaveSection("Email & SMS settings")}
          >
            <Field label="SMTP Email">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.emailSms.smtpEmail}
                onChange={(e) => updateSection("emailSms", "smtpEmail", e.target.value)}
              />
            </Field>
            <Field label="SMTP Port">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.emailSms.smtpPort}
                onChange={(e) => updateSection("emailSms", "smtpPort", e.target.value)}
              />
            </Field>
            <Field label="Sender Email">
              <input
                type="email"
                className="form-control box w-full"
                value={settings.emailSms.senderEmail}
                onChange={(e) => updateSection("emailSms", "senderEmail", e.target.value)}
              />
            </Field>
            <Field label="SMS Provider">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.emailSms.smsProvider}
                onChange={(e) => updateSection("emailSms", "smsProvider", e.target.value)}
              />
            </Field>
            <Field label="API Key">
              <input
                type="text"
                className="form-control box w-full"
                value={settings.emailSms.apiKey}
                onChange={(e) => updateSection("emailSms", "apiKey", e.target.value)}
              />
            </Field>
            <Field span="col-span-12" label=" ">
              <div className="flex gap-2">
                <button type="button" onClick={handleTestEmail} className="btn btn-outline-secondary">
                  <Lucide icon="PlayCircle" className="w-4 h-4 mr-2" /> Test Email
                </button>
                <button type="button" onClick={handleTestSms} className="btn btn-outline-secondary">
                  <Lucide icon="PlayCircle" className="w-4 h-4 mr-2" /> Test SMS
                </button>
              </div>
            </Field>
          </SectionCard>
        </div>
      )}
      {/* END: Email & SMS Settings */}

      {/* BEGIN: Notifications */}
      {activeSection === "notifications" && (
        <div className="col-span-12 mt-2">
          <SectionCard title="Notifications" onSave={() => handleSaveSection("Notification settings")}>
            <Field label="Invoice Reminder">
              <Toggle
                checked={settings.notifications.invoiceReminder}
                onChange={(v) => updateSection("notifications", "invoiceReminder", v)}
                label={settings.notifications.invoiceReminder ? "Enabled" : "Disabled"}
              />
            </Field>
            <Field label="Payment Confirmation">
              <Toggle
                checked={settings.notifications.paymentConfirmation}
                onChange={(v) => updateSection("notifications", "paymentConfirmation", v)}
                label={settings.notifications.paymentConfirmation ? "Enabled" : "Disabled"}
              />
            </Field>
            <Field label="Ticket Updates">
              <Toggle
                checked={settings.notifications.ticketUpdates}
                onChange={(v) => updateSection("notifications", "ticketUpdates", v)}
                label={settings.notifications.ticketUpdates ? "Enabled" : "Disabled"}
              />
            </Field>
            <Field label="Installation Updates">
              <Toggle
                checked={settings.notifications.installationUpdates}
                onChange={(v) => updateSection("notifications", "installationUpdates", v)}
                label={settings.notifications.installationUpdates ? "Enabled" : "Disabled"}
              />
            </Field>
            <Field label="Low Inventory Alert">
              <Toggle
                checked={settings.notifications.lowInventoryAlert}
                onChange={(v) => updateSection("notifications", "lowInventoryAlert", v)}
                label={settings.notifications.lowInventoryAlert ? "Enabled" : "Disabled"}
              />
            </Field>
            <Field label="System Notifications">
              <Toggle
                checked={settings.notifications.systemNotifications}
                onChange={(v) => updateSection("notifications", "systemNotifications", v)}
                label={settings.notifications.systemNotifications ? "Enabled" : "Disabled"}
              />
            </Field>
          </SectionCard>
        </div>
      )}
      {/* END: Notifications */}

      {/* BEGIN: Security */}
      {activeSection === "security" && (
        <div className="col-span-12 mt-2">
          <SectionCard title="Security" onSave={() => handleSaveSection("Security settings")}>
            <Field label="Password Expiry (Days)">
              <input
                type="number"
                min="0"
                className="form-control box w-full"
                value={settings.security.passwordExpiryDays}
                onChange={(e) =>
                  updateSection("security", "passwordExpiryDays", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Minimum Password Length">
              <input
                type="number"
                min="4"
                className="form-control box w-full"
                value={settings.security.minPasswordLength}
                onChange={(e) =>
                  updateSection("security", "minPasswordLength", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Two Factor Authentication">
              <Toggle
                checked={settings.security.twoFactorAuth}
                onChange={(v) => updateSection("security", "twoFactorAuth", v)}
                label={settings.security.twoFactorAuth ? "Enabled" : "Disabled"}
              />
            </Field>
            <Field label="Session Timeout (Minutes)">
              <input
                type="number"
                min="1"
                className="form-control box w-full"
                value={settings.security.sessionTimeoutMinutes}
                onChange={(e) =>
                  updateSection("security", "sessionTimeoutMinutes", Number(e.target.value))
                }
              />
            </Field>
            <Field label="Maximum Login Attempts">
              <input
                type="number"
                min="1"
                className="form-control box w-full"
                value={settings.security.maxLoginAttempts}
                onChange={(e) =>
                  updateSection("security", "maxLoginAttempts", Number(e.target.value))
                }
              />
            </Field>
          </SectionCard>
        </div>
      )}
      {/* END: Security */}

      {/* BEGIN: Backup & Data (UI only) */}
      {activeSection === "backup" && (
        <div className="col-span-12 mt-2">
          <div className="intro-y box p-5">
            <div className="text-base font-medium mb-2">Backup & Data</div>
            <div className="text-slate-500 text-sm mb-4">
              Create a backup of your ISP data, or restore from a previous backup file.
            </div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={handleBackupNow} className="btn btn-primary shadow-md">
                <Lucide icon="Copy" className="w-4 h-4 mr-2" /> Backup Database
              </button>
              <label className="btn btn-outline-secondary cursor-pointer">
                <Lucide icon="Download" className="w-4 h-4 mr-2" /> Restore Backup
                <input type="file" className="hidden" onChange={handleRestoreFile} />
              </label>
              <button
                type="button"
                onClick={handleBackupNow}
                className="btn btn-outline-secondary"
              >
                <Lucide icon="Download" className="w-4 h-4 mr-2" /> Download Backup
              </button>
            </div>
          </div>
        </div>
      )}
      {/* END: Backup & Data */}

      {/* BEGIN: System Preferences */}
      {activeSection === "system" && (
        <div className="col-span-12 mt-2">
          <SectionCard
            title="System Preferences"
            onSave={() => handleSaveSection("System preferences")}
          >
            <Field label="Timezone">
              <select
                className="form-select box w-full"
                value={settings.system.timezone}
                onChange={(e) => updateSection("system", "timezone", e.target.value)}
              >
                {TIMEZONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Date Format">
              <select
                className="form-select box w-full"
                value={settings.system.dateFormat}
                onChange={(e) => updateSection("system", "dateFormat", e.target.value)}
              >
                {DATE_FORMATS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Time Format">
              <select
                className="form-select box w-full"
                value={settings.system.timeFormat}
                onChange={(e) => updateSection("system", "timeFormat", e.target.value)}
              >
                {TIME_FORMATS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Language">
              <select
                className="form-select box w-full"
                value={settings.system.language}
                onChange={(e) => updateSection("system", "language", e.target.value)}
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Theme">
              <select
                className="form-select box w-full"
                value={settings.system.theme}
                onChange={(e) => updateSection("system", "theme", e.target.value)}
              >
                {THEMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Rows Per Page">
              <select
                className="form-select box w-full"
                value={settings.system.rowsPerPage}
                onChange={(e) =>
                  updateSection("system", "rowsPerPage", Number(e.target.value))
                }
              >
                {[10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </Field>
          </SectionCard>
        </div>
      )}
      {/* END: System Preferences */}
    </div>
  );
}

export default Main;