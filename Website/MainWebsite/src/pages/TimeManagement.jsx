import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'tailwindcss/tailwind.css';

const localizer = momentLocalizer(moment);

function Time() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addTask = () => {
    if (title.trim() !== '') {
      const newTask = { id: Date.now(), title, date: selectedDate };
      setTasks([...tasks, newTask]);
      setTitle('');
    }
  };

  // Convert tasks to events for the calendar
  const events = tasks.map(task => ({
    title: task.title,
    start: task.date,
    end: task.date,
    allDay: true
  }));

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Section - Calendar */}
      <div className="w-2/3 bg-indigo-500 p-10">
        <h1 className="text-4xl font-bold mb-8 text-white">Calendar</h1>
        <div className="mb-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            className="rounded-lg bg-white"
            onSelectEvent={event => alert(event.title)}
          />
        </div>
      </div>

      {/* Right Section - Task Management */}
      <div className="w-1/3 bg-white p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Time Management</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          onClick={addTask}
          className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 transition duration-300"
        >
          Add Task
        </button>
        <ul className="mt-6">
          {tasks.map(task => (
            <li
              key={task.id}
              className="bg-gray-200 p-2 my-2 rounded"
            >
              {task.title} - {task.date.toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Time;
