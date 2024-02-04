// SchedulingPage.js
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../container/Sidebar';

const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: 'Meeting 1',
    start: new Date(2023, 10, 20, 10, 0), // November 20, 2023, 10:00 AM
    end: new Date(2023, 10, 20, 12, 0), // November 20, 2023, 12:00 PM
  },
  // Add more events as needed
];

const SmallCalendar = () => {
  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4">Small Calendar</h2>
      {/* Small calendar component goes here */}
    </div>
  );
};

const SchedulingPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Scheduling Page</h1>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }} // Adjust the height as needed
        />
      </div>
    </div>
  );
};

export default SchedulingPage;