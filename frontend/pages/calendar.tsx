import React, { useState } from 'react';
import '../app/globals.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Event {
    id: string;
    title: string;
    duration: number; // in days
    day: number; // index of the day it starts
}

const Calendar: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const days = Array.from({ length: 30 }, (_, index) => index + 1); // Calendar with 30 days

    const onDragEnd = (result: any) => {
        const { source, destination } = result;

        if (!destination) return;

        const updatedEvents = events.map((event) => {
            if (event.id === result.draggableId) {
                return { ...event, day: parseInt(destination.droppableId) };
            }
            return event;
        });

        setEvents(updatedEvents);
    };

    const handleAddEvent = () => {
        const newEvent: Event = {
            id: `event-${events.length + 1}`,
            title: `New Event`,
            duration: 1,
            day: 1,
        };
        setEvents([...events, newEvent]);
    };

    const handleRenameEvent = (id: string, newTitle: string) => {
        setEvents(events.map((event) => (event.id === id ? { ...event, title: newTitle } : event)));
    };

    const handleResizeEvent = (id: string, newDuration: number) => {
        setEvents(events.map((event) => (event.id === id ? { ...event, duration: newDuration } : event)));
    };

    return (
        <div className="p-4">
            <button
                className="mb-4 p-2 bg-blue-500 text-white rounded"
                onClick={handleAddEvent}
            >
                + Add Event
            </button>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-7 gap-4">
                    {days.map((day) => (
                        <Droppable key={day} droppableId={`${day}`}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="border border-gray-300 bg-gray-100 rounded p-2 h-32"
                                >
                                    <div className="text-center font-bold mb-2">Day {day}</div>
                                    {events
                                        .filter((event) => event.day === day)
                                        .map((event, index) => (
                                            <Draggable
                                                key={event.id}
                                                draggableId={event.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-blue-300 text-white p-2 rounded mb-2"
                                                    >
                                                        <div>
                                                            <input
                                                                className="bg-transparent w-full"
                                                                value={event.title}
                                                                onChange={(e) =>
                                                                    handleRenameEvent(
                                                                        event.id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-sm">
                                                                Duration: {event.duration} day(s)
                                                            </span>
                                                            <button
                                                                className="text-sm bg-gray-500 px-2 rounded"
                                                                onClick={() =>
                                                                    handleResizeEvent(
                                                                        event.id,
                                                                        Math.max(1, event.duration + 1)
                                                                    )
                                                                }
                                                            >
                                                                +
                                                            </button>
                                                            <button
                                                                className="text-sm bg-gray-500 px-2 rounded"
                                                                onClick={() =>
                                                                    handleResizeEvent(
                                                                        event.id,
                                                                        Math.max(1, event.duration - 1)
                                                                    )
                                                                }
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default Calendar;
