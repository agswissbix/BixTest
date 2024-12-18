import React, { useState } from 'react';
import '../app/globals.css';


const CalendarDemo = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Meeting di Progetto',
      start: new Date(2024, 11, 18, 10, 0),
      end: new Date(2024, 11, 18, 11, 30),
      description: 'Discussione sullo stato del progetto',
      color: '#3b82f6'
    },
    {
      id: '2',
      title: 'Pausa Pranzo',
      start: new Date(2024, 11, 18, 13, 0),
      end: new Date(2024, 11, 18, 14, 0),
      description: 'Pranzo con il team',
      color: '#10b981'
    }
  ]);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [view, setView] = useState('month');
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 18));
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
    description: '',
    color: '#3b82f6'
  });

  const getHoursOfDay = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
    return hours;
  };

  const getDaysInMonth = (date) => {
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i));
    }
    return days;
  };

  const getDaysInWeek = (date) => {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const handleAddEvent = () => {
    const event = {
      id: Math.random().toString(36).substr(2, 9),
      ...newEvent
    };
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      start: new Date(),
      end: new Date(),
      description: '',
      color: '#3b82f6'
    });
  };

  const renderMonthView = () => (
    <div className="grid grid-cols-7 gap-1">
      {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
        <div key={day} className="p-2 text-center font-semibold">
          {day}
        </div>
      ))}
      {getDaysInMonth(currentDate).map(day => (
        <div
          key={day.toISOString()}
          className="min-h-32 p-2 border border-gray-200"
        >
          <div className="font-semibold">{day.getDate()}</div>
          {events
            .filter(event => 
              event.start.toDateString() === day.toDateString()
            )
            .map(event => (
              <div
                key={event.id}
                className="p-1 mb-1 rounded text-sm cursor-pointer text-white"
                style={{ backgroundColor: event.color }}
                onClick={() => {
                  setSelectedEvent(event);
                  setShowEventDialog(true);
                }}
              >
                {event.title}
              </div>
            ))}
        </div>
      ))}
    </div>
  );

  const renderWeekView = () => (
    <div className="grid grid-cols-8 gap-1">
      <div className="p-2"></div>
      {getDaysInWeek(currentDate).map(day => (
        <div key={day.toISOString()} className="p-2 text-center font-semibold">
          {day.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric' })}
        </div>
      ))}
      {getHoursOfDay().map(hour => (
        <React.Fragment key={hour}>
          <div className="p-2 text-right text-sm">{hour}</div>
          {getDaysInWeek(currentDate).map(day => (
            <div
              key={`${day.toISOString()}-${hour}`}
              className="border border-gray-200 p-1"
            >
              {events
                .filter(event => 
                  event.start.toDateString() === day.toDateString() &&
                  event.start.getHours() === parseInt(hour)
                )
                .map(event => (
                  <div
                    key={event.id}
                    className="p-1 mb-1 rounded text-sm cursor-pointer text-white"
                    style={{
                      backgroundColor: event.color,
                      height: `${(event.end.getHours() - event.start.getHours()) * 4}rem`
                    }}
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowEventDialog(true);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );

  const renderDayView = () => (
    <div className="grid grid-cols-1 gap-1">
      {getHoursOfDay().map(hour => (
        <div 
          key={hour} 
          className="flex border-b border-gray-200"
        >
          <div className="p-2 w-20 text-right text-sm">{hour}</div>
          <div className="flex-1 min-h-16 p-1">
            {events
              .filter(event =>
                event.start.toDateString() === currentDate.toDateString() &&
                event.start.getHours() === parseInt(hour)
              )
              .map(event => (
                <div
                  key={event.id}
                  className="p-2 mb-1 rounded text-sm cursor-pointer text-white"
                  style={{
                    backgroundColor: event.color,
                    height: `${(event.end.getHours() - event.start.getHours()) * 4}rem`
                  }}
                  onClick={() => {
                    setSelectedEvent(event);
                    setShowEventDialog(true);
                  }}
                >   
                  {event.title}
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );

  const EventCreator = () => (
    <div className="p-4 border-l border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Crea Nuovo Evento</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Titolo evento"
          value={newEvent.title}
          onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={newEvent.start.toISOString().slice(0, 16)}
          onChange={(e) => setNewEvent({...newEvent, start: new Date(e.target.value)})}
          className="w-full p-2 border rounded"
        />
        <input
          type="datetime-local"
          value={newEvent.end.toISOString().slice(0, 16)}
          onChange={(e) => setNewEvent({...newEvent, end: new Date(e.target.value)})}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Descrizione"
          value={newEvent.description}
          onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
          className="w-full p-2 border rounded"
        />
        <input
          type="color"
          value={newEvent.color}
          onChange={(e) => setNewEvent({...newEvent, color: e.target.value})}
          className="w-full h-10"
        />
        <button 
          onClick={handleAddEvent}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Aggiungi Evento
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen max-h-screen">
      <div className="flex-1 p-4 overflow-auto">
        <div className="mb-4 flex justify-between items-center">
          <div className="space-x-2">
            <button
              className={`px-4 py-2 rounded ${view === 'month' ? 'bg-blue-500 text-white' : 'border'}`}
              onClick={() => setView('month')}
            >
              Mese
            </button>
            <button
              className={`px-4 py-2 rounded ${view === 'week' ? 'bg-blue-500 text-white' : 'border'}`}
              onClick={() => setView('week')}
            >
              Settimana
            </button>
            <button
              className={`px-4 py-2 rounded ${view === 'day' ? 'bg-blue-500 text-white' : 'border'}`}
              onClick={() => setView('day')}
            >
              Giorno
            </button>
          </div>
          <div className="space-x-2">
            <button
              className="px-4 py-2 border rounded"
              onClick={() => {
                const newDate = new Date(currentDate);
                if (view === 'month') {
                  newDate.setMonth(currentDate.getMonth() - 1);
                } else if (view === 'week') {
                  newDate.setDate(currentDate.getDate() - 7);
                } else {
                  newDate.setDate(currentDate.getDate() - 1);
                }
                setCurrentDate(newDate);
              }}
            >
              Precedente
            </button>
            <span className="font-semibold">
              {view === 'month' 
                ? currentDate.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })
                : view === 'week'
                  ? `${new Date(currentDate.getTime() - (currentDate.getDay() * 24 * 60 * 60 * 1000)).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })} - ${new Date(currentDate.getTime() + ((6 - currentDate.getDay()) * 24 * 60 * 60 * 1000)).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })}`
                  : currentDate.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
              }
            </span>
            <button
              className="px-4 py-2 border rounded"
              onClick={() => {
                const newDate = new Date(currentDate);
                if (view === 'month') {
                  newDate.setMonth(currentDate.getMonth() + 1);
                } else if (view === 'week') {
                  newDate.setDate(currentDate.getDate() + 7);
                } else {
                  newDate.setDate(currentDate.getDate() + 1);
                }
                setCurrentDate(newDate);
              }}
            >
              Successivo
            </button>
          </div>
        </div>
        <div className="border rounded p-4">
          {view === 'month' && renderMonthView()}
          {view === 'week' && renderWeekView()}
          {view === 'day' && renderDayView()}
        </div>
        
        {showEventDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded max-w-lg w-full">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold">{selectedEvent?.title}</h2>
                <button 
                  onClick={() => setShowEventDialog(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <span className="text-gray-600">
                    {selectedEvent?.start.toLocaleDateString()} - {selectedEvent?.end.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600">
                    {selectedEvent?.start.toLocaleTimeString()} - {selectedEvent?.end.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-gray-600">{selectedEvent?.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <EventCreator />
    </div>
  );
};

export default CalendarDemo;