"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundUseClient() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);
  return <p>Redirecting you to the notes page in 3 seconds...</p>;
}