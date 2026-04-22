"use client";

import { useState, useEffect } from "react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error("Failed to parse todos", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-zinc-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 px-4 py-12 font-sans dark:bg-zinc-950 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Tasks
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Keep track of your daily goals.
          </p>
        </div>

        <form onSubmit={addTodo} className="mt-8 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="block w-full rounded-xl border-0 bg-white px-4 py-3 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:ring-zinc-700 dark:focus:ring-zinc-500 sm:text-sm sm:leading-6"
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-600 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            Add
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {todos.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-zinc-200 py-12 text-center dark:border-zinc-800">
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No tasks yet. Start by adding one above!
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="group flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 transition-all hover:shadow-md dark:bg-zinc-900 dark:ring-zinc-800"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                      todo.completed
                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-50 dark:bg-zinc-50 dark:text-zinc-950"
                        : "border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
                    }`}
                  >
                    {todo.completed && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span
                    className={`text-sm transition-all ${
                      todo.completed
                        ? "text-zinc-400 line-through dark:text-zinc-500"
                        : "text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="rounded-lg p-2 text-zinc-400 opacity-0 transition-all hover:bg-zinc-50 hover:text-red-600 group-hover:opacity-100 dark:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-red-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
