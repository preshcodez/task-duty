import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaChevronDown, FaSearch } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import can from "../assets/fluent_delete-24-regular.svg";
import { useTasks } from "../context/TaskContext";
import { searchTasks } from "../services/taskSearch";

const AllPage = () => {
  const { tasks, deleteTask } = useTasks();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<
    Awaited<ReturnType<typeof searchTasks>>
  >([]);
  const [isSearching, setIsSearching] = useState(false);

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

  // Search tasks
  const handleSearch = async () => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);

      const results = await searchTasks(search.trim());

      setSearchResults(results);

      if (results.length === 0) {
        toast("No tasks found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to search tasks");
    } finally {
      setIsSearching(false);
    }
  };

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
      <div className="flex items-center justify-between max-md:gap-5">
        <h2 className="font-signika text-[50px] font-medium text-[#292929] max-md:text-[36px]">
          My Tasks
        </h2>

        <Link
          to="/new-task"
          className="flex items-center gap-0.75 max-md:shrink-0"
        >
          <FaPlus className="w-4.5 text-[#974FD0] max-md:w-3.5" />

          <span className="font-signika text-[24px] font-medium text-[#974FD0] max-md:text-[18px]">
            Add New Task
          </span>
        </Link>
      </div>

      {/* Search */}
      <div className="mt-8 max-md:mt-7">
        <p className="mb-3 font-signika text-[18px] font-medium text-[#292929]">
          Search Tasks
        </p>

        {/* Search button inside the input */}
        <div className="flex w-full max-w-125 items-center gap-2 rounded-xl border border-[#974FD0] bg-[#FAF9FB] p-1.5 transition focus-within:bg-white focus-within:ring-2 focus-within:ring-[#974FD0]/20">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);

              if (!value.trim()) {
                setSearchResults([]);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search by title or description..."
            className="min-w-0 flex-1 bg-transparent px-3 py-3 font-signika text-[18px] text-[#292929] outline-none placeholder:text-[#737171] max-md:text-[16px]"
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching || !search.trim()}
            aria-label="Search tasks"
            className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#974FD0] px-5 py-3 font-signika text-[17px] font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60 max-md:px-4 max-md:text-[15px]"
          >
            {isSearching ? (
              "Searching..."
            ) : (
              <>
                <FaSearch className="text-sm" />
                <span>Search</span>
              </>
            )}
          </button>
        </div>
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
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#974FD0] bg-[#FAF9FB] px-4 py-3 font-signika text-[18px] text-[#292929] transition hover:bg-[#F3EAF9] max-md:text-[17px]"
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
                    className={`block w-full cursor-pointer px-4 py-3 text-left font-signika text-[18px] transition max-md:text-[17px] ${
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
              className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#974FD0] bg-[#FAF9FB] px-4 py-3 font-signika text-[18px] text-[#292929] transition hover:bg-[#F3EAF9] max-md:text-[17px]"
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
                    className={`block w-full cursor-pointer px-4 py-3 text-left font-signika text-[18px] transition max-md:text-[17px] ${
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
      <div className="mt-13.25 flex flex-col gap-13 max-md:mt-10 max-md:gap-8">
        {search.trim() ? (
          searchResults.length === 0 ? (
            <p className="font-signika text-[20px] text-[#292929] max-md:text-[18px]">
              {isSearching ? "Searching for tasks..." : "No tasks found."}
            </p>
          ) : (
            searchResults.map((task) => (
              <div
                key={"_id" in task ? task._id : task.id}
                className="rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg max-md:px-4"
              >
                {/* Category & Actions */}
                <div className="flex items-center justify-between border-b border-[#B8B6B6] py-5 max-md:flex-col max-md:items-start max-md:gap-5">
                  <span
                    className={`pt-11 font-signika text-[24px] font-normal max-md:pt-0 max-md:text-[20px] ${
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
                      to={`/task/${"id" in task ? task.id : task._id}`}
                      className="flex w-31.5 items-center justify-center gap-1 rounded bg-[#974FD0] py-1.5 text-[24px] text-white no-underline transition hover:bg-purple-700 max-md:flex-1 max-md:py-2 max-md:text-[18px]"
                    >
                      <FiEdit />
                      <span>Edit</span>
                    </Link>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => {
                        setTaskToDelete("id" in task ? task.id : null);
                        setShowDeleteModal(true);
                      }}
                      className="flex w-37.75 cursor-pointer items-center justify-center gap-1 rounded border border-purple-600 py-1.5 text-[24px] text-purple-600 transition hover:bg-purple-50 max-md:flex-1 max-md:py-2 max-md:text-[18px]"
                    >
                      <img src={can} alt="Delete" className="w-6 max-md:w-5" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Task Details */}
                <div className="flex flex-col gap-2 pt-3.25 max-md:pt-4">
                  <h2 className="font-signika text-[35px] font-normal text-[#292929] max-md:text-[28px]">
                    {task.title}
                  </h2>

                  <p className="text-[24px] font-normal leading-relaxed text-[#737171] max-md:text-[18px]">
                    {task.description}
                  </p>

                  {/* Due Date & Status */}
                  <div className="mb-5 mt-4 flex items-center gap-13.25 max-md:mt-4 max-md:flex-col max-md:items-start max-md:gap-3">
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
          )
        ) : tasks.length === 0 ? (
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
              className="rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg max-md:px-4"
            >
              {/* Category & Actions */}
              <div className="flex items-center justify-between border-b border-[#B8B6B6] py-5 max-md:flex-col max-md:items-start max-md:gap-5">
                <span
                  className={`pt-11 font-signika text-[24px] font-normal max-md:pt-0 max-md:text-[20px] ${
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
                    className="flex w-31.5 items-center justify-center gap-1 rounded bg-[#974FD0] py-1.5 text-[24px] text-white no-underline transition hover:bg-purple-700 max-md:flex-1 max-md:py-2 max-md:text-[18px]"
                  >
                    <FiEdit />
                    <span>Edit</span>
                  </Link>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() => {
                      setTaskToDelete(task.id);
                      setShowDeleteModal(true);
                    }}
                    className="flex w-37.75 cursor-pointer items-center justify-center gap-1 rounded border border-purple-600 py-1.5 text-[24px] text-purple-600 transition hover:bg-purple-50 max-md:flex-1 max-md:py-2 max-md:text-[18px]"
                  >
                    <img src={can} alt="Delete" className="w-6 max-md:w-5" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Task Details */}
              <div className="flex flex-col gap-2 pt-3.25 max-md:pt-4">
                <h2 className="font-signika text-[35px] font-normal text-[#292929] max-md:text-[28px]">
                  {task.title}
                </h2>

                <p className="text-[24px] font-normal leading-relaxed text-[#737171] max-md:text-[18px]">
                  {task.description}
                </p>

                {/* Due Date & Status */}
                <div className="mb-5 mt-4 flex items-center gap-13.25 max-md:mt-4 max-md:flex-col max-md:items-start max-md:gap-3">
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
      <div className="mb-6 mt-12 text-center max-md:mt-10">
        <button
          type="button"
          onClick={scrollToTop}
          className="cursor-pointer font-signika text-[26px] font-normal text-[#974FD0] hover:underline max-md:text-[20px]"
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
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setTaskToDelete(null);
                }}
                className="cursor-pointer rounded-lg border border-[#974FD0] px-8 py-3 font-signika text-[20px] text-[#974FD0] max-md:px-6 max-md:py-2.5 max-md:text-[17px]"
              >
                Cancel
              </button>

              {/* Confirm Delete */}
              <button
                type="button"
                onClick={handleDelete}
                className="cursor-pointer rounded-lg bg-[#974FD0] px-8 py-3 font-signika text-[20px] text-white max-md:px-6 max-md:py-2.5 max-md:text-[17px]"
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
