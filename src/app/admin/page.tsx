import prisma from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import { PlusCircle, Megaphone, UtensilsCrossed } from "lucide-react";

export default async function AdminDashboard() {
  const productsCount = await prisma.products.count({
    where: { deleted_at: null }
  });
  const promotionsCount = await prisma.promotions.count({
    where: { is_active: true }
  });

  return (
    <div className="space-y-12">
      <div>
        <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
            Overview
        </span>
        <h1 className="text-4xl font-serif italic text-plum">Dashboard Overview</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card glass className="p-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-primary" />
                Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-black text-plum">{productsCount}</p>
            <p className="text-xs uppercase tracking-widest text-plum/40 mt-2 font-bold">Active items in menu</p>
          </CardContent>
        </Card>

        <Card glass className="p-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-secondary" />
                Active Promotions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-black text-plum">{promotionsCount}</p>
            <p className="text-xs uppercase tracking-widest text-plum/40 mt-2 font-bold">Live on marketing sections</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-serif italic text-plum">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/menu/new">
                <div className="group bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center">
                    <div className="bg-primary/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <PlusCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-plum uppercase tracking-widest text-sm">Add New Product</h3>
                    <p className="text-xs text-plum/50 mt-2">Create a new magical creation for your menu</p>
                </div>
            </Link>

            <Link href="/admin/promotions/new">
                <div className="group bg-white/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col items-center text-center">
                    <div className="bg-secondary/20 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform">
                        <Megaphone className="w-8 h-8 text-secondary" />
                    </div>
                    <h3 className="font-bold text-plum uppercase tracking-widest text-sm">Create Promotion</h3>
                    <p className="text-xs text-plum/50 mt-2">Design a new marketing banner or offer</p>
                </div>
            </Link>
        </div>
      </div>
    </div>
  );
}
