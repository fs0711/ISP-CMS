import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function Main() {
  const [users, setUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [usersResult, organizationsResult] = await Promise.all([
        supabase
          .from("profiles")
          .select(`
            id,
            organization_id,
            full_name,
            role,
            created_at,
            updated_at,
            organizations (
              name,
              slug
            )
          `)
          .order("created_at", { ascending: false }),

        supabase
          .from("organizations")
          .select("id, name, slug")
          .order("name"),
      ]);

      if (usersResult.error) {
        throw usersResult.error;
      }

      if (organizationsResult.error) {
        throw organizationsResult.error;
      }

      setUsers(usersResult.data || []);
      setOrganizations(organizationsResult.data || []);
    } catch (err) {
      console.error("Load users error:", err);
      setError(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.full_name?.toLowerCase().includes(searchText) ||
      user.role?.toLowerCase().includes(searchText) ||
      user.organizations?.name?.toLowerCase().includes(searchText) ||
      user.organizations?.slug?.toLowerCase().includes(searchText)
    );
  });

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString();
  };

  const getRoleLabel = (role) => {
    if (!role) return "-";

    return role
      .replace(/_/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  return (
    <div className="p-5">
      {/* PAGE HEADER */}
      <div className="intro-y flex items-center h-10 mb-5">
        <h2 className="text-lg font-medium truncate">
          Users & Roles
        </h2>
      </div>

      {/* ERROR */}
      {error && (
        <div className="intro-y alert alert-danger show mb-5">
          {error}
        </div>
      )}

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-12 gap-5 mb-5">
        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Total Users
            </div>

            <div className="text-2xl font-medium mt-1">
              {users.length}
            </div>
          </div>
        </div>

        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Platform Users
            </div>

            <div className="text-2xl font-medium mt-1">
              {
                users.filter(
                  (user) => user.role === "platform_admin"
                ).length
              }
            </div>
          </div>
        </div>

        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              ISP Users
            </div>

            <div className="text-2xl font-medium mt-1">
              {
                users.filter(
                  (user) => user.role !== "platform_admin"
                ).length
              }
            </div>
          </div>
        </div>

        <div className="intro-y col-span-12 sm:col-span-6 xl:col-span-3">
          <div className="box p-5">
            <div className="text-slate-500 text-sm">
              Organizations
            </div>

            <div className="text-2xl font-medium mt-1">
              {organizations.length}
            </div>
          </div>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="intro-y box p-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="text-base font-medium">
              Platform Users
            </h3>

            <div className="text-slate-500 text-sm mt-1">
              Manage platform and ISP user access.
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* SEARCH */}
        <div className="mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search name, organization or role..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="table table-report">
            <thead>
              <tr>
                <th>USER</th>
                <th>ORGANIZATION</th>
                <th>ROLE</th>
                <th>CREATED</th>
                <th>UPDATED</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    {/* USER */}
                    <td>
                      <div className="font-medium">
                        {user.full_name || "Unnamed User"}
                      </div>

                      <div className="text-slate-500 text-xs">
                        {user.id}
                      </div>
                    </td>

                    {/* ORGANIZATION */}
                    <td>
                      {user.organizations ? (
                        <>
                          <div className="font-medium">
                            {user.organizations.name}
                          </div>

                          <div className="text-slate-500 text-xs">
                            {user.organizations.slug}
                          </div>
                        </>
                      ) : (
                        <span className="text-slate-500">
                          Platform
                        </span>
                      )}
                    </td>

                    {/* ROLE */}
                    <td>
                      <span
                        className={
                          user.role === "platform_admin"
                            ? "text-primary"
                            : "text-success"
                        }
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>

                    {/* CREATED */}
                    <td>
                      {formatDate(user.created_at)}
                    </td>

                    {/* UPDATED */}
                    <td>
                      {formatDate(user.updated_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Main;