import dom from "@left4code/tw-starter/dist/js/dom";
import { atom } from "recoil";


// Setup side menu
const findActiveMenu = (subMenu, location) => {
  let match = false;
  subMenu.forEach((item) => {
    if (
      ((location.forceActiveMenu !== undefined &&
        item.pathname === location.forceActiveMenu) ||
        (location.forceActiveMenu === undefined &&
          item.pathname === location.pathname)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location);
    }
  });
  return match;
};

const nestedMenu = (menu, location) => {
  menu.forEach((item, key) => {
    if (typeof item !== "string") {
      let menuItem = menu[key];
      menuItem.active =
        ((location.forceActiveMenu !== undefined &&
          item.pathname === location.forceActiveMenu) ||
          (location.forceActiveMenu === undefined &&
            item.pathname === location.pathname) ||
          (item.subMenu && findActiveMenu(item.subMenu, location))) &&
        !item.ignore;

      if (item.subMenu) {
        menuItem.activeDropdown = findActiveMenu(item.subMenu, location);
        menuItem = {
          ...item,
          ...nestedMenu(item.subMenu, location),
        };
      }
    }
  });

  return menu;
};

const linkTo = (menu, navigate) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    navigate(menu.pathname);
  }
};

const enter = (el, done) => {
  dom(el).slideDown(300);
};

const leave = (el, done) => {
  dom(el).slideUp(300);
};

export { nestedMenu, linkTo, enter, leave };

const ispMenu = [
  { icon: "Home", pathname: "/", title: "Dashboard" },
  { icon: "Users", pathname: "/subscribers", title: "Subscribers" },
  { icon: "Package", pathname: "/packages", title: "Packages" },
  { icon: "CreditCard", pathname: "/billing", title: "Billing" },
  { icon: "DollarSign", pathname: "/payments", title: "Payments" },
  { icon: "FileText", pathname: "/invoices", title: "Invoices" },
  { icon: "Share2", pathname: "/resellers", title: "Resellers / LCO" },
  { icon: "LifeBuoy", pathname: "/support", title: "Support Tickets" },
  { icon: "Archive", pathname: "/inventory", title: "Inventory" },
  { icon: "Wifi", pathname: "/network", title: "Network" },
  { icon: "UserCheck", pathname: "/employees", title: "Employees" },
  { icon: "Shield", pathname: "/roles", title: "Users & Roles" },
  { icon: "BarChart2", pathname: "/reports", title: "Reports" },
  { icon: "Settings", pathname: "/settings", title: "Settings" },
];

const platformOwnerMenu = [
  {
    icon: "Home",
    pathname: "/platform-owner",
    title: "Dashboard",
  },

  {
    icon: "Building2",
    pathname: "/platform-owner/organizations",
    title: "ISPs / Organizations",
  },

  {
    icon: "Package",
    pathname: "/platform-owner/subscriptions",
    title: "Subscriptions",
  },

  {
    icon: "CreditCard",
    pathname: "/platform-owner/billing",
    title: "Platform Billing",
  },

  {
    icon: "Shield",
    pathname: "/platform-owner/users-roles",
    title: "Users & Roles",
  },

  {
    icon: "BarChart2",
    pathname: "/platform-owner/reports",
    title: "Reports",
  },

  {
    icon: "Settings",
    pathname: "/platform-owner/settings",
    title: "Settings",
  },
];

const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: ispMenu,
    ispMenu,
    platformOwnerMenu,
  },
});

export { sideMenu };