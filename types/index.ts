import { Icons } from '@/components/icons';

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

export type Category = {
  $oid: string;
};

export type Product = {
  _id: {
    $oid: string;
  };
  id?: string;
  name: string;
  image: string;
  status: boolean;
  isPopular: boolean;
  price: number;
  quantity: number;
  description: string;
  category: Category;
  createdAt: {
    $date: string; // Consider using a proper date type if possible
  };
  updatedAt: {
    $date: string; // Consider using a proper date type if possible
  };
};
