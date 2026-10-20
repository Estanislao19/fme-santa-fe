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
  active: boolean;
  demo: boolean;
}
export interface Training {
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
  name: string;
  description: string;
  action: string;
  logo?: string;
  url?: string;
  gallery: string[];
}
export interface Project {
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
