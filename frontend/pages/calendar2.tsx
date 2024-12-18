import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/card";
import '../app/globals.css';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  repeating?: boolean;
}

type ViewType = 'year' | 'week' | 'day' | 'schedule';

const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<ViewType>('week');
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'All Day Event',
      start: new Date(2023, 2, 1),
      end: new Date(2023, 2, 1),
      allDay: true,
      color: 'bg-blue-200'
    },
    {
      id: '2',
      title: 'Long Event',
      start: new Date(2023, 2, 6),
      end: new Date(2023, 2, 8),
      color: 'bg-blue-200'
    },
    {
      id: '3',
      title: 'Conference',
      start: new Date(2023, 2, 12),
      end: new Date(2023, 2, 13),
      color: 'bg-blue-200'
    },
    {
      id: '4',
      title: 'Repeating Event',
      start: new Date(2023, 2, 9),
      end: new Date(2023, 2, 9),
      repeating: true,
      color: 'bg-blue-200'
    }
  ]);

  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);

  // Sidebar events that can be dragged
  const [availableEvents] = useState<CalendarEvent[]>([
    {
      id: 'template1',
      title: 'New Meeting',
      start: new Date(),
      end: new Date(),
      color: 'bg-blue-200'
    },
    {
      id: 'template2',
      title: 'All Day Event',
      start: new Date(),
      end: new Date(),
      allDay: true,
      color: 'bg-green-200'
    },
    {
      id: 'template3',
      title: 'Repeating Event',
      start: new Date(),
      end: new Date(),
      repeating: true,
      color: 'bg-purple-200'
    }
  ]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add days from previous month
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push(date);
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const getWeekDays = () => {
    const days = [];
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const handleDragStart = (event: CalendarEvent, isTemplate: boolean = false) => {
    if (isTemplate) {
      // Clone the template event and set current date
      const newEvent = {
        ...event,
        id: Math.random().toString(),
        start: new Date(),
        end: new Date()
      };
      setDraggedEvent(newEvent);
    } else {
      setDraggedEvent(event);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (date: Date) => {
    if (!draggedEvent) return;

    // Se l'evento viene dalla sidebar (è un template)
    if (draggedEvent.id.startsWith('template')) {
      const newEvent = {
        ...draggedEvent,
        id: Math.random().toString(),
        start: date,
        end: date
      };
      setEvents(prev => [...prev, newEvent]);
    } else {
      // Se è un evento esistente, lo aggiorniamo invece di crearne uno nuovo
      setEvents(prev => prev.map(event => 
        event.id === draggedEvent.id 
          ? { ...event, start: date, end: date }
          : event
      ));
    }
    setDraggedEvent(null);
  };

  const renderMonthView = () => {
    const days = getMonthDays();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 text-center font-medium">
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const dayEvents = events.filter(event => 
            date.toDateString() === event.start.toDateString()
          );

          return (
            <div
              key={index}
              className={`min-h-24 p-1 border ${
                date.getMonth() !== currentDate.getMonth() ? 'bg-gray-50' : 'bg-white'
              }`}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(date)}
            >
              <div className="font-medium text-sm">
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`${event.color} p-1 text-xs rounded cursor-move`}
                    draggable
                    onDragStart={() => handleDragStart(event)}
                  >
                    {event.title}
                    {event.repeating && ' 🔄'}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderWeekView = () => {
    const days = getWeekDays();
    
    return (
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map(day => (
          <div key={day} className="p-2 text-center font-medium">
            {day}
          </div>
        ))}
        {days.map((date, index) => {
          const dayEvents = events.filter(event => 
            date.toDateString() === event.start.toDateString()
          );

          return (
            <div
              key={index}
              className="min-h-32 p-1 border bg-white"
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(date)}
            >
              <div className="font-medium text-sm">
                {date.getDate()}
              </div>
              <div className="space-y-1">
                {dayEvents.map(event => (
                  <div
                    key={event.id}
                    className={`${event.color} p-1 text-xs rounded cursor-move`}
                    draggable
                    onDragStart={() => handleDragStart(event)}
                  >
                    {event.title}
                    {event.repeating && ' 🔄'}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderScheduleView = () => {
    const timeSlots = [
      '07.30-11.30',
      '11.30-15.30',
      '15.30-19.30',
      '19.30-23.30',
      '23.30-03.30',
      '03.30-7.30'
    ];

    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="py-2 px-4 text-left">
                {currentDate.toLocaleDateString('default', { month: 'short' })}
              </th>
              <th className="py-2 px-4 text-center border-l border-blue-500 w-16">
                dev
              </th>
              {timeSlots.map((slot, index) => (
                <th key={index} className="py-2 px-4 text-center border-l border-blue-500">
                  {slot}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: daysInMonth }, (_, i) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1);
              const dayEvents = events.filter(event => 
                date.toDateString() === event.start.toDateString()
              );
              
              return (
                <tr key={i} className={`border-t ${
                  date.getDay() === 0 || date.getDay() === 6 ? 'bg-yellow-50' : 'bg-blue-50'
                }`}>
                  <td className="py-2 px-4 border-r font-bold">
                    <div className="text-2xl">{date.getDate()}</div>
                    <div className="text-sm">
                      {date.toLocaleDateString('default', { weekday: 'short' })}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-l text-center">dev</td>
                  {timeSlots.map((_, slotIndex) => (
                    <td 
                      key={slotIndex}
                      className="py-2 px-4 border-l"
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(date)}
                    >
                      {dayEvents.map(event => (
                        <div 
                          key={event.id}
                          className="text-center cursor-move"
                          draggable
                          onDragStart={() => handleDragStart(event)}
                        >
                          <div className="text-xs text-gray-600">
                            {event.allDay ? 'All Day' : ''}
                          </div>
                          <div>{event.title}</div>
                        </div>
                      ))}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = events.filter(event => 
      currentDate.toDateString() === event.start.toDateString()
    );

    return (
      <div 
        className="min-h-96 p-4 border bg-white"
        onDragOver={handleDragOver}
        onDrop={() => handleDrop(currentDate)}
      >
        <div className="font-medium mb-4">
          {currentDate.toLocaleDateString()}
        </div>
        <div className="space-y-2">
          {dayEvents.map(event => (
            <div
              key={event.id}
              className={`${event.color} p-2 rounded cursor-move`}
              draggable
              onDragStart={() => handleDragStart(event)}
            >
              <div className="font-medium">{event.title}</div>
              <div className="text-xs">
                {event.start.toLocaleTimeString()} - {event.end.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full">
      <div className="flex-1 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentDate(prev => {
              const newDate = new Date(prev);
              newDate.setMonth(prev.getMonth() - 1);
              return newDate;
            })} className="p-1 hover:bg-gray-100 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold">
              {currentDate.toLocaleDateString('default', { 
                month: 'long',
                year: 'numeric'
              })}
            </h2>
            <button onClick={() => setCurrentDate(prev => {
              const newDate = new Date(prev);
              newDate.setMonth(prev.getMonth() + 1);
              return newDate;
            })} className="p-1 hover:bg-gray-100 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewType('year')}
              className={`px-3 py-1 rounded ${
                viewType === 'year' ? 'bg-gray-900 text-white' : 'bg-gray-100'
              }`}
            >
              year
            </button>
            <button
              onClick={() => setViewType('week')}
              className={`px-3 py-1 rounded ${
                viewType === 'week' ? 'bg-gray-900 text-white' : 'bg-gray-100'
              }`}
            >
              week
            </button>
            <button
              onClick={() => setViewType('day')}
              className={`px-3 py-1 rounded ${
                viewType === 'day' ? 'bg-gray-900 text-white' : 'bg-gray-100'
              }`}
            >
              day
            </button>
            <button
              onClick={() => setViewType('schedule')}
              className={`px-3 py-1 rounded ${
                viewType === 'schedule' ? 'bg-gray-900 text-white' : 'bg-gray-100'
              }`}
            >
              day
            </button>
          </div>
        </div>

        {/* Calendar View */}
        {viewType === 'year' && renderMonthView()}
        {viewType === 'week' && renderWeekView()}
        {viewType === 'day' && renderDayView()}
        {viewType === 'schedule' && renderScheduleView()}
      </div>

      {/* Sidebar */}
      <div className="w-64 p-4 border-l">
        <h3 className="font-bold mb-4">Draggable Events</h3>
        <div className="space-y-2">
          {availableEvents.map(event => (
            <div
              key={event.id}
              className={`${event.color} p-2 rounded cursor-move`}
              draggable
              onDragStart={() => handleDragStart(event, true)}
            >
              <div className="font-medium">{event.title}</div>
              {event.allDay && <div className="text-xs">All day</div>}
              {event.repeating && <div className="text-xs">Repeating</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleCalendar;