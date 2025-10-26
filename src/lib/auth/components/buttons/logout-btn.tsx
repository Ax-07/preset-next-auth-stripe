"use client";

import React from "react";
import { LogOutIcon } from "lucide-react";
import { signOut } from "../../auth-server";

export const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <form action={handleLogout} className="w-full">
      <button
        type="submit"
        className="flex gap-2 items-center cursor-pointer"
      >
        <LogOutIcon />
        Se déconnecter
      </button>
    </form>
  );
};
