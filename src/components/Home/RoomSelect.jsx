import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";

const rooms = [
  { id: 1, name: "Conference A", capacity: 8, features: ["Video", "Whiteboard"], icon: "/meeting.png" },
  { id: 2, name: "Huddle B", capacity: 4, features: ["Video"], icon: "/meeting.png" },
  { id: 3, name: "Board Room", capacity: 12, features: ["Video", "Whiteboard", "Catering"], icon: "/meeting.png" },
];

function RoomSelect() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();


  const handleContinue = () => {
    if (selectedRoom) {
      navigate(`/schedule?roomId=${selectedRoom}`);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select a Meeting Room</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => setSelectedRoom(room.id)} 
            className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedRoom === room.id
                ? "bg-blue-50 ring-2 ring-blue-400"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <div className="w-16 h-16 mb-3 flex items-center justify-center">
              <img src={room.icon} alt={room.name} className="w-12 h-12" />
            </div>
            <h3 className="font-medium text-gray-800 mb-1">{room.name}</h3>
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Users className="w-3 h-3 mr-1" />
              <span>{room.capacity} people</span>
            </div>
            {selectedRoom === room.id && (
              <div className="w-4 h-4 rounded-full bg-blue-500 mt-2"></div>
            )}
          </div>
        ))}
      </div>
      
      {selectedRoom && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleContinue} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center transition-colors duration-200"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Continue to Room
          </button>
        </div>
      )}
    </div>
  );
}

export default RoomSelect;
