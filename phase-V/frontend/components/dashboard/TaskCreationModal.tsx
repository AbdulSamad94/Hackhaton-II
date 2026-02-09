"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Flag, Tag, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task } from "@/lib/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface TaskCreationModalProps {
  onClose: () => void;
  onCreate?: (task: {
    title: string;
    description?: string;
    due_date?: string;
    priority?: "low" | "medium" | "high";
    tags?: string;
    recurring?: "daily" | "weekly" | "monthly";
  }) => Promise<unknown>;
  onUpdate?: (
    id: number,
    task: {
      title: string;
      description?: string;
      due_date?: string;
      priority?: "low" | "medium" | "high";
      tags?: string;
      recurring?: "daily" | "weekly" | "monthly";
    },
  ) => Promise<unknown>;
  task?: Task | null;
}

export default function TaskCreationModal({
  onClose,
  onCreate,
  onUpdate,
  task,
}: TaskCreationModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [tags, setTags] = useState("");
  const [recurring, setRecurring] = useState<
    "daily" | "weekly" | "monthly" | ""
  >("");
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setDueDate(task.due_date ? new Date(task.due_date) : null);
      setPriority(task.priority || "medium");
      setTags(task.tags || "");
      setRecurring(task.recurring || "");
      setShowOptions(true);
    } else {
      setTitle("");
      setDescription("");
      setDueDate(null);
      setPriority("medium");
      setTags("");
      setRecurring("");
      setShowOptions(false);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    try {
      const taskData = {
        title,
        description,
        due_date: dueDate ? dueDate.toISOString() : undefined,
        priority,
        tags,
        recurring: recurring === "" ? undefined : recurring,
      };

      if (task && onUpdate) {
        await onUpdate(task.id, taskData);
      } else if (onCreate) {
        await onCreate(taskData);
      }
      onClose();
    } catch (error) {
      console.error("Failed to save task", error);
    } finally {
      setLoading(false);
    }
  };

  const isEditing = !!task;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-end sm:justify-center sm:p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
      />

      {/* Modal */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.5 }}
        onDragEnd={(e, { offset, velocity }) => {
          if (offset.y > 100 || velocity.y > 100) onClose();
        }}
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {isEditing ? "Edit Task" : "New Task"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Title */}
          <input
            autoFocus
            type="text"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold placeholder:text-slate-300 border-none focus:ring-0 p-0 text-slate-900"
          />

          {/* Description */}
          <textarea
            placeholder="Add a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full min-h-[100px] resize-none text-slate-600 placeholder:text-slate-400 border-none focus:ring-0 p-0 text-base"
          />

          {/* Advanced Options Toggle */}
          <div className="border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              className="text-sm text-blue-600 font-medium hover:underline mb-4"
            >
              {showOptions
                ? "Hide Options"
                : "Show Options (Due Date, Priority, Tags)"}
            </button>

            {showOptions && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in slide-in-from-top-2 fade-in duration-200">
                {/* Due Date */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                    <Calendar size={14} /> Due Date
                  </label>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date: Date | null) => setDueDate(date)}
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Set due date"
                    className="w-full rounded-xl border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                    wrapperClassName="w-full"
                  />
                </div>

                {/* Priority */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                    <Flag size={14} /> Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value as "low" | "medium" | "high")
                    }
                    className="w-full rounded-xl border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                    <Tag size={14} /> Tags
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="work, personal, urgent"
                    className="w-full rounded-xl border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Recurring */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-1">
                    <Repeat size={14} /> Recurring
                  </label>
                  <select
                    value={recurring}
                    onChange={(e) =>
                      setRecurring(
                        e.target.value as "daily" | "weekly" | "monthly" | "",
                      )
                    }
                    className="w-full rounded-xl border-slate-200 text-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    <option value="">None</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end items-center">
            <div className="flex gap-3">
              <Button type="button" variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6"
                disabled={!title.trim() || loading}
              >
                {loading
                  ? isEditing
                    ? "Saving..."
                    : "Creating..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Task"}
              </Button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
