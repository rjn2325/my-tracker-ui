"use client";

import { useState } from "react";
import type { Habit } from "../page";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function HabitTable({ habits }: { habits: Habit[] }) {
  const today = new Date().getDay();

  // Each ticked cell is stored as "habitId-dayIndex", e.g. "3-4"
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(habitId: number, dayIndex: number) {
    const key = `${habitId}-${dayIndex}`;
    setChecked((prev) => {
      const next = new Set(prev); // copy, never mutate state directly
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleSubmit() {
    const payload = [...checked].map((key) => {
      const [habitId, dayIndex] = key.split("-").map(Number);
      return { habitId, dayIndex, done: true };
    });
    console.log(payload);
    // TODO: your save call goes here, e.g. fetch(".../habit-logs", { method: "POST", ... })
  }

  function cellClass(done: boolean, dayIndex: number) {
    if (done) return "bg-primary text-white";
    if (dayIndex === today) return "border-2 border-primary bg-card";
    if (dayIndex > today) return "border border-dashed border-line";
    return "bg-missed";
  }

  return (
    <>
      <div className="overflow-x-auto rounded-card border border-line bg-card">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-7 py-4 text-left text-sm font-medium text-muted">Habit</th>
              {DAYS.map((day, dayIndex) => (
                <th
                  key={day}
                  className={`px-2 py-4 text-sm font-medium ${
                    dayIndex === today ? "bg-tint text-primary" : "text-muted"
                  }`}
                >
                  {day}
                </th>
              ))}
              <th className="px-7 py-4 text-left text-sm font-medium text-muted">This week</th>
            </tr>
          </thead>

          <tbody>
            {habits.map((habit) => {
              const count = DAYS.filter((_, i) => checked.has(`${habit.id}-${i}`)).length;

              return (
                <tr key={habit.id} className="border-t border-line">
                  <td className="px-7 py-4 font-medium">{habit.name}</td>

                  {DAYS.map((day, dayIndex) => {
                    const done = checked.has(`${habit.id}-${dayIndex}`);
                    return (
                      <td
                        key={day}
                        className={`text-center ${dayIndex === today ? "bg-tint" : ""}`}
                      >
                        <button
                          type="button"
                          aria-pressed={done}
                          aria-label={`${habit.name}, ${day}`}
                          disabled={dayIndex > today}
                          onClick={() => toggle(habit.id, dayIndex)}
                          className={`inline-flex h-[30px] w-[30px] items-center justify-center rounded-cell text-sm disabled:cursor-not-allowed ${cellClass(done, dayIndex)}`}
                        >
                          {done && "✓"}
                        </button>
                      </td>
                    );
                  })}

                  <td className="px-7 py-4 text-sm font-medium">{count} of 7</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">{checked.size} selected</p>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={checked.size === 0}
          className="h-11 rounded-xl bg-primary px-6 font-medium text-white disabled:opacity-40"
        >
          Save
        </button>
      </div>
    </>
  );
}