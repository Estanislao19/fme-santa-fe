"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { FormKind, FormFieldDefinition } from "@/types";
import { formDefinitions, formButtons } from "@/data/forms";
import { site } from "@/data/site";
import { submitForm } from "@/utils/form-adapter";
export function FormField({
  field,
  id,
  error,
}: {
  field: FormFieldDefinition;
  id: string;
  error?: string;
}) {
  const common = {
    id,
    name: field.name,
    required: field.required,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  return (
    <div className={`form-field ${field.full ? "full" : ""}`}>
      <label htmlFor={id}>
        {field.label}
        {field.required && <span aria-hidden="true"> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea {...common} rows={4} maxLength={4000} />
      ) : field.type === "select" ? (
        <select {...common} defaultValue="">
          <option value="" disabled>
            Seleccioná una opción
          </option>
          {field.options?.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.type || "text"}
          autoComplete={
            field.type === "email"
              ? "email"
              : field.type === "tel"
                ? "tel"
                : field.name === "nombre"
                  ? "given-name"
                  : field.name === "apellido"
                    ? "family-name"
                    : field.name === "nombreCompleto"
                      ? "name"
                      : undefined
          }
          maxLength={300}
        />
      )}{" "}
      {error && (
        <p id={`${id}-error`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}
export default function Form({
  kind,
  context,
  categories,
}: {
  kind: FormKind;
  context?: string;
  categories?: string[];
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const result = useRef<HTMLDivElement>(null);
  const fields = formDefinitions[kind].map(field => field.name === "rubro" && categories ? { ...field, options: categories } : field);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const values: Record<string, string> = {};
    fields.forEach((field) => {
      const value = String(data.get(field.name) || "").trim();
      values[field.name] = value;
      if (field.required && !value)
        nextErrors[field.name] = "Completá este campo.";
      else if (
        value &&
        field.type === "email" &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      )
        nextErrors[field.name] = "Ingresá un email válido.";
      else if (
        value &&
        field.type === "tel" &&
        value.replace(/\D/g, "").length < 8
      )
        nextErrors[field.name] =
          "Ingresá un teléfono válido con código de área.";
      else if (value && field.type === "url") {
        try {
          const url = new URL(value);
          if (!["http:", "https:"].includes(url.protocol))
            nextErrors[field.name] = "Usá una dirección https:// válida.";
        } catch {
          nextErrors[field.name] =
            "Ingresá una dirección completa, por ejemplo https://…";
        }
      }
    });
    if (!data.get("privacidad"))
      nextErrors.privacidad =
        "Necesitamos que aceptes la política de privacidad.";
    setErrors(nextErrors);
    setMessage("");
    if (Object.keys(nextErrors).length) {
      const first = form.querySelector<HTMLElement>(
        `[name="${Object.keys(nextErrors)[0]}"]`,
      );
      first?.focus();
      return;
    }
    setBusy(true);
    try {
      const response = await submitForm({ kind, context, values });
      setMessage(response.message);
      setTimeout(() => result.current?.focus(), 0);
    } catch {
      setMessage(
        "No pudimos procesar la consulta. Intentá nuevamente o escribinos por Instagram.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="fme-form" noValidate onSubmit={handleSubmit}>
      <div className="form-notice">
        <strong>Canal en preparación.</strong> Podés probar el formulario. Por
        ahora no envía ni guarda datos. Para contactarnos,{" "}
        <a href={site.instagram} target="_blank" rel="noopener noreferrer">
          escribinos por Instagram ↗
        </a>
        .
      </div>
      <p className="required-note">Los campos con * son obligatorios.</p>
      <noscript>
        <p>
          Para probar el formulario necesitás JavaScript. Podés contactarnos por
          Instagram.
        </p>
      </noscript>
      <fieldset
        disabled={!ready}
        className="form-fieldset"
        aria-label="Datos de la solicitud"
      >
        <div className="form-grid">
          {fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              id={`${kind}-${field.name}`}
              error={errors[field.name]}
            />
          ))}
        </div>
        <div className="privacy-check">
          <input
            id={`${kind}-privacidad`}
            name="privacidad"
            type="checkbox"
            required
            aria-invalid={!!errors.privacidad}
            aria-describedby={
              errors.privacidad ? `${kind}-privacidad-error` : undefined
            }
          />
          <label htmlFor={`${kind}-privacidad`}>
            Leí y acepto la{" "}
            <Link href="/politica-de-privacidad">política de privacidad</Link>.
          </label>
        </div>
        {errors.privacidad && (
          <p id={`${kind}-privacidad-error`} className="field-error">
            {errors.privacidad}
          </p>
        )}
        <button type="submit" className="button" disabled={busy}>
          {busy ? "Revisando…" : formButtons[kind]}
        </button>
        {message && (
          <div className="form-result" ref={result} tabIndex={-1} role="status">
            {message}
          </div>
        )}
      </fieldset>
    </form>
  );
}
