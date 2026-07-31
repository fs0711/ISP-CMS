import { atom } from "recoil";

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: "Home",
        pathname: "/",
        title: "Dashboard",
      },
      {
        icon: "Users",
        pathname: "/subscribers",
        title: "Subscribers",
      },
      {
        icon: "Package",
        pathname: "/packages",
        title: "Packages",
      },
      {
        icon: "CreditCard",
        pathname: "/billing",
        title: "Billing",
      },
      {
        icon: "DollarSign",
        pathname: "/payments",
        title: "Payments",
      },
      {
        icon: "FileText",
        pathname: "/invoices",
        title: "Invoices",
      },
      {
        icon: "Share2",
        pathname: "/resellers",
        title: "Resellers / LCO",
      },
      {
        icon: "LifeBuoy",
        pathname: "/support",
        title: "Support Tickets",
      },
      {
        icon: "Archive",
        pathname: "/inventory",
        title: "Inventory",
      },
      {
        icon: "Wifi",
        pathname: "/network",
        title: "Network",
      },
      {
        icon: "UserCheck",
        pathname: "/employees",
        title: "Employees",
      },
      {
        icon: "Shield",
        pathname: "/roles",
        title: "Users & Roles",
      },
      {
        icon: "BarChart2",
        pathname: "/reports",
        title: "Reports",
      },
      {
        icon: "Settings",
        pathname: "/settings",
        title: "Settings",
      },
    ],
  },
});

export { sideMenu };