"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Custom404() {
  useEffect(() => {
    redirect("/about");
  });

  return null;
}
