import type { FormKind } from "@/types";
export interface FormSubmission {
  kind: FormKind;
  values: Record<string, string>;
  context?: string;
}
export interface FormResult {
  status: "preview" | "sent";
  message: string;
}
// Único punto de integración futura. No realiza requests ni almacena información personal.
export async function submitForm(
  _submission: FormSubmission,
): Promise<FormResult> {
  return {
    status: "preview",
    message:
      "Revisamos los campos y están completos. El envío todavía no está habilitado: tus datos no fueron enviados ni guardados. Podés escribirnos por Instagram mientras preparamos este canal.",
  };
}
