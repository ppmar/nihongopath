"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      router.push("/");
      return;
    }

    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        router.push("/dashboard");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-violet border-t-transparent" />
        <p className="text-muted-foreground">Connexion en cours...</p>
      </div>
    </div>
  );
}
