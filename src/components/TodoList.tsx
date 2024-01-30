import { Trash } from "lucide-react";
import { useEffect, useState } from "react";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList = () => {
  const [tasks, setTasks] = useState<Task[]>(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks")!)
      : []
  );
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const toggleTask = (taskId: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="flex flex-col items-center h-full w-full bg-neutral-50">
      <div className="my-4" />
      <h1 className="text-4xl font-bold">todoless</h1>
      <p>{new Date().toLocaleDateString()}</p>
      <div className="my-4" />
      <div>
        <div className="flex items-center w-[400px] shadow-md">
          <input
            className="px-4 border-none outline-none rounded-none py-2 flex-1"
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
            }}
            autoFocus={true}
          />
          <button
            className="px-2 bg-black hover:bg-black/80 transition text-white py-2"
            onClick={addTask}
          >
            +
          </button>
        </div>

        <div className="my-4" />

        <ul className="flex flex-col w-full space-y-2 overflow-y-auto h-[300px]">
          {tasks.map((task) => (
            <li
              className="flex justify-between py-2 shadow-md px-4 bg-white"
              key={task.id}
            >
              <div className="space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </span>
              </div>

              <button
                className="hover:opacity-50 transition"
                onClick={() => removeTask(task.id)}
              >
                <Trash className="text-red-600" size={16} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
