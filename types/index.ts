export interface Member {
  slug: string;
  name: string;
  business: string;
  category: string;
  description: string;
  story: string;
  offers: string[];
  image?: string;
  gallery: string[];
  instagram?: string;
  phone?: string;
  whatsapp?: string;
  featured?: boolean;
  order?: number;
  active: boolean;
  demo: boolean;
}
export interface Training {
  featured?: boolean;
  order?: number;
  video?: string;
  registrationUrl?: string;
  slug: string;
  title: string;
  description: string;
  status: "upcoming" | "past";
  date: string;
  time: string;
  location: string;
  modality: string;
  duration: string;
  teacher: string;
  capacity: string;
  price: string;
  memberPrice: string;
  image?: string;
  gallery: string[];
  demo: boolean;
}
export interface TeamPerson {
  role: string;
  name: string;
  description: string;
  image?: string;
}
export interface Alliance {
  slug?: string;
  featured?: boolean;
  kind?: string;
  image?: string;
  instagram?: string;
  link?: string;
  demo?: boolean;
  name: string;
  description: string;
  action: string;
  logo?: string;
  url?: string;
  gallery: string[];
}
export interface Project {
  kind?: "Proyecto" | "Evento" | "Campaña";
  date?: string;
  featured?: boolean;
  cta?: string;
  ctaUrl?: string;
  slug: string;
  title: string;
  description: string;
  objective: string;
  image?: string;
  target?: number;
  raised?: number;
  demo: boolean;
}
export interface Collaborator {
  slug?: string;
  description?: string;
  image?: string;
  instagram?: string;
  featured?: boolean;
  name: string;
  kind: string;
  logo?: string;
  url?: string;
  demo: boolean;
}
export type FormKind =
  "membership" | "volunteer" | "contact" | "alliance" | "training";
export interface FormFieldDefinition {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "url" | "textarea" | "select";
  options?: readonly string[];
  required?: boolean;
  full?: boolean;
}
