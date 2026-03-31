"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import NdaModal from "@/components/dashboard/SignNdaButton";

export default function NdaProtector({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const isVerifying = searchParams.get("event") === "signing_complete";
  const hasSignedNda = user.hasSignedNda;

  return (
    <>
      {/* NDA Modal Overlay */}
      {!hasSignedNda && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <NdaModal
            userId={user.id}
            userEmail={user.email}
            userName={user.name}
            isVerifying={isVerifying}
            hasSignedNda={hasSignedNda}
          />
        </div>
      )}

      {/* Main Content (Blurred and locked if NDA not signed) */}
      <div
        className={
          !hasSignedNda ? "blur-md pointer-events-none select-none" : ""
        }
      >
        {children}
      </div>
    </>
  );
}
