export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
};

export type NavItem = {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  icon?: any;
};

export type SidebarNavItem = {
  title: string;
  items: NavItem[];

  icon?: any;
};

export type MarketingConfig = {
  mainNav: NavItem[];
};
