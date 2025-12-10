import React from 'react';
import { CalendarProvider } from './context/CalendarProvider';
import { Calendar } from './components/Calendar';
import { useCalendar } from './hooks/useCalendar';
import { useThemeMode } from './hooks/useThemeMode';

function Layout() {
  const { currentDate, events } = useCalendar();
  const theme = useThemeMode(currentDate, events);

  const bgClasses = {
    calm: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    stress: 'bg-gradient-to-br from-red-50 to-orange-50',
    aggressive: 'bg-gradient-to-br from-orange-50 to-amber-50',
    holiday: 'bg-gradient-to-br from-emerald-50 to-teal-50',
  };

  return (
    <div className={`min-h-screen py-10 px-4 font-sans selection:bg-apple-blue selection:text-white transition-colors duration-700 ${bgClasses[theme] || bgClasses.calm}`}>
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2 animate-float">
          Curso 2025/26
        </h1>
        <p className="text-gray-500">Calendario Escolar</p>
      </div>
      <Calendar />
    </div>
  );
}

function App() {
  return (
    <CalendarProvider>
      <Layout />
    </CalendarProvider>
  );
}

export default App;
