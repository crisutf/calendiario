import React, { memo } from 'react';
import { format, isSameMonth, isToday } from 'date-fns';
import { cn } from '../lib/utils';

export const DayCell = memo(function DayCell({ date, currentMonth, dayEvents = [], onClick }) {
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const isDayToday = isToday(date);

    // Limit visible events for performance and aesthetics
    const MAX_VISIBLE_EVENTS = 3;
    const visibleEvents = dayEvents.slice(0, MAX_VISIBLE_EVENTS);
    const hiddenCount = dayEvents.length - MAX_VISIBLE_EVENTS;

    return (
        <div
            onClick={() => onClick(date)}
            className={cn(
                "min-h-[8rem] sm:min-h-[9rem] border-b border-r border-white/20 p-2 transition-all duration-300 cursor-pointer relative group backdrop-blur-sm transform-gpu",
                !isCurrentMonth && "bg-gray-50/30 text-gray-400 saturate-0",
                isCurrentMonth && "bg-white/40 hover:bg-white/70 hover:scale-[1.02] hover:shadow-xl hover:z-20 active:scale-95",
                isDayToday && "bg-blue-50/60 ring-1 ring-blue-400/50 shadow-inner"
            )}
        >
            <div className="flex justify-between items-start mb-1">
                <span className={cn(
                    "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full transition-all",
                    isDayToday ? "bg-apple-blue text-white shadow-md shadow-blue-500/30" : "text-gray-700 group-hover:bg-white/50",
                    !isCurrentMonth && "text-gray-400"
                )}>
                    {format(date, 'd')}
                </span>
            </div>

            <div className="space-y-1 overflow-hidden">
                {visibleEvents.map((event, idx) => (
                    <div key={idx} className={cn(
                        "text-[10px] sm:text-xs px-2 py-1 rounded-md truncate transition-all border shadow-sm",
                        event.type === 'exam' ? "bg-red-100/90 text-red-800 border-red-200 hover:bg-red-200" :
                            event.type === 'holiday' ? "bg-emerald-100/90 text-emerald-800 border-emerald-200 hover:bg-emerald-200" :
                                "bg-blue-100/90 text-blue-800 border-blue-200 hover:bg-blue-200"
                    )}>
                        {event.title}
                    </div>
                ))}
                {hiddenCount > 0 && (
                    <div className="text-[10px] text-gray-500 font-medium pl-1">
                        +{hiddenCount} más
                    </div>
                )}
            </div>
        </div>
    );
});
