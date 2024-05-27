"use client";

import { Chapter } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ChaptersListProps {
  items: Chapter[];
  onEdit: (id: string) => void;
};

const ChaptersList = ({
  items,
  onEdit
}: ChaptersListProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div>
        <div>
          {chapters.map((chapter, index) => (
            <div
              className={cn(
                "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                chapter.isPublished && "bg-sky-100 border-sky-200 text-sky-700"
              )}
              key={index} 
            >
              <div
                className={cn(
                  "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                  chapter.isPublished && "border-r-sky-200 hover:bg-sky-200"
                )}
              >
                <Grip className="h-5 w-5" />
              </div>
              {chapter.title}
              <div className="ml-auto pr-2 flex items-center gap-x-2">
                {chapter.isFree && <Badge>Free</Badge>}
                <Badge
                  className={cn(
                    "bg-slate-500",
                    chapter.isPublished && "bg-sky-700"
                  )}
                >
                  {chapter.isPublished ? "Published" : "Draft"}
                </Badge>
                <div className="p-1 bg-slate-800 rounded-[50%]">
                  <Pencil onClick={() => onEdit(chapter.id)} className="w-4 h-4 cursor-pointer hover:opacity-75 transition text-slate-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ChaptersList