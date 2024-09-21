import { SidebarNavItem, SiteConfig } from "../types";

export const siteConfig: SiteConfig = {
  name: "Connector",
  description: "Stake your wstEth and earn unbelievable yield",
  url: "localhost:3000",
  ogImage: `localhost:3000/_static/og.jpg`,
  links: {
    twitter: "",
    github: "",
  },
  mailSupport: "support@connector.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Enterprise", href: "#" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Security", href: "#" },
      { title: "Customization", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Changelog", href: "#" },
    ],
  },
  {
    title: "Docs",
    items: [
      { title: "Introduction", href: "#" },
      { title: "Installation", href: "#" },
      { title: "Components", href: "#" },
      { title: "Code Blocks", href: "#" },
    ],
  },
];
