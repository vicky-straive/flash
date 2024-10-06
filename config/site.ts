export type SiteConfig = typeof siteConfig;
import Link from "next/link";

export const siteConfig = {
  name: "Chapter 1",
  description: "A beautiful experience.",
  navItems: [
    {
      label: "Home",
      href: "/pages/reservations",
    },
    // {
    //   label: "About",
    //   href: "/about",
    // },
  ],
  navMenuItems: [
    {
      label: "Reservations",
      href: "/pages/reservations",
    },
    // {
    //   label: "Dashboard",
    //   href: "/dashboard",
    // },
    // {
    //   label: "Projects",
    //   href: "/projects",
    // },
    // {
    //   label: "Team",
    //   href: "/team",
    // },
    // {
    //   label: "Calendar",
    //   href: "/calendar",
    // },
    {
      label: "Settings",
      href: "/settings",
    },
    // {
    //   label: "Help & Feedback",
    //   href: "/help-feedback",
    // },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    // github: "https://github.com/nextui-org/nextui",
    // twitter: "https://twitter.com/getnextui",
    // docs: "https://nextui.org",
    // discord: "https://discord.gg/9b6yyZKmH4",
    // sponsor: "https://patreon.com/jrgarciadev",
  },
};
