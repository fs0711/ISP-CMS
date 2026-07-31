import { Lucide, Alert } from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";

function Main() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // BEGIN: System Overview placeholder data
  const overviewCards = [
    {
      label: "Active Subscribers",
      value: "1,180",
      icon: "Users",
      color: "text-primary",
    },
    {
      label: "Pending Installations",
      value: "24",
      icon: "Wrench",
      color: "text-warning",
    },
    {
      label: "Open Support Tickets",
      value: "37",
      icon: "LifeBuoy",
      color: "text-danger",
    },
    {
      label: "Outstanding Payments",
      value: "PKR 186,400",
      icon: "CreditCard",
      color: "text-danger",
    },
    {
      label: "Active Resellers",
      value: "12",
      icon: "Building2",
      color: "text-primary",
    },
    {
      label: "Low Stock Equipment",
      value: "5 Items",
      icon: "PackageX",
      color: "text-warning",
    },
  ];
  // END: System Overview placeholder data

  // BEGIN: Quick Actions data
  const quickActions = [
    { label: "Add Subscriber", icon: "UserPlus" },
    { label: "Create Invoice", icon: "FileText" },
    { label: "Register Complaint", icon: "AlertCircle" },
    { label: "Add Package", icon: "Package" },
    { label: "Add Equipment", icon: "HardDrive" },
    { label: "Add Employee", icon: "Briefcase" },
  ];
  // END: Quick Actions data

  const recentSubscribers = $_.take($f(), 5);
  const recentPayments = $_.take($f(), 5);
  const pendingInstallations = $_.take($f(), 5);
  const supportTickets = $_.take($f(), 5);

  return (
    <>
      {/* BEGIN: Dashboard Header */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 intro-y">
          <Alert className="box bg-primary text-white flex flex-wrap items-center justify-between gap-3 mb-6">
            {({ dismiss }) => (
              <>
                <span className="leading-relaxed break-words pr-2">
                  Welcome to ISP Management System. Monitor subscribers,
                  billing, complaints, installations and support tickets from
                  one dashboard.
                </span>
                <button
                  type="button"
                  className="btn-close text-white"
                  onClick={dismiss}
                  aria-label="Close"
                >
                  <Lucide icon="X" className="w-4 h-4" />
                </button>
              </>
            )}
          </Alert>
        </div>

        <div className="col-span-12 intro-y flex flex-col sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-medium">Dashboard</h2>
            <div className="text-slate-500 mt-1">
              Here's what's happening across your network today.
            </div>
          </div>
          <div className="sm:ml-auto mt-3 sm:mt-0 flex items-center text-slate-500">
            <Lucide icon="Calendar" className="w-4 h-4 mr-2" />
            {today}
          </div>
        </div>
        {/* END: Dashboard Header */}

        {/* BEGIN: Quick Actions */}
        <div className="col-span-12 intro-y">
          <div className="box p-5">
            <div className="font-medium mb-4">Quick Actions</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {quickActions.map((action, actionKey) => (
                <button
                  key={actionKey}
                  type="button"
                  className="btn btn-outline-secondary flex flex-col items-center justify-center py-4 px-2"
                >
                  <Lucide icon={action.icon} className="w-5 h-5 mb-2" />
                  <span className="text-xs text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* END: Quick Actions */}

        {/* BEGIN: System Overview */}
        <div className="col-span-12 mt-2">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              System Overview
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-6 mt-2">
            {overviewCards.map((card, cardKey) => (
              <div
                key={cardKey}
                className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 intro-y"
              >
                <div className="box p-5 flex items-center">
                  <Lucide
                    icon={card.icon}
                    className={classnames("w-8 h-8 mr-4 flex-none", card.color)}
                  />
                  <div>
                    <div className="text-xl font-medium">{card.value}</div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      {card.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* END: System Overview */}

        {/* BEGIN: Recent Subscribers */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Recent Subscribers
            </h2>
            <a href="" className="ml-auto text-primary truncate">
              View All
            </a>
          </div>
          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">CUSTOMER</th>
                  <th className="whitespace-nowrap">PACKAGE</th>
                  <th className="whitespace-nowrap">DATE JOINED</th>
                  <th className="text-center whitespace-nowrap">STATUS</th>
                  <th className="text-center whitespace-nowrap">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {recentSubscribers.map((faker, fakerKey) => (
                  <tr key={fakerKey} className="intro-x">
                    <td>
                      <div className="flex items-center">
                        <div className="w-9 h-9 flex-none image-fit rounded-full overflow-hidden mr-3">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            src={faker.photos[0]}
                          />
                        </div>
                        <span className="whitespace-nowrap">
                          {faker.users[0].name}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      {faker.products[0].name}
                    </td>
                    <td className="whitespace-nowrap">{faker.dates[0]}</td>
                    <td className="w-40">
                      <div
                        className={classnames({
                          "flex items-center justify-center": true,
                          "text-success": faker.trueFalse[0],
                          "text-danger": !faker.trueFalse[0],
                        })}
                      >
                        <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                        {faker.trueFalse[0] ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="table-report__action w-32">
                      <div className="flex justify-center items-center">
                        <a className="flex items-center mr-3" href="">
                          <Lucide icon="Eye" className="w-4 h-4 mr-1" /> View
                        </a>
                        <a className="flex items-center text-danger" href="">
                          <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Recent Subscribers */}

        {/* BEGIN: Recent Payments */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Recent Payments
            </h2>
            <a href="" className="ml-auto text-primary truncate">
              View All
            </a>
          </div>
          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">CUSTOMER</th>
                  <th className="whitespace-nowrap">METHOD</th>
                  <th className="whitespace-nowrap">DATE PAID</th>
                  <th className="text-right whitespace-nowrap">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((faker, fakerKey) => (
                  <tr key={fakerKey} className="intro-x">
                    <td>
                      <div className="flex items-center">
                        <div className="w-9 h-9 flex-none image-fit rounded-full overflow-hidden mr-3">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            src={faker.photos[0]}
                          />
                        </div>
                        <span className="whitespace-nowrap">
                          {faker.users[0].name}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">
                      {faker.trueFalse[0] ? "Cash" : "Bank Transfer"}
                    </td>
                    <td className="whitespace-nowrap">{faker.dates[0]}</td>
                    <td
                      className={classnames("text-right whitespace-nowrap", {
                        "text-success": faker.trueFalse[0],
                        "text-danger": !faker.trueFalse[0],
                      })}
                    >
                      PKR {faker.totals[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Recent Payments */}

        {/* BEGIN: Pending Installations */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Pending Installations
            </h2>
            <a href="" className="ml-auto text-primary truncate">
              View All
            </a>
          </div>
          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">CUSTOMER</th>
                  <th className="whitespace-nowrap">PACKAGE</th>
                  <th className="whitespace-nowrap">SCHEDULED DATE</th>
                  <th className="text-center whitespace-nowrap">TECHNICIAN</th>
                  <th className="text-center whitespace-nowrap">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {pendingInstallations.map((faker, fakerKey) => (
                  <tr key={fakerKey} className="intro-x">
                    <td className="whitespace-nowrap">
                      {faker.users[0].name}
                    </td>
                    <td className="whitespace-nowrap">
                      {faker.products[0].name}
                    </td>
                    <td className="whitespace-nowrap">{faker.dates[0]}</td>
                    <td className="text-center whitespace-nowrap">
                      {faker.users[1].name}
                    </td>
                    <td className="w-40">
                      <div
                        className={classnames({
                          "flex items-center justify-center": true,
                          "text-warning": faker.trueFalse[0],
                          "text-primary": !faker.trueFalse[0],
                        })}
                      >
                        <Lucide icon="Clock" className="w-4 h-4 mr-2" />
                        {faker.trueFalse[0] ? "Scheduled" : "In Progress"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Pending Installations */}

        {/* BEGIN: Latest Support Tickets */}
        <div className="col-span-12 lg:col-span-6 mt-6">
          <div className="intro-y flex items-center h-10">
            <h2 className="text-lg font-medium truncate mr-5">
              Latest Support Tickets
            </h2>
            <a href="" className="ml-auto text-primary truncate">
              View All
            </a>
          </div>
          <div className="intro-y overflow-auto mt-5">
            <table className="table table-report">
              <thead>
                <tr>
                  <th className="whitespace-nowrap">TICKET #</th>
                  <th className="whitespace-nowrap">CUSTOMER</th>
                  <th className="whitespace-nowrap">ISSUE</th>
                  <th className="text-center whitespace-nowrap">PRIORITY</th>
                  <th className="text-center whitespace-nowrap">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {supportTickets.map((faker, fakerKey) => (
                  <tr key={fakerKey} className="intro-x">
                    <td className="whitespace-nowrap">
                      #{10230 + fakerKey}
                    </td>
                    <td className="whitespace-nowrap">
                      {faker.users[0].name}
                    </td>
                    <td className="whitespace-nowrap">
                      {faker.trueFalse[0]
                        ? "Slow connection speed"
                        : "Complete service outage"}
                    </td>
                    <td className="w-32">
                      <div
                        className={classnames({
                          "flex items-center justify-center": true,
                          "text-danger": !faker.trueFalse[0],
                          "text-warning": faker.trueFalse[0],
                        })}
                      >
                        {faker.trueFalse[0] ? "Medium" : "High"}
                      </div>
                    </td>
                    <td className="w-32">
                      <div
                        className={classnames({
                          "flex items-center justify-center": true,
                          "text-success": faker.trueFalse[0],
                          "text-primary": !faker.trueFalse[0],
                        })}
                      >
                        <Lucide icon="Circle" className="w-3 h-3 mr-2" />
                        {faker.trueFalse[0] ? "Resolved" : "Open"}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* END: Latest Support Tickets */}
      </div>
    </>
  );
}

export default Main;