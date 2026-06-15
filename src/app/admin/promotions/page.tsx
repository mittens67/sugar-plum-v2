import prisma from "@/lib/prisma";
import { softDeletePromotion, restorePromotion, togglePromotionStatus, permanentlyDeletePromotion } from "../actions";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Plus, Edit2, Trash2, RefreshCw, Power, PowerOff, ChevronLeft, ChevronRight, Calendar, ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import AdminSearchBar from "@/components/admin/SearchBar";
import HardDeleteModal from "@/components/admin/HardDeleteModal";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { Prisma } from "@prisma/client";

export default async function AdminPromotions({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const searchQuery = params.q || "";
  
  const pageSize = 6; // Grids look better with 6
  const skip = (page - 1) * pageSize;

  const where: Prisma.promotionsWhereInput = searchQuery ? {
    title: {
        contains: searchQuery,
        mode: 'insensitive'
    }
  } : {};

  const [promotions, totalCount] = await Promise.all([
    prisma.promotions.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: [{ priority: "desc" }, { created_at: "desc" }],
    }),
    prisma.promotions.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <span className="text-secondary font-bold tracking-[0.3em] uppercase text-[10px] block mb-2">
                Marketing
            </span>
            <h1 className="text-4xl font-serif italic text-plum">Promotions</h1>
            <p className="text-xs text-plum/40 mt-1 uppercase tracking-widest font-bold">
                {searchQuery ? `Searching "${searchQuery}": ` : "Active Campaigns: "} {totalCount} found
            </p>
        </div>
        <Link href="/admin/promotions/new">
          <Button className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/20">
            <Plus className="w-4 h-4" />
            Create New Promotion
          </Button>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <AdminSearchBar
          initialValue={searchQuery}
          apiEndpoint="/api/admin/promotions/suggestions"
          redirectPath="/admin/promotions"
          accentColor="secondary"
          placeholder="Search promotions..."
        />
        
        <div className="flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="text-[10px] font-black uppercase tracking-widest text-plum/60">{totalCount} Campaigns</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {promotions.map((promo, index) => (
          <Card key={promo.id.toString()} glass className={`overflow-hidden flex flex-col transition-all relative group ${!promo.is_active || promo.deleted_at ? "opacity-60 grayscale" : ""}`}>
            
            {/* Serial Number Badge */}
            <div className="absolute top-4 left-4 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center border border-plum/10 shadow-sm">
                <span className="text-[10px] font-black text-plum/40">{skip + index + 1}</span>
            </div>

            {promo.image_url && (
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img src={promo.image_url} alt={promo.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 items-end">
                  <Badge variant={promo.deleted_at ? "deleted" : promo.is_active ? "active" : "inactive"} />
                  {promo.priority > 0 && (
                    <Badge variant="priority" label={`Priority: ${promo.priority}`} dot={false} />
                  )}
                </div>
                {promo.display_type === 'IMAGE_ONLY' && (
                    <div className="absolute inset-0 bg-secondary/10 pointer-events-none ring-4 ring-secondary/20 ring-inset" />
                )}
              </div>
            )}
            
            <CardHeader className="p-6 pb-2">
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="text-xl font-serif italic text-plum line-clamp-1">{promo.title}</CardTitle>
                {promo.link && (
                    <a href={promo.link} target="_blank" rel="noopener noreferrer" className="text-plum/20 hover:text-secondary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}
              </div>
              <p className="text-xs text-plum/60 mt-2 line-clamp-2 min-h-[2rem]">{promo.description || "No description provided."}</p>
            </CardHeader>
            
            <CardContent className="p-6 pt-4 mt-auto space-y-4">
              {/* Scheduling info */}
              {(promo.start_date || promo.end_date) && (
                <div className="flex items-center gap-2 text-[9px] font-bold text-plum/40 uppercase tracking-tighter bg-plum/5 p-2 rounded-lg border border-plum/10">
                    <Calendar className="w-3 h-3" />
                    <span>
                        {promo.start_date ? new Date(promo.start_date).toLocaleDateString() : "Now"} 
                        {" → "} 
                        {promo.end_date ? new Date(promo.end_date).toLocaleDateString() : "Always"}
                    </span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-plum/5">
                <form action={togglePromotionStatus.bind(null, promo.id, promo.is_active)}>
                    <button type="submit" className={`p-2 rounded-xl border transition-all shadow-sm hover:shadow-md ${promo.is_active ? "text-amber-500 border-amber-100 bg-amber-50 hover:bg-amber-100" : "text-green-500 border-green-100 bg-green-50 hover:bg-green-100"}`} title={promo.is_active ? "Deactivate" : "Activate"}>
                    {promo.is_active ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                    </button>
                </form>
                
                <Link href={`/admin/promotions/edit/${promo.id}`} className="p-2 text-plum/40 hover:text-primary transition-all bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md" title="Edit">
                    <Edit2 className="w-4 h-4" />
                </Link>

                {promo.deleted_at ? (
                    <div className="flex gap-2">
                        <form action={restorePromotion.bind(null, promo.id)}>
                            <button type="submit" className="p-2 text-blue-500 hover:text-blue-600 transition-all bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md" title="Restore">
                                <RefreshCw className="w-4 h-4" />
                            </button>
                        </form>
                        <HardDeleteModal itemId={promo.id.toString()} itemName={promo.title} itemType="promotion" onDelete={permanentlyDeletePromotion} />
                    </div>
                ) : (
                    <form action={softDeletePromotion.bind(null, promo.id)}>
                        <button type="submit" className="p-2 text-plum/40 hover:text-red-500 transition-all bg-white/50 rounded-xl border border-plum/5 shadow-sm hover:shadow-md" title="Delete">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </form>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {promotions.length === 0 && (
          <EmptyState
            className="col-span-full"
            title={searchQuery ? "No matching magic found." : "No marketing magic has been created yet."}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-8 py-6 bg-white/30 backdrop-blur-md rounded-card border border-white/60 shadow-xl">
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-plum/40">
                    Page {page} of {totalPages}
                </span>
            </div>
            <div className="flex gap-2">
                <Link 
                    href={`/admin/promotions?page=${page - 1}${searchQuery ? `&q=${searchQuery}` : ""}`}
                    className={`p-2 rounded-xl border transition-all ${page <= 1 ? "pointer-events-none opacity-20 bg-transparent border-plum/10 text-plum/40" : "bg-white hover:bg-secondary/10 border-plum/10 text-plum shadow-sm hover:shadow-md"}`}
                >
                    <ChevronLeft className="w-4 h-4" />
                </Link>
                <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Link
                            key={p}
                            href={`/admin/promotions?page=${p}${searchQuery ? `&q=${searchQuery}` : ""}`}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-[10px] font-black transition-all ${p === page ? "bg-secondary text-white shadow-lg scale-110" : "bg-white/50 text-plum/40 hover:bg-white hover:text-plum border border-plum/5"}`}
                        >
                            {p}
                        </Link>
                    ))}
                </div>
                <Link 
                    href={`/admin/promotions?page=${page + 1}${searchQuery ? `&q=${searchQuery}` : ""}`}
                    className={`p-2 rounded-xl border transition-all ${page >= totalPages ? "pointer-events-none opacity-20 bg-transparent border-plum/10 text-plum/40" : "bg-white hover:bg-secondary/10 border-plum/10 text-plum shadow-sm hover:shadow-md"}`}
                >
                    <ChevronRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
      )}
    </div>
  );
}
