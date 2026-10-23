"use client";
import { useActionState } from "react";
import { login } from "@/app/admin/actions";
export default function Login() {
  const [state, action, pending] = useActionState(login, { error: "" });
  return <form action={action} className="admin-form admin-login-form">
    <label>Email<input type="email" name="email" autoComplete="username" required /></label>
    <label>Contraseña<input type="password" name="password" autoComplete="current-password" required /></label>
    {state.error && <p role="alert" className="admin-error">{state.error}</p>}
    <button className="button" disabled={pending}>{pending ? "Ingresando…" : "Ingresar"}</button>
  </form>;
}
