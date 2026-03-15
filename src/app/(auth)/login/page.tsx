"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { Mail, Chrome } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const supabase = createClient();

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      alert("Supabase n'est pas configuré. Ajoutez les variables d'environnement.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/callback` },
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      setSent(true);
    }
  }

  async function handleGoogle() {
    if (!supabase) {
      alert("Supabase n'est pas configuré. Ajoutez les variables d'environnement.");
      return;
    }
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/callback` },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md backdrop-blur-xl bg-card/80 border-border">
        <CardHeader className="text-center">
          <Link href="/" className="inline-block mb-4">
            <span className="text-3xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              NihongoPath
            </span>
          </Link>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Connexion
          </CardTitle>
          <CardDescription>
            Connecte-toi pour sauvegarder ta progression
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {sent ? (
            <div className="text-center space-y-2 py-4">
              <Mail className="h-12 w-12 mx-auto text-violet" />
              <p className="text-lg font-medium">Vérifie ta boîte mail</p>
              <p className="text-muted-foreground text-sm">
                Un lien de connexion a été envoyé à <strong>{email}</strong>
              </p>
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="w-full h-12 text-base gap-3 hover:scale-[1.02] transition-all duration-200"
                onClick={handleGoogle}
              >
                <Chrome className="h-5 w-5" />
                Continuer avec Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">ou</span>
                </div>
              </div>

              <form onSubmit={handleMagicLink} className="space-y-3">
                <Input
                  type="email"
                  placeholder="ton@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 hover:scale-[1.02] transition-all duration-200"
                  disabled={loading}
                >
                  {loading ? "Envoi..." : "Recevoir un lien magique"}
                </Button>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
