import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaChevronDown } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import can from "../assets/fluent_delete-24-regular.svg";
import { useTasks } from "../context/TaskContext";

const AllPage = () => {
  const { tasks, deleteTask } = useTasks();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Dropdown states
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const categoryOptions = ["All", "Work", "Personal", "Urgent"];
  const statusOptions = ["All", "Completed", "Not Completed"];

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      categoryFilter === "All" || task.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Not Completed" && !task.completed);

    return matchesCategory && matchesStatus;
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = () => {
    if (taskToDelete !== null) {
      deleteTask(taskToDelete);

      toast.success("Task deleted successfully!");
    }

    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  return (
    <div className="mx-42.5 pt-13.25 max-md:mx-5 max-md:pt-10">
      {/* Page Header */}
      <div className="flex justify-between items-center max-md:gap-5">
        <h2 className="font-signika font-medium text-[50px] text-[#292929] max-md:text-[36px]">
          My Tasks
        </h2>

        <Link
          to="/new-task"
          className="flex items-center gap-0.75 max-md:shrink-0"
        >
          <FaPlus className="w-4.5 text-[#974FD0] max-md:w-3.5" />

          <span className="font-signika font-medium text-[24px] text-[#974FD0] max-md:text-[18px]">
            Add New Task
          </span>
        </Link>
      </div>

      {/* Filters */}
      <div className="mt-8 max-md:mt-7">
        <p className="mb-3 font-signika text-[18px] font-medium text-[#292929]">
          Filter Tasks
        </p>

        <div className="flex gap-4 max-md:flex-col max-md:gap-3">
          {/* Category Dropdown */}
          <div className="relative w-52.5 max-md:w-full">
            <button
              type="button"
              onClick={() => {
                setCategoryOpen(!categoryOpen);
                setStatusOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-[#974FD0] bg-[#FAF9FB] px-4 py-3 font-signika text-[18px] text-[#292929] cursor-pointer transition hover:bg-[#F3EAF9] max-md:text-[17px]"
            >
              <span>
                {categoryFilter === "All" ? "All Categories" : categoryFilter}
              </span>

              <FaChevronDown
                className={`text-[13px] text-[#974FD0] transition-transform ${
                  categoryOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {categoryOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#974FD0] bg-white shadow-md">
                {categoryOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setCategoryFilter(option);
                      setCategoryOpen(false);
                    }}
                    className={`block w-full px-4 py-3 text-left font-signika text-[18px] cursor-pointer transition max-md:text-[17px] ${
                      categoryFilter === option
                        ? "bg-[#974FD0] text-white"
                        : "text-[#292929] hover:bg-[#F3EAF9]"
                    }`}
                  >
                    {option === "All" ? "All Categories" : option}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status Dropdown */}
          <div className="relative w-52.5 max-md:w-full">
            <button
              type="button"
              onClick={() => {
                setStatusOpen(!statusOpen);
                setCategoryOpen(false);
              }}
              className="flex w-full items-center justify-between rounded-lg border border-[#974FD0] bg-[#FAF9FB] px-4 py-3 font-signika text-[18px] text-[#292929] cursor-pointer transition hover:bg-[#F3EAF9] max-md:text-[17px]"
            >
              <span>
                {statusFilter === "All" ? "All Status" : statusFilter}
              </span>

              <FaChevronDown
                className={`text-[13px] text-[#974FD0] transition-transform ${
                  statusOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {statusOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-full overflow-hidden rounded-lg border border-[#974FD0] bg-white shadow-md">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setStatusFilter(option);
                      setStatusOpen(false);
                    }}
                    className={`block w-full px-4 py-3 text-left font-signika text-[18px] cursor-pointer transition max-md:text-[17px] ${
                      statusFilter === option
                        ? "bg-[#974FD0] text-white"
                        : "text-[#292929] hover:bg-[#F3EAF9]"
                    }`}
                  >
                    {option === "All" ? "All Status" : option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tasks */}
      <div className="flex flex-col gap-13 mt-13.25 max-md:gap-8 max-md:mt-10">
        {tasks.length === 0 ? (
          <p className="font-signika text-[20px] text-[#292929] max-md:text-[18px]">
            No tasks yet. Create your first task.
          </p>
        ) : filteredTasks.length === 0 ? (
          <p className="font-signika text-[20px] text-[#292929] max-md:text-[18px]">
            No tasks match the selected filters.
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg px-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg max-md:px-4"
            >
              {/* Category & Actions */}
              <div className="flex justify-between items-center py-5 border-b border-[#B8B6B6] max-md:flex-col max-md:items-start max-md:gap-5">
                <span
                  className={`text-[24px] font-normal font-signika pt-11 max-md:pt-0 max-md:text-[20px] ${
                    task.category === "Urgent"
                      ? "text-red-500"
                      : task.category === "Work"
                        ? "text-purple-500"
                        : "text-emerald-500"
                  }`}
                >
                  {task.category}
                </span>

                <div className="flex gap-6 max-md:w-full">
                  {/* Edit */}
                  <Link
                    to={`/task/${task.id}`}
                    className="no-underline flex items-center gap-1 bg-[#974FD0] hover:bg-purple-700 text-white text-[24px] py-1.5 rounded transition w-31.5 justify-center max-md:flex-1 max-md:text-[18px] max-md:py-2"
                  >
                    <FiEdit />
                    <span>Edit</span>
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      setTaskToDelete(task.id);
                      setShowDeleteModal(true);
                    }}
                    className="flex items-center gap-1 border border-purple-600 text-purple-600 hover:bg-purple-50 text-[24px] py-1.5 rounded transition w-37.75 justify-center cursor-pointer max-md:flex-1 max-md:text-[18px] max-md:py-2"
                  >
                    <img src={can} alt="Delete" className="w-6 max-md:w-5" />
                    Delete
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-3.25 max-md:pt-4">
                {/* Task Title */}
                <h2 className="text-[35px] font-normal font-signika text-[#292929] max-md:text-[28px]">
                  {task.title}
                </h2>

                {/* Task Description */}
                <p className="text-[24px] font-normal text-[#737171] leading-relaxed max-md:text-[18px]">
                  {task.description}
                </p>

                {/* Due Date & Status */}
                <div className="flex items-center gap-13.25 mt-4 mb-5 max-md:flex-col max-md:items-start max-md:gap-3 max-md:mt-4">
                  <div className="flex items-center gap-3.25 max-md:gap-2">
                    <span className="font-signika text-[20px] font-normal text-[#737171] max-md:text-[17px]">
                      Due Date:
                    </span>

                    <span className="font-signika text-[20px] font-medium text-[#292929] max-md:text-[17px]">
                      {task.dueDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-3.25 max-md:gap-2">
                    <span className="font-signika text-[20px] font-normal text-[#737171] max-md:text-[17px]">
                      Status:
                    </span>

                    <span
                      className={`font-signika text-[20px] font-medium max-md:text-[17px] ${
                        task.completed ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {task.completed ? "Completed" : "Not Completed"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Back To Top */}
      <div className="text-center mt-12 mb-6 max-md:mt-10">
        <button
          onClick={scrollToTop}
          className="text-[#974FD0] hover:underline text-[26px] font-normal font-signika cursor-pointer max-md:text-[20px]"
        >
          Back To Top
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 max-md:px-5">
          <div className="w-125 rounded-lg bg-white px-10 py-8 text-center shadow-lg max-md:w-full max-md:px-5 max-md:py-7">
            <h3 className="font-signika text-[30px] font-medium text-[#292929] max-md:text-[25px]">
              Delete Task?
            </h3>

            <p className="mt-3 font-signika text-[20px] text-[#737171] max-md:text-[17px]">
              Are you sure you want to delete this task?
            </p>

            <div className="mt-8 flex justify-center gap-4 max-md:gap-3">
              {/* Cancel */}
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setTaskToDelete(null);
                }}
                className="rounded-lg border border-[#974FD0] px-8 py-3 font-signika text-[20px] text-[#974FD0] cursor-pointer max-md:px-6 max-md:py-2.5 max-md:text-[17px]"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                onClick={handleDelete}
                className="rounded-lg bg-[#974FD0] px-8 py-3 font-signika text-[20px] text-white cursor-pointer max-md:px-6 max-md:py-2.5 max-md:text-[17px]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPage;
