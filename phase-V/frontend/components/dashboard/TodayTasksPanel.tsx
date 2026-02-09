"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import TaskItem from "./TaskItem";
import { Task } from "@/lib/api";

interface TodayTasksPanelProps {
  tasks: Task[];
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, task: Partial<Task>) => Promise<unknown>;
}

export default function TodayTasksPanel({
  tasks,
  onToggleComplete,
  onEdit,
  onDelete,
  onUpdate,
}: TodayTasksPanelProps) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Tasks
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
              {tasks.length}
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "short",
            })}
          </p>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 -mr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggleComplete}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 icon-scale">
                <Calendar className="text-slate-300" size={32} />
              </div>
              <p className="text-slate-500 font-medium">No tasks found</p>
              <p className="text-sm text-slate-400 mt-1">
                Try adjusting your filters or search.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
