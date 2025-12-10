import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../lib/utils';

export function EventModal({ isOpen, onClose, date, events }) {
    if (!isOpen || !date) return null;

    const dayEvents = events.filter(e =>
        format(e.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto z-50 w-full max-w-md h-fit glass rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 capitalize">
                                        {format(date, 'EEEE d', { locale: es })}
                                    </h3>
                                    <p className="text-gray-500 capitalize">
                                        {format(date, 'MMMM yyyy', { locale: es })}
                                    </p>
                                </div>
                                <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            <div className="space-y-4 mb-2 max-h-80 overflow-y-auto">
                                {dayEvents.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400">
                                        <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-20" />
                                        <p>No hay eventos</p>
                                    </div>
                                ) : (
                                    dayEvents.map((event, idx) => (
                                        <div key={idx} className={cn(
                                            "p-3 rounded-xl border flex items-center gap-3",
                                            event.type === 'exam' ? "bg-red-50 border-red-100" :
                                                event.type === 'holiday' ? "bg-green-50 border-green-100" :
                                                    "bg-blue-50 border-blue-100"
                                        )}>
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                event.type === 'exam' ? "bg-red-500" :
                                                    event.type === 'holiday' ? "bg-green-500" :
                                                        "bg-blue-500"
                                            )} />
                                            <span className="font-medium text-gray-900">{event.title}</span>
                                            <span className="ml-auto text-xs uppercase font-bold tracking-wider opacity-50">
                                                {event.type === 'exam' ? 'Examen' : event.type === 'holiday' ? 'Festivo' : 'Evento'}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
                                Los eventos se actualizan automáticamente desde el servidor.
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
