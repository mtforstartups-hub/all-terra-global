"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import AuthModal from "@/components/shared/AuthModal";

interface AuthModalContextType {
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AuthModalContext.Provider
      value={{
        openAuthModal: () => setIsOpen(true),
        closeAuthModal: () => setIsOpen(false),
      }}
    >
      {children}
      <AuthModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onLoginSuccess={() => setIsOpen(false)}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx)
    throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
}
