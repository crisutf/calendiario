import React from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarHeader } from './CalendarHeader';
import { DayCell } from './DayCell';
import { EventModal } from './EventModal';
import { useThemeMode } from '../hooks/useThemeMode';
import { NotificationManager } from './NotificationManager';

import { groupEventsByDate } from '../utils/eventUtils';

export function Calendar() {
    const { currentDate, events } = useCalendar();
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const theme = useThemeMode(currentDate, events);

    // Optimize: Group events by date once when events change
    const eventsByDate = React.useMemo(() => groupEventsByDate(events), [events]);

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    const weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    // Dynamic Theme Classes
    const themeClasses = {
        calm: 'bg-theme-calm-bg/80 border-theme-calm-accent/30',
        stress: 'bg-theme-stress-bg/90 border-theme-stress-accent/50 shadow-red-500/20',
        aggressive: 'bg-theme-aggressive-bg/90 border-theme-aggressive-accent/50',
        holiday: 'bg-theme-holiday-bg/90 border-theme-holiday-accent/50',
    };

    const headerClasses = {
        calm: 'bg-white/30 text-gray-500',
        stress: 'bg-red-500/10 text-red-700 font-bold',
        aggressive: 'bg-orange-500/10 text-orange-700',
        holiday: 'bg-emerald-500/10 text-emerald-700',
    };

    return (
        <div className={`w-full max-w-5xl mx-auto p-4 transition-colors duration-500`}>
            <NotificationManager events={events} />

            <div className={`glass rounded-3xl shadow-xl overflow-hidden border transition-all duration-500 ${themeClasses[theme] || themeClasses.calm}`}>
                <CalendarHeader />

                {/* Weekday headers */}
                <div className={`grid grid-cols-7 border-b border-gray-100 transition-colors duration-300 ${headerClasses[theme] || headerClasses.calm}`}>
                    {weekDays.map(day => (
                        <div key={day} className="py-2 text-center text-xs font-semibold uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 bg-white/40 backdrop-blur-sm">
                    {days.map((day, idx) => {
                        const dateKey = format(day, 'yyyy-MM-dd');
                        return (
                            <DayCell
                                key={idx}
                                date={day}
                                currentMonth={currentDate}
                                dayEvents={eventsByDate[dateKey] || []}
                                onClick={handleDayClick}
                            />
                        );
                    })}
                </div>
            </div>

            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                date={selectedDate}
                events={events}
            />
        </div>
    );
}
