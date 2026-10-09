"use client";

import type { ReactNode } from "react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "./Toast";

/**
 * The address rendered as a big display link, but a left-click copies it to
 * the clipboard and confirms with a toast instead of opening a mail client —
 * the `mailto:` href stays in place for middle-click, right-click and
 * screen readers.
 */
export default function CopyEmailLink({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children: ReactNode;
}) {
  const toast = useToast();

  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        void copyToClipboard(email).then((copied) => {
          toast({
            title: "CLIPBOARD // COPIED",
            description: copied
              ? `Email copied to clipboard: ${email}`
              : `Address: ${email}`,
            type: "success",
          });
        });
      }}
    >
      {children}
    </a>
  );
}
