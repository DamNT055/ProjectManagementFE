"use client";

import { useEffect, useState } from "react";
import { Star, Clock, ArrowRight, Smile, Flag, Phone, MoreVertical, User, Plus } from "lucide-react"
import Image from "next/image"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CreateProjectModal } from "@/components/project/CreateProjectModal";

export default function Project() {
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        console.log(showCreate)
    })

    return (
        <>
            <div className="p-6 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-slate-100">Projects</h1>
                <Button onClick={() => setShowCreate(true)} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" /> New
                </Button>
            </div>

            <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                
                <KanbanCard
                    title="AGR - S00066 - Sales Order"
                    partner="Deco Addict"
                    dateStart="Oct 6"
                    dateEnd="Dec 1"
                    rating={5}
                    tasks={11}
                    milestones={{ done: 1, total: 3 }}
                    remaining="-200:00"
                    avatarUrl="/images/user/user-23.jpg"
                    isFavorite
                />
            </div>

+            <CreateProjectModal open={showCreate} onClose={() => setShowCreate(false)} />
        </>
    )
}

export interface KanbanCardProps {
    title: string
    partner: string
    dateStart: string
    dateEnd: string
    rating: number
    tasks: number
    milestones: { done: number; total: number }
    remaining: string
    avatarUrl: string
    isFavorite?: boolean
}

export function KanbanCard({
    title,
    partner,
    dateStart,
    dateEnd,
    rating,
    tasks,
    milestones,
    remaining,
    avatarUrl,
    isFavorite,
}: KanbanCardProps) {
    return (
        <Card
            role="link"
            className={cn(
                "group relative flex flex-col w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-900/60 p-4 hover:border-sky-600 hover:bg-slate-800/70 transition-colors"
            )}
        >
            {/* --- HEADER --- */}
            <header className="flex items-baseline gap-2 mb-2">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn("p-0 hover:bg-transparent", isFavorite && "text-yellow-400")}
                >
                    <Star className="h-4 w-4" />
                </Button>
                <h2 className="truncate text-lg font-semibold text-slate-100">{title}</h2>
            </header>

            {/* --- BODY --- */}
            <main className="flex flex-col gap-2 flex-1 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="truncate">{partner}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="truncate">{dateStart}</span>
                    <ArrowRight className="h-3 w-3 opacity-70" />
                    <span className="truncate">{dateEnd}</span>
                </div>

                <div className="flex items-center gap-2">
                    <Smile className="h-4 w-4 text-green-400" />
                    <span className="text-slate-100">{rating}</span> / 5
                </div>
            </main>

            {/* --- FOOTER --- */}
            <footer className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <span className="font-semibold text-slate-200">{tasks}</span>
                        <span className="text-slate-400">Tasks</span>
                    </div>

                    <div
                        className="flex items-center gap-1 text-red-400 text-sm"
                        title={`${milestones.done} Milestones reached out of ${milestones.total}`}
                    >
                        <Flag className="h-4 w-4" />
                        <span>
                            {milestones.done}/{milestones.total}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div
                        className="text-xs border border-red-400 text-red-400 rounded px-2 py-0.5"
                        title="Time Remaining"
                    >
                        {remaining}
                    </div>

                    <Button variant="ghost" size="icon" className="text-green-400 hover:bg-slate-700">
                        <Phone className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center gap-1">
                        <Image
                            src={avatarUrl}
                            alt="User avatar"
                            width={32}
                            height={32}
                            className="rounded-full border border-slate-700"
                        />
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:bg-slate-700">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </footer>
        </Card>
    )
}