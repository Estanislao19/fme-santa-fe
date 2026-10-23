"use client";
import { useState,useTransition } from "react";
import { addCategory } from "@/app/admin/actions";
import { useRouter } from "next/navigation";
export default function CategoryForm(){const[message,setMessage]=useState("");const[pending,start]=useTransition();const router=useRouter();return <form className="admin-form" onSubmit={e=>{e.preventDefault();const form=e.currentTarget;const data=new FormData(form);start(async()=>{const r=await addCategory(data);setMessage(r.error||r.message||"");if(!r.error){form.reset();router.refresh();}});}}><label>Nuevo rubro<input name="name" maxLength={100} required/></label><button className="button" disabled={pending}>{pending?"Guardando…":"Agregar rubro"}</button><p role="status">{message}</p></form>;}
