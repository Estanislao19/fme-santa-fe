import type { FormFieldDefinition, FormKind } from "@/types";
import { categories, volunteerAreas } from "./categories";
const firstName: FormFieldDefinition = {
  name: "nombre",
  label: "Nombre",
  required: true,
};
const lastName: FormFieldDefinition = {
  name: "apellido",
  label: "Apellido",
  required: true,
};
const email: FormFieldDefinition = {
  name: "email",
  label: "Email",
  type: "email",
  required: true,
};
const phone: FormFieldDefinition = {
  name: "whatsapp",
  label: "WhatsApp",
  type: "tel",
  required: true,
};
const business: FormFieldDefinition = {
  name: "emprendimiento",
  label: "Nombre del emprendimiento",
  required: true,
};
export const formDefinitions: Record<FormKind, FormFieldDefinition[]> = {
  membership: [
    { name: "nombreCompleto", label: "Nombre y apellido", required: true },
    email,
    phone,
    business,
    { name: "instagram", label: "Instagram (opcional)" },
    {
      name: "rubro",
      label: "Rubro",
      type: "select",
      options: categories,
      required: true,
    },
    { name: "localidad", label: "Localidad", required: true },
    {
      name: "descripcion",
      label: "Descripción del emprendimiento",
      type: "textarea",
      required: true,
      full: true,
    },
    {
      name: "origen",
      label: "¿Cómo conociste FME?",
      required: true,
      full: true,
    },
  ],
  volunteer: [
    firstName,
    lastName,
    email,
    phone,
    {
      name: "area",
      label: "Área de interés",
      type: "select",
      options: volunteerAreas,
      required: true,
    },
    { name: "profesion", label: "Profesión / experiencia", required: true },
    { name: "disponibilidad", label: "Disponibilidad", required: true },
    {
      name: "portfolio",
      label: "LinkedIn / portfolio (opcional)",
      type: "url",
    },
    {
      name: "motivo",
      label: "Motivo para colaborar",
      type: "textarea",
      required: true,
      full: true,
    },
  ],
  contact: [
    firstName,
    email,
    { ...phone, required: false },
    { name: "motivo", label: "Motivo", required: true },
    {
      name: "mensaje",
      label: "Mensaje",
      type: "textarea",
      required: true,
      full: true,
    },
  ],
  alliance: [
    { name: "empresa", label: "Empresa / institución", required: true },
    firstName,
    { name: "cargo", label: "Cargo", required: true },
    email,
    phone,
    { name: "colaboracion", label: "Tipo de colaboración", required: true },
    {
      name: "mensaje",
      label: "Mensaje",
      type: "textarea",
      required: true,
      full: true,
    },
  ],
  training: [
    firstName,
    lastName,
    email,
    phone,
    {
      name: "socia",
      label: "¿Sos socia FME?",
      type: "select",
      options: ["Sí", "No", "Estoy en proceso de sumarme"],
      required: true,
    },
    { ...business, required: false },
    {
      name: "comentarios",
      label: "Comentarios (opcional)",
      type: "textarea",
      full: true,
    },
  ],
};
export const formButtons: Record<FormKind, string> = {
  membership: "Quiero formar parte",
  volunteer: "Quiero ser voluntaria/o",
  contact: "Enviar consulta",
  alliance: "Acercar una propuesta",
  training: "Inscribirme",
};
