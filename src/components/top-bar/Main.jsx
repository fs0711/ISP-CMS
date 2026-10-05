import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Lucide,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  DropdownHeader,
  DropdownDivider,
} from "@/base-components";
import logoUrl from "@/assets/images/logo.svg";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import { supabase } from "@/lib/supabase";

function Main(props) {
  const navigate = useNavigate();

  const [searchDropdown, setSearchDropdown] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };

  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
      return;
    }

    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar-boxed h-[70px] z-[51] relative border-b border-white/[0.08] mt-12 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12">
        <div className="h-full flex items-center">

          {/* BEGIN: Logo */}
          <Link to="/" className="-intro-x hidden md:flex">
            <img
              alt="ISP SaaS"
              className="w-6"
              src={logoUrl}
            />
            <span className="text-white text-lg ml-3">
              ISP SaaS
            </span>
          </Link>
          {/* END: Logo */}

          {/* BEGIN: Breadcrumb */}
          <nav
            aria-label="breadcrumb"
            className="-intro-x h-full mr-auto"
          >
            <ol className="breadcrumb breadcrumb-light">
              <li className="breadcrumb-item">
                <Link to="/">Application</Link>
              </li>

              <li
                className="breadcrumb-item active"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
          </nav>
          {/* END: Breadcrumb */}

          {/* BEGIN: Search */}
          <div className="intro-x relative mr-3 sm:mr-6">
            <div className="search hidden sm:block">
              <input
                type="text"
                className="search__input form-control border-transparent"
                placeholder="Search..."
                onFocus={showSearchDropdown}
                onBlur={hideSearchDropdown}
              />

              <Lucide
                icon="Search"
                className="search__icon dark:text-slate-500"
              />
            </div>

            <a
              className="notification sm:hidden"
              href="#search"
              onClick={(e) => e.preventDefault()}
            >
              <Lucide
                icon="Search"
                className="notification__icon dark:text-slate-500"
              />
            </a>

            <div
              className={classnames({
                "search-result": true,
                show: searchDropdown,
              })}
            >
              <div className="search-result__content">

                <div className="search-result__content__title">
                  Pages
                </div>

                <div className="mb-5">

                  <Link
                    to="/settings"
                    className="flex items-center"
                  >
                    <div className="w-8 h-8 bg-success/20 dark:bg-success/10 text-success flex items-center justify-center rounded-full">
                      <Lucide icon="Settings" className="w-4 h-4" />
                    </div>

                    <div className="ml-3">
                      Settings
                    </div>
                  </Link>

                  <Link
                    to="/users-roles"
                    className="flex items-center mt-2"
                  >
                    <div className="w-8 h-8 bg-pending/10 text-pending flex items-center justify-center rounded-full">
                      <Lucide icon="Users" className="w-4 h-4" />
                    </div>

                    <div className="ml-3">
                      Users & Roles
                    </div>
                  </Link>

                  <Link
                    to="/reports"
                    className="flex items-center mt-2"
                  >
                    <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 text-primary/80 flex items-center justify-center rounded-full">
                      <Lucide
                        icon="FileText"
                        className="w-4 h-4"
                      />
                    </div>

                    <div className="ml-3">
                      Reports
                    </div>
                  </Link>

                </div>

                <div className="search-result__content__title">
                  Users
                </div>

                <div className="mb-5">
                  {$_.take($f(), 4).map((faker, fakerKey) => (
                    <div
                      key={fakerKey}
                      className="flex items-center mt-2"
                    >
                      <div className="w-8 h-8 image-fit">
                        <img
                          alt="User"
                          className="rounded-full"
                          src={faker.photos[0]}
                        />
                      </div>

                      <div className="ml-3">
                        {faker.users[0].name}
                      </div>

                      <div className="ml-auto w-48 truncate text-slate-500 text-xs text-right">
                        {faker.users[0].email}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>
          {/* END: Search */}

          {/* BEGIN: Notifications */}
          <Dropdown className="intro-x mr-4 sm:mr-6">
            <DropdownToggle
              tag="div"
              role="button"
              className="notification notification--bullet cursor-pointer"
            >
              <Lucide
                icon="Bell"
                className="notification__icon dark:text-slate-500"
              />
            </DropdownToggle>

            <DropdownMenu className="notification-content pt-2">
              <DropdownContent
                tag="div"
                className="notification-content__box"
              >
                <div className="notification-content__title">
                  Notifications
                </div>

                {$_.take($f(), 5).map((faker, fakerKey) => (
                  <div
                    key={fakerKey}
                    className={classnames({
                      "cursor-pointer relative flex items-center": true,
                      "mt-5": fakerKey,
                    })}
                  >
                    <div className="w-12 h-12 flex-none image-fit mr-1">
                      <img
                        alt="User"
                        className="rounded-full"
                        src={faker.photos[0]}
                      />

                      <div className="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"></div>
                    </div>

                    <div className="ml-2 overflow-hidden">
                      <div className="flex items-center">
                        <div className="font-medium truncate mr-5">
                          {faker.users[0].name}
                        </div>

                        <div className="text-xs text-slate-400 ml-auto whitespace-nowrap">
                          {faker.times[0]}
                        </div>
                      </div>

                      <div className="w-full truncate text-slate-500 mt-0.5">
                        {faker.news[0].shortContent}
                      </div>
                    </div>
                  </div>
                ))}
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Notifications */}

          {/* BEGIN: Account Menu */}
          <Dropdown className="intro-x w-8 h-8">
            <DropdownToggle
              tag="div"
              role="button"
              className="w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
            >
              <img
                alt="User Profile"
                src={$f()[9].photos[0]}
              />
            </DropdownToggle>

            <DropdownMenu className="w-56">
              <DropdownContent className="bg-primary/80 before:block before:absolute before:bg-black before:inset-0 before:rounded-md before:z-[-1] text-white">

                <DropdownHeader
                  tag="div"
                  className="!font-normal"
                >
                  <div className="font-medium">
                    {$f()[0].users[0].name}
                  </div>

                  <div className="text-xs text-white/60 mt-0.5 dark:text-slate-500">
                    Platform Administrator
                  </div>
                </DropdownHeader>

                <DropdownDivider className="border-white/[0.08]" />

                {/* Profile */}
                <DropdownItem
                  className="hover:bg-white/5 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  <Lucide
                    icon="User"
                    className="w-4 h-4 mr-2"
                  />
                  Profile
                </DropdownItem>

                {/* Reset Password */}
                <DropdownItem
                  className="hover:bg-white/5 cursor-pointer"
                  onClick={() => navigate("/change-password")}
                >
                  <Lucide
                    icon="Lock"
                    className="w-4 h-4 mr-2"
                  />
                  Reset Password
                </DropdownItem>

                {/* Help */}
                <DropdownItem
                  className="hover:bg-white/5 cursor-pointer"
                  onClick={() => navigate("/support")}
                >
                  <Lucide
                    icon="HelpCircle"
                    className="w-4 h-4 mr-2"
                  />
                  Help
                </DropdownItem>

                <DropdownDivider className="border-white/[0.08]" />

                {/* Logout */}
                <DropdownItem
                  className="hover:bg-white/5 cursor-pointer"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  <Lucide
                    icon="ToggleRight"
                    className="w-4 h-4 mr-2"
                  />
                  {loggingOut ? "Logging out..." : "Logout"}
                </DropdownItem>

              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
          {/* END: Account Menu */}

        </div>
      </div>
      {/* END: Top Bar */}
    </>
  );
}

export default Main;