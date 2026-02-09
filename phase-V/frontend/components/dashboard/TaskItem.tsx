"use client";

import { motion } from "framer-motion";
import { Check, Trash2, Calendar, Flag, Tag, Repeat } from "lucide-react";
import { Task } from "@/lib/api";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import TaskCreationModal from "./TaskCreationModal";

interface TaskItemProps {
  task: Task;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, task: Partial<Task>) => Promise<unknown>;
}

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onUpdate,
}: TaskItemProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Priority colors
  const priorityColors = {
    high: "text-red-600 bg-red-50 border-red-100",
    medium: "text-amber-600 bg-amber-50 border-amber-100",
    low: "text-blue-600 bg-blue-50 border-blue-100",
  };

  const priorityColor =
    task.priority &&
    priorityColors[task.priority as keyof typeof priorityColors]
      ? priorityColors[task.priority as keyof typeof priorityColors]
      : "text-slate-500 bg-slate-50 border-slate-100";

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        whileHover={{ scale: 1.01 }}
        className={cn(
          "group relative flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200",
          task.completed
            ? "bg-slate-50 border-slate-100"
            : "bg-white border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100",
        )}
      >
        {/* Checkbox */}
        <button
          onClick={() => onToggle(task.id, !task.completed)}
          className={cn(
            "mt-1 shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200",
            task.completed
              ? "bg-green-500 border-green-500"
              : "border-slate-300 hover:border-blue-500",
          )}
        >
          {task.completed && (
            <Check size={14} className="text-white bg-transparent" />
          )}
        </button>

        {/* Content */}
        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => setIsEditModalOpen(true)}
        >
          <div className="space-y-1">
            <h3
              className={cn(
                "font-semibold text-slate-900 truncate transition-all",
                task.completed && "text-slate-400 line-through",
              )}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                className={cn(
                  "text-sm text-slate-500 line-clamp-2",
                  task.completed && "text-slate-300",
                )}
              >
                {task.description}
              </p>
            )}

            {/* Meta Data Tags */}
            <div className="flex flex-wrap gap-2 mt-2 pt-1">
              {/* Due Date */}
              {task.due_date && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border",
                    new Date(task.due_date) < new Date() && !task.completed
                      ? "text-red-600 bg-red-50 border-red-100"
                      : "text-slate-500 bg-slate-50 border-slate-100",
                  )}
                >
                  <Calendar size={10} />
                  {format(new Date(task.due_date), "MMM d, h:mm a")}
                </span>
              )}

              {/* Priority */}
              {task.priority && (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border capitalize",
                    priorityColor,
                  )}
                >
                  <Flag size={10} />
                  {task.priority}
                </span>
              )}

              {/* Recurring */}
              {task.recurring && (
                <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border text-purple-600 bg-purple-50 border-purple-100 capitalize">
                  <Repeat size={10} />
                  {task.recurring}
                </span>
              )}

              {/* Tags */}
              {task.tags &&
                task.tags.split(",").map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md border text-slate-600 bg-slate-100 border-slate-200"
                  >
                    <Tag size={10} />
                    {tag.trim()}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
        >
          <Trash2 size={18} />
        </button>
      </motion.div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <TaskCreationModal
          task={task}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}
