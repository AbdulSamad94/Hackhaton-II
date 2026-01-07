import { Task } from "../lib/api";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: number, completed: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const isCompleted = task.completed;

  return (
    <div
      className={`
        group relative bg-white p-4 rounded-lg border transition-all duration-200
        ${
          isCompleted
            ? "bg-gray-50 border-gray-100"
            : "border-gray-200 hover:border-indigo-300 hover:shadow-md"
        }
      `}
    >
      <div className="flex items-start gap-4">
        {/* Custom Checkbox */}
        <div className="shrink-0 mt-1">
          <button
            onClick={() => onToggleComplete(task.id, !isCompleted)}
            className={`
              w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              ${
                isCompleted
                  ? "bg-green-500 border-green-500 text-white"
                  : "border-gray-300 text-transparent hover:border-indigo-400"
              }
            `}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4
            className={`
              text-base font-medium truncate transition-colors
              ${isCompleted ? "text-gray-400 line-through" : "text-gray-900"}
            `}
          >
            {task.title}
          </h4>
          {task.description && (
            <p
              className={`mt-1 text-sm ${
                isCompleted ? "text-gray-400" : "text-gray-500"
              } line-clamp-2`}
            >
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2 mt-3">
            {/* Priority Badge - Placeholder/Random for demo as it's not in schema yet */}
            <span
              className={`
                inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                ${
                  isCompleted
                    ? "bg-gray-100 text-gray-500"
                    : "bg-indigo-50 text-indigo-700"
                }
             `}
            >
              {isCompleted ? "Done" : "In Progress"}
            </span>

            {task.created_at && (
              <span className="text-xs text-gray-400 flex items-center">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {new Date(task.created_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        {/* Actions - Visible on Hover/Focus */}
        <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
            title="Edit task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete task"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
