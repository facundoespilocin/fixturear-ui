import { createPortal } from "react-dom";
import { ReactNode } from "react";

export default function DropdownPortal({ children }: { children: ReactNode }) {
  return createPortal(
    <div className="fixed top-12 right-6 z-50">
      {children}
    </div>,
    document.body
  );
}
