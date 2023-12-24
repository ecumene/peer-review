"use client";

import { useOrganization } from "@clerk/nextjs";
import { useEffect } from "react";

export default function RedirectHack() {
  const organization = useOrganization();

  useEffect(() => {
    //todo: redirect when there's no org
  }, []);

  return null;
}
