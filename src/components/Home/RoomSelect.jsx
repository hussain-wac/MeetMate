import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, Check, Wifi, Monitor, Coffee } from "lucide-react";

const rooms = [
  { id: 1, name: "Conference A", capacity: 8, features: ["Video", "Whiteboard"], icon: "/meeting.png" },
  { id: 2, name: "Huddle B", capacity: 4, features: ["Video"], icon: "/meeting.png" },
  { id: 3, name: "Board Room", capacity: 12, features: ["Video", "Whiteboard", "Catering"], icon: "/meeting.png" },
];

// Feature icon mapping
const featureIcons = {
  Video: <Monitor className="w-4 h-4" />,
  Whiteboard: <Wifi className="w-4 h-4" />,
  Catering: <Coffee className="w-4 h-4" />,
};

function RoomSelect() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRoom) {
      navigate(`/schedule?roomId=${selectedRoom}`);
    }
  };

  return (
    <div className="bg-stone-50 dark:bg-stone-950 min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-900 rounded-2xl shadow-xl p-8 sm:p-10 transition-colors duration-300">
          <h2 className="text-3xl font-extrabold mb-3 text-center text-stone-800 dark:text-stone-100 tracking-tight">
            Select a Meeting Room
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-center mb-10 text-lg">
            Choose the perfect space for your next meeting
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`relative flex flex-col bg-white dark:bg-stone-800 border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedRoom === room.id
                    ? "border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-200 dark:ring-indigo-900"
                    : "border-stone-200 dark:border-stone-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                }`}
              >
                {selectedRoom === room.id && (
                  <div className="absolute top-3 right-3 bg-indigo-500 dark:bg-indigo-400 text-white rounded-full p-1 shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                )}

                <div className="bg-indigo-50 dark:bg-indigo-900/20 w-14 h-14 rounded-lg mb-4 flex items-center justify-center transition-colors duration-300">
                  <img src={room.icon} alt={room.name} className="w-8 h-8" />
                </div>

                <h3 className="font-semibold text-xl mb-2 text-stone-800 dark:text-stone-100">{room.name}</h3>

                <div className="flex items-center text-sm mb-4 text-stone-600 dark:text-stone-400">
                  <Users className="w-4 h-4 mr-2 text-stone-400 dark:text-stone-500" />
                  <span>{room.capacity} people</span>
                </div>

                <div className="mt-auto pt-4 border-t border-stone-100 dark:border-stone-800 transition-colors duration-300">
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center bg-stone-100 dark:bg-stone-700 px-2 py-1 rounded-full text-xs font-medium text-stone-600 dark:text-stone-300 transition-colors duration-300"
                      >
                        {featureIcons[feature]}
                        <span className="ml-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedRoom}
              className={`py-3 px-8 rounded-lg flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                selectedRoom
                  ? "bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white shadow-md hover:shadow-lg"
                  : "bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed"
              }`}
            >
              <Calendar className="w-5 h-5 mr-2" />
              Continue to Scheduling
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomSelect;