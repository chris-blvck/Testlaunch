export interface MenuItem {
  name: string;
  description?: string;
  price?: string;
}

export interface MenuSection {
  name: string;
  items: MenuItem[];
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export type TemplateId = "modern" | "classic" | "minimal";

export interface RestaurantData {
  id: string;
  name: string;
  tagline?: string;
  cuisine: string;
  description: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  website?: string;
  hours?: OpeningHours;
  menu?: MenuSection[];
  heroImage?: string; // URL or base64
  logoText?: string;
  primaryColor: string;
  accentColor: string;
  templateId: TemplateId;
  createdAt: string;
  updatedAt: string;
  deployedUrl?: string;
}

export type RestaurantInput = Omit<RestaurantData, "id" | "createdAt" | "updatedAt">;
