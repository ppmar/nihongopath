"use client";

import { cn } from "@/lib/utils";

type StreakCalendarProps = {
  activeDays: Set<string>;
  months?: number;
};

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

export function StreakCalendar({ activeDays, months = 3 }: StreakCalendarProps) {
  const today = new Date();
  const days: { date: Date; key: string }[] = [];

  for (let m = months - 1; m >= 0; m--) {
    const year = today.getFullYear();
    const month = today.getMonth() - m;
    const d = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(d.getFullYear(), d.getMonth());
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(d.getFullYear(), d.getMonth(), day);
      if (date <= today) {
        days.push({ date, key: formatDateKey(date) });
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1">
        {days.map(({ key }) => {
          const active = activeDays.has(key);
          return (
            <div
              key={key}
              className={cn(
                "h-3 w-3 rounded-sm transition-colors",
                active
                  ? "bg-violet-500"
                  : "bg-muted"
              )}
              title={key}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <span>Inactif</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-3 rounded-sm bg-violet-500" />
          <span>Actif</span>
        </div>
      </div>
    </div>
  );
}
