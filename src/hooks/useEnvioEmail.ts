import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE = "service_j1i09b9";
const EMAILJS_TEMPLATE = "template_k3jrnkq";
const EMAILJS_PUBLIC = "BSUMBKusFt7HXiAwx";

export type StatusEnvio = "idle" | "sending" | "success" | "error";

export function useEnvioEmail() {
  const [status, setStatus] = useState<StatusEnvio>("idle");

  const enviarFormulario = (formElement: HTMLFormElement) => {
    setStatus("sending");
    emailjs
      .sendForm(EMAILJS_SERVICE, EMAILJS_TEMPLATE, formElement, EMAILJS_PUBLIC)
      .then(() => {
        setStatus("success");
        formElement.reset();
        setTimeout(() => setStatus("idle"), 5000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      });
  };

  return { status, enviarFormulario };
}
