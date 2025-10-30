import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const GuestRoomCard = ({ room, onBookNow }) => {
  const amenityIcons = {
    "WiFi": "Wifi",
    "TV": "Tv",
    "Smart TV": "Tv",
    "Air Conditioning": "Wind",
    "Mini Bar": "Wine",
    "Coffee Maker": "Coffee",
    "Safe": "Lock",
    "Jacuzzi": "Bath",
    "Balcony": "Home",
    "Living Room": "Sofa",
    "Kitchen": "ChefHat"
  };

const getRoomGradient = () => {
    const type = room.type.toLowerCase();
    if (type.includes('presidential')) {
      return 'bg-gradient-to-br from-primary via-primary/80 to-secondary/60';
    } else if (type.includes('suite')) {
      return 'bg-gradient-to-br from-secondary/40 via-accent/30 to-secondary/50';
    } else if (type.includes('deluxe')) {
      return 'bg-gradient-to-br from-accent/30 via-primary/20 to-accent/40';
    } else {
      return 'bg-gradient-to-br from-primary/20 via-accent/15 to-primary/25';
    }
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-accent/30">
      <div className={`relative h-48 overflow-hidden ${getRoomGradient()}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Image" size={64} className="text-white/40 group-hover:text-white/60 transition-colors duration-300" />
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <span className="text-primary font-bold text-sm">Room {room.roomNumber}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300">
            {room.type}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Users" size={16} />
              <span>Up to {room.capacity} guests</span>
            </div>
            <div className="flex items-center space-x-1">
              <ApperIcon name="Home" size={16} />
              <span>Floor {room.floor}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
            <ApperIcon name="Sparkles" size={16} className="mr-1" />
            Amenities
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {room.amenities.slice(0, 6).map((amenity, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 text-xs text-gray-600 bg-gray-50 rounded-lg px-2 py-1.5"
              >
                <ApperIcon
                  name={amenityIcons[amenity] || "Check"}
                  size={14}
                  className="text-accent"
                />
                <span className="truncate">{amenity}</span>
              </div>
            ))}
          </div>
          {room.amenities.length > 6 && (
            <p className="text-xs text-gray-500 mt-2">
              +{room.amenities.length - 6} more amenities
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Starting from</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold text-primary">${room.baseRate}</span>
              <span className="text-sm text-gray-600">/night</span>
            </div>
          </div>
          <Button
            onClick={() => onBookNow(room)}
            variant="primary"
            size="lg"
            className="group-hover:shadow-lg transition-shadow duration-300"
          >
            Book Now
            <ApperIcon name="ArrowRight" size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GuestRoomCard;