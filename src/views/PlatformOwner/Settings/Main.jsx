import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Main() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [settings, setSettings] = useState({
    platform_name: "ISP SaaS Platform",
    support_email: "",
    support_phone: "",
    default_currency: "PKR",
    default_billing_cycle: "monthly",
    timezone: "Asia/Karachi",
    maintenance_mode: false,
  });

  /*
   * Load platform settings.
   *
   * This version first tries to load from a `platform_settings` table.
   * If the table does not exist yet, the page still works with the
   * default values above.
   */
  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const { data, error: settingsError } = await supabase
        .from("platform_settings")
        .select(`
          platform_name,
          support_email,
          support_phone,
          default_currency,
          default_billing_cycle,
          timezone,
          maintenance_mode
        `)
        .limit(1)
        .maybeSingle();

      if (settingsError) {
        console.warn(
          "Platform settings table/query unavailable:",
          settingsError.message
        );

        // Keep default values if the table has not been created yet.
        return;
      }

      if (data) {
        setSettings({
          platform_name: data.platform_name || "ISP SaaS Platform",
          support_email: data.support_email || "",
          support_phone: data.support_phone || "",
          default_currency: data.default_currency || "PKR",
          default_billing_cycle:
            data.default_billing_cycle || "monthly",
          timezone: data.timezone || "Asia/Karachi",
          maintenance_mode: Boolean(data.maintenance_mode),
        });
      }
    } catch (err) {
      console.error("Load platform settings error:", err);
      setError(err.message || "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveSettings = async () => {
    try {
      setSaving(true);
      setError("");
      setMessage("");

      const payload = {
        platform_name: settings.platform_name,
        support_email: settings.support_email,
        support_phone: settings.support_phone,
        default_currency: settings.default_currency,
        default_billing_cycle: settings.default_billing_cycle,
        timezone: settings.timezone,
        maintenance_mode: settings.maintenance_mode,
      };

      const { data: existingSettings, error: findError } = await supabase
        .from("platform_settings")
        .select("id")
        .limit(1)
        .maybeSingle();

      if (findError) {
        throw findError;
      }

      let saveError = null;

      if (existingSettings?.id) {
        const result = await supabase
          .from("platform_settings")
          .update(payload)
          .eq("id", existingSettings.id);

        saveError = result.error;
      } else {
        const result = await supabase
          .from("platform_settings")
          .insert(payload);

        saveError = result.error;
      }

      if (saveError) {
        throw saveError;
      }

      setMessage("Platform settings saved successfully.");
    } catch (err) {
      console.error("Save platform settings error:", err);
      setError(err.message || "Failed to save platform settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-5">
      {/* PAGE HEADER */}
      <div className="intro-y flex items-center h-10 mb-5">
        <div>
          <h2 className="text-lg font-medium truncate">
            Platform Settings
          </h2>

          <div className="text-slate-500 text-sm mt-1">
            Manage settings for the entire ISP SaaS platform.
          </div>
        </div>
      </div>

      {/* SUCCESS MESSAGE */}
      {message && (
        <div className="intro-y alert alert-success show mb-5">
          {message}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <div className="intro-y alert alert-danger show mb-5">
          <div className="font-medium">
            Unable to save settings
          </div>

          <div className="text-sm mt-1">
            {error}
          </div>
        </div>
      )}

      <div className="grid grid-cols-12 gap-5">
        {/* GENERAL SETTINGS */}
        <div className="intro-y col-span-12 xl:col-span-8">
          <div className="box p-5">
            <div className="border-b border-slate-200/60 pb-4 mb-5">
              <h3 className="text-base font-medium">
                General Settings
              </h3>

              <div className="text-slate-500 text-sm mt-1">
                Basic information used across the platform.
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5">
              {/* PLATFORM NAME */}
              <div className="col-span-12">
                <label className="form-label">
                  Platform Name
                </label>

                <input
                  type="text"
                  name="platform_name"
                  className="form-control"
                  value={settings.platform_name}
                  onChange={handleChange}
                  disabled={loading || saving}
                  placeholder="ISP SaaS Platform"
                />
              </div>

              {/* SUPPORT EMAIL */}
              <div className="col-span-12 md:col-span-6">
                <label className="form-label">
                  Support Email
                </label>

                <input
                  type="email"
                  name="support_email"
                  className="form-control"
                  value={settings.support_email}
                  onChange={handleChange}
                  disabled={loading || saving}
                  placeholder="support@example.com"
                />
              </div>

              {/* SUPPORT PHONE */}
              <div className="col-span-12 md:col-span-6">
                <label className="form-label">
                  Support Phone
                </label>

                <input
                  type="text"
                  name="support_phone"
                  className="form-control"
                  value={settings.support_phone}
                  onChange={handleChange}
                  disabled={loading || saving}
                  placeholder="+92 300 0000000"
                />
              </div>

              {/* CURRENCY */}
              <div className="col-span-12 md:col-span-6">
                <label className="form-label">
                  Default Currency
                </label>

                <select
                  name="default_currency"
                  className="form-select"
                  value={settings.default_currency}
                  onChange={handleChange}
                  disabled={loading || saving}
                >
                  <option value="PKR">
                    PKR - Pakistani Rupee
                  </option>

                  <option value="USD">
                    USD - US Dollar
                  </option>

                  <option value="AED">
                    AED - UAE Dirham
                  </option>

                  <option value="SAR">
                    SAR - Saudi Riyal
                  </option>
                </select>
              </div>

              {/* BILLING CYCLE */}
              <div className="col-span-12 md:col-span-6">
                <label className="form-label">
                  Default Billing Cycle
                </label>

                <select
                  name="default_billing_cycle"
                  className="form-select"
                  value={settings.default_billing_cycle}
                  onChange={handleChange}
                  disabled={loading || saving}
                >
                  <option value="monthly">
                    Monthly
                  </option>

                  <option value="yearly">
                    Yearly
                  </option>
                </select>
              </div>

              {/* TIMEZONE */}
              <div className="col-span-12">
                <label className="form-label">
                  Default Timezone
                </label>

                <select
                  name="timezone"
                  className="form-select"
                  value={settings.timezone}
                  onChange={handleChange}
                  disabled={loading || saving}
                >
                  <option value="Asia/Karachi">
                    Asia/Karachi
                  </option>

                  <option value="Asia/Dubai">
                    Asia/Dubai
                  </option>

                  <option value="Asia/Riyadh">
                    Asia/Riyadh
                  </option>

                  <option value="UTC">
                    UTC
                  </option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveSettings}
                disabled={loading || saving}
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>
        </div>

        {/* PLATFORM STATUS */}
        <div className="intro-y col-span-12 xl:col-span-4">
          <div className="box p-5">
            <div className="border-b border-slate-200/60 pb-4 mb-5">
              <h3 className="text-base font-medium">
                Platform Status
              </h3>

              <div className="text-slate-500 text-sm mt-1">
                Control the overall platform availability.
              </div>
            </div>

            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-medium">
                  Maintenance Mode
                </div>

                <div className="text-slate-500 text-sm mt-1">
                  Temporarily mark the platform as under maintenance.
                </div>
              </div>

              <input
                type="checkbox"
                name="maintenance_mode"
                className="form-check-input"
                checked={settings.maintenance_mode}
                onChange={handleChange}
                disabled={loading || saving}
              />
            </div>

            <div className="mt-5 p-4 rounded-md bg-slate-100">
              <div className="text-sm font-medium">
                Current Status
              </div>

              <div className="mt-2">
                {settings.maintenance_mode ? (
                  <span className="text-warning font-medium">
                    Maintenance Mode Enabled
                  </span>
                ) : (
                  <span className="text-success font-medium">
                    Platform Operational
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* INFORMATION */}
          <div className="box p-5 mt-5">
            <h3 className="text-base font-medium">
              Platform Information
            </h3>

            <div className="mt-4">
              <div className="flex justify-between py-2 border-b border-slate-200/60">
                <span className="text-slate-500">
                  Application
                </span>

                <span className="font-medium">
                  ISP SaaS
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-200/60">
                <span className="text-slate-500">
                  Environment
                </span>

                <span className="font-medium">
                  Production
                </span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-slate-500">
                  Default Currency
                </span>

                <span className="font-medium">
                  {settings.default_currency}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;