"use client";
import { signIn } from "next-auth/react";
import { Button } from "primereact/button";

export default function ButtonGoogleLogin() {
  return (
    <Button
      label="Login with Google"
      icon="pi pi-google"
      onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
    />
  );
}
