import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../hooks/useCalendar';

export function CalendarHeader() {
    const { currentDate, nextMonth, prevMonth, goToToday } = useCalendar();

    return (
        <div className="flex items-center justify-between p-6 backdrop-blur-md bg-white/10 border-b border-white/20">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800 capitalize drop-shadow-sm">
                    {format(currentDate, 'MMMM yyyy', { locale: es })}
                </h2>
                <div className="flex gap-1">
                    <button
                        onClick={prevMonth}
                        className="p-2 hover:bg-white/50 rounded-full transition-all hover:scale-110 active:scale-95 text-gray-700"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextMonth}
                        className="p-2 hover:bg-white/50 rounded-full transition-all hover:scale-110 active:scale-95 text-gray-700"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={goToToday}
                    className="px-4 py-2 bg-white/80 hover:bg-white text-sm font-semibold text-gray-700 rounded-xl shadow-sm transition-all hover:scale-105 active:scale-95 border border-white/50"
                >
                    Hoy
                </button>
            </div>
        </div>
    );
}
