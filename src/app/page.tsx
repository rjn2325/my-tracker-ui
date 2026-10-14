import HabitTable from "./component/HabitTable";

export type Habit = { id: number; name: string };

export default async function HomePage() {
  const res = await fetch("http://localhost:4000/habits-master");
  const habits: Habit[] = await res.json();

  return (
    <main className="min-h-screen bg-page text-ink font-sans px-4 py-14">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">My Tracker</h1>
        <p className="mt-1 mb-7 text-muted">Tick what you finished, then save.</p>
        <HabitTable habits={habits} />
      </div>
    </main>
  );
}