"use client";
import { useEffect, useRef } from "react";

export function Modal({ children, onClose, label, className = "" }: { children: React.ReactNode; onClose: () => void; label: string; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal(); document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} aria-label={label} onCancel={e => { e.preventDefault(); closeRef.current(); }} className={`m-auto max-w-none max-h-none w-full h-full border-0 bg-transparent p-4 backdrop:bg-slate-900/70 ${className}`}>
    <div className="flex min-h-full items-center justify-center">{children}</div>
  </dialog>;
}
