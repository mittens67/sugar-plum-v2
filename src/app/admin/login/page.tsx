"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Lock, Mail, Key } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-background">
      <div className="mb-8 transition-transform hover:scale-105">
        <Image
          src="/logo1.png"
          alt="Sugar Plum Logo"
          width={200}
          height={80}
          priority
          className="object-contain"
        />
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary mt-2 font-black text-center">
            Management Portal
        </p>
      </div>

      <Card glass className="w-full max-w-md p-4 animate-in fade-in zoom-in duration-500">
        <CardHeader className="pt-8">
          <CardTitle className="text-3xl font-serif italic text-center text-plum flex items-center justify-center gap-3">
            <Lock className="w-6 h-6 text-primary" />
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-plum/50 flex items-center gap-2">
                <Mail className="w-3 h-3" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="admin@sugarplum.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium text-plum"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-plum/50 flex items-center gap-2">
                <Key className="w-3 h-3" />
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/50 border border-plum/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all font-medium text-plum"
                required
              />
            </div>
            {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <p className="text-xs font-bold text-red-500 uppercase tracking-widest text-center">{error}</p>
                </div>
            )}
            <Button
              type="submit"
              className="w-full py-3 rounded-full text-sm shadow-xl shadow-primary/10"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Enter Workshop"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-plum/30 font-bold">
        Secure Magical Environment
      </p>
    </div>
  );
}
