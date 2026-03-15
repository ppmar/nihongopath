"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) {
      router.push("/");
      return;
    }

    // Handle the OAuth code exchange
    const code = searchParams.get("code");
    if (code) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) {
          console.error("Auth error:", error);
          router.push("/login");
        } else {
          router.push("/dashboard");
        }
      });
    } else {
      // Fallback: listen for auth state change (hash fragment flow)
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === "SIGNED_IN") {
          router.push("/dashboard");
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-violet border-t-transparent" />
        <p className="text-muted-foreground">Connexion en cours...</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <div className="h-8 w-8 mx-auto animate-spin rounded-full border-2 border-violet border-t-transparent" />
            <p className="text-muted-foreground">Connexion en cours...</p>
          </div>
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
