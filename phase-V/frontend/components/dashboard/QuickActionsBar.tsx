"use client";

import { Search, Filter, SortDesc, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionsBarProps {
  onNewTask: () => void;
  onSearch: (query: string) => void;
  onFilterChange: (filters: {
    status?: string;
    priority?: string;
    sort_by?: string;
  }) => void;
}

export default function QuickActionsBar({
  onNewTask,
  onSearch,
  onFilterChange,
}: QuickActionsBarProps) {
  return (
    <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3">
      <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 transition-all font-medium"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          {/* Priority Filter */}
          <select
            onChange={(e) =>
              onFilterChange({ priority: e.target.value || undefined })
            }
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer hover:bg-slate-50 transition-colors"
            defaultValue=""
          >
            <option value="">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Sort Filter */}
          <select
            onChange={(e) => onFilterChange({ sort_by: e.target.value })}
            className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer hover:bg-slate-50 transition-colors hidden sm:block"
            defaultValue="created_at"
          >
            <option value="created_at">Newest</option>
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
          </select>

          <Button
            onClick={onNewTask}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-4 py-6 shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            <Plus size={20} className="mr-1.5" />
            <span className="font-semibold">New Task</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
