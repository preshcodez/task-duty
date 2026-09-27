import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import vector from "../assets/Vector (2).svg";
import { FaChevronDown } from "react-icons/fa";
import { toast } from "react-toastify";

const NewTask = () => {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [completed, setCompleted] = useState(false);
  const [completionSelected, setCompletionSelected] = useState(false);

  const [loading, setLoading] = useState(false);

  // Dropdown states
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [completionOpen, setCompletionOpen] = useState(false);

  const categoryOptions = ["Urgent", "Work", "Personal"];

  const completionOptions = [
    { label: "Not Completed", value: "false" },
    { label: "Completed", value: "true" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // All fields are required
    if (
      !title.trim() ||
      !description.trim() ||
      !dueDate ||
      !category ||
      !completionSelected
    ) {
      toast.error("All fields are required.");
      return;
    }

    // Due date cannot be in the past
    const today = new Date().toISOString().split("T")[0];

    if (dueDate < today) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    // Show Creating Task...
    setLoading(true);

    // Create task
    addTask({
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      dueDate,
      category: category as "Work" | "Personal" | "Urgent",
      completed,
    });

    // Wait 2 seconds
    setTimeout(() => {
      setLoading(false);

      // Show success after creating
      toast.success("Task created successfully!");

      // Clear form
      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("");
      setCompleted(false);
      setCompletionSelected(false);

      // Go back to My Tasks
      navigate("/my-tasks");
    }, 5000);
  };

  return (
    <div className="mx-42.5 pt-16.25 mb-12.5 max-md:mx-5 max-md:pt-10 max-md:mb-10">
      <div>
        {/* Page Heading */}
        <div className="mb-8.75 flex items-center gap-3.75 max-md:mb-7 max-md:gap-3">
          <Link to="/my-tasks">
            <img src={vector} alt="vector" className="max-md:w-5" />
          </Link>

          <h2 className="font-signika text-[50px] font-medium text-[#292929] max-md:text-[36px]">
            New Task
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-11.5 max-md:gap-7"
        >
          {/* Task Title */}
          <fieldset className="rounded-[5px] border border-[#B8B6B6] px-11.25 pb-3 pt-1.5 max-md:px-5 max-md:pb-2 max-md:pt-1">
            <legend className="px-1.5 font-signika text-[30px] font-medium text-[#B8B6B6] max-md:text-[22px]">
              Task Title
            </legend>

            <input
              type="text"
              placeholder="E.g Project Defense, Assignment ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-none bg-transparent px-0 py-2.5 font-signika text-[22px] font-normal text-[#292929] placeholder:text-[#CCCCCC] outline-none max-md:text-[18px] max-md:py-2"
            />
          </fieldset>

          {/* Description */}
          <fieldset className="rounded-[5px] border border-[#B8B6B6] px-11.25 pb-3 pt-1.5 max-md:px-5 max-md:pb-2 max-md:pt-1">
            <legend className="px-1.5 font-signika text-[30px] font-medium text-[#B8B6B6] max-md:text-[22px]">
              Description
            </legend>

            <textarea
              placeholder="Briefly describe your task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-none bg-transparent px-0 py-2.5 font-signika text-[22px] font-normal text-[#292929] placeholder:text-[#CCCCCC] outline-none max-md:text-[18px] max-md:py-2 max-md:min-h-25"
            />
          </fieldset>

          {/* Due Date */}
          <fieldset className="rounded-[5px] border border-[#B8B6B6] px-11.25 pb-3 pt-1.5 max-md:px-5 max-md:pb-2 max-md:pt-1">
            <legend className="px-1.5 font-signika text-[30px] font-medium text-[#B8B6B6] max-md:text-[22px]">
              Due Date
            </legend>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full border-none bg-transparent px-0 py-2.5 font-signika text-[22px] font-normal outline-none max-md:text-[18px] max-md:py-2 ${
                dueDate ? "text-[#292929]" : "text-[#CCCCCC]"
              }`}
            />
          </fieldset>

          {/* Category */}
          <fieldset className="rounded-[5px] border border-[#B8B6B6] px-11.25 pb-3 pt-1.5 max-md:px-5 max-md:pb-2 max-md:pt-1">
            <legend className="px-1.5 font-signika text-[30px] font-medium text-[#B8B6B6] max-md:text-[22px]">
              Category
            </legend>

            <div className="relative w-full box-border">
              <button
                type="button"
                onClick={() => {
                  setCategoryOpen(!categoryOpen);
                  setCompletionOpen(false);
                }}
                className={`flex w-full box-border items-center justify-between border-none bg-transparent px-0 py-2.5 font-signika text-[22px] font-normal outline-none cursor-pointer max-md:text-[18px] max-md:py-2 ${
                  category ? "text-[#292929]" : "text-[#CCCCCC]"
                }`}
              >
                <span>{category || "Select Category"}</span>

                <FaChevronDown
                  className={`text-[24px] text-[#CCCCCC] transition-transform max-md:text-[18px] ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {categoryOpen && (
                <div className="absolute left-0 top-full z-30 mt-1 w-full box-border overflow-hidden rounded-lg border border-[#974FD0] bg-white shadow-md">
                  {categoryOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        setCategory(option);
                        setCategoryOpen(false);
                      }}
                      className={`block w-full px-4 py-3 text-left font-signika text-[22px] cursor-pointer transition max-md:text-[18px] ${
                        category === option
                          ? "bg-[#974FD0] text-white"
                          : "text-[#292929] hover:bg-[#F3EAF9]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </fieldset>

          {/* Completion Status */}
          <fieldset className="rounded-[5px] border border-[#B8B6B6] px-11.25 pb-3 pt-1.5 max-md:px-5 max-md:pb-2 max-md:pt-1">
            <legend className="px-1.5 font-signika text-[30px] font-medium text-[#B8B6B6] max-md:text-[22px]">
              Completion Status
            </legend>

            <div className="relative w-full box-border">
              <button
                type="button"
                onClick={() => {
                  setCompletionOpen(!completionOpen);
                  setCategoryOpen(false);
                }}
                className={`flex w-full box-border items-center justify-between border-none bg-transparent px-0 py-2.5 font-signika text-[22px] font-normal outline-none cursor-pointer max-md:text-[18px] max-md:py-2 ${
                  completionSelected ? "text-[#292929]" : "text-[#CCCCCC]"
                }`}
              >
                <span>
                  {!completionSelected
                    ? "Select Completion Status"
                    : completed
                      ? "Completed"
                      : "Not Completed"}
                </span>

                <FaChevronDown
                  className={`text-[24px] text-[#CCCCCC] transition-transform max-md:text-[18px] ${
                    completionOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {completionOpen && (
                <div className="absolute left-0 top-full z-30 mt-1 w-full box-border overflow-hidden rounded-lg border border-[#974FD0] bg-white shadow-md">
                  {completionOptions.map((option) => {
                    const isSelected =
                      completionSelected &&
                      ((option.value === "true" && completed) ||
                        (option.value === "false" && !completed));

                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                          setCompleted(option.value === "true");
                          setCompletionSelected(true);
                          setCompletionOpen(false);
                        }}
                        className={`block w-full px-4 py-3 text-left font-signika text-[22px] cursor-pointer transition max-md:text-[18px] ${
                          isSelected
                            ? "bg-[#974FD0] text-white"
                            : "text-[#292929] hover:bg-[#F3EAF9]"
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </fieldset>

          {/* Done Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-md py-6.25 font-signika text-[35px] font-medium text-[#FAF9FB] transition cursor-pointer max-md:py-4 max-md:text-[24px] ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#974FD0] hover:bg-[#843dbd]"
            }`}
          >
            {loading ? "Creating Task..." : "Done"}
          </button>
        </form>

        {/* Back To Top */}
        <div className="mt-8.75 text-center max-md:mt-7">
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="text-[#974FD0] hover:underline text-[26px] font-normal font-signika cursor-pointer max-md:text-[20px]"
          >
            Back To Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
