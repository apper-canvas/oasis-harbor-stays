import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import roomService from "@/services/api/roomService";
import hotelService from "@/services/api/hotelService";
import bookingService from "@/services/api/bookingService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import Rooms from "@/components/pages/Rooms";
import GuestBookingModal from "@/components/organisms/GuestBookingModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import GuestRoomCard from "@/components/molecules/GuestRoomCard";
const Homepage = () => {
  const [hotelData, setHotelData] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
useEffect(() => {
    loadHotelData();
    loadRooms();
  }, []);
const loadHotelData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hotelService.getHotelInfo();
      setHotelData(data);
    } catch (err) {
      setError(err.message || 'Failed to load hotel information');
    } finally {
      setLoading(false);
    }
  };

  const loadRooms = async () => {
    try {
      const availableRooms = await roomService.getAvailableRooms();
      setRooms(availableRooms);
    } catch (err) {
      console.error('Failed to load rooms:', err);
    }
  };

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      const result = await bookingService.createGuestBooking(bookingData);
      toast.success('Booking confirmed! Check your email for confirmation details.');
      return result;
    } catch (err) {
      toast.error(err.message || 'Failed to create booking. Please try again.');
      return null;
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadHotelData} />;
const navigate = useNavigate();

return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-800 to-primary/90 text-white py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center shadow-2xl">
              <ApperIcon name="Building2" size={40} className="text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            {hotelData.name}
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-white/90 font-light">
            {hotelData.tagline}
          </p>
          <p className="text-lg md:text-xl mb-12 text-white/80 max-w-2xl mx-auto leading-relaxed">
            {hotelData.description}
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-secondary/50 transition-all duration-300"
            onClick={() => {
              const bookingSection = document.getElementById('booking-section');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Explore Our Hotel
            <ApperIcon name="ChevronDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            About Harbor Stays
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-yellow-600 mx-auto mb-8"></div>
        </div>
        <Card className="p-8 md:p-12 shadow-xl">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 text-center">
            {hotelData.aboutUs}
          </p>
        </Card>
      </section>

      {/* Facilities Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              World-Class Facilities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-yellow-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience luxury and comfort with our premium amenities designed for your ultimate satisfaction
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotelData.facilities.map((facility) => (
              <Card
                key={facility.Id}
                className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-secondary"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-blue-900 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <ApperIcon name={facility.icon} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{facility.name}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.description}</p>
              </Card>
            ))}
          </div>
        </div>
</section>

      {/* Guest Booking Section */}
      <section id="booking-section" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-accent/10 rounded-full px-6 py-2 mb-4">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                Book Your Stay
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Browse Available Rooms
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our selection of comfortable and well-appointed rooms
            </p>
          </div>

          {rooms.length === 0 ? (
            <div className="text-center py-12">
              <ApperIcon name="Home" size={64} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No rooms available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {rooms.map(room => (
                <GuestRoomCard
                  key={room.Id}
                  room={room}
                  onBookNow={handleBookNow}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <GuestBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedRoom(null);
        }}
        onSubmit={handleBookingSubmit}
        selectedRoom={selectedRoom}
        rooms={rooms}
      />
      {/* Services Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Exceptional Services
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our dedicated team provides comprehensive services to ensure your stay is seamless and memorable
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelData.services.map((service) => (
            <Card
              key={service.Id}
              className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <ApperIcon name={service.icon} size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary to-primary/95">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Guest Testimonials
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-yellow-600 mx-auto mb-8"></div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover why our guests choose Harbor Stays time and time again
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelData.reviews.map((review) => (
              <Card
                key={review.Id}
                className="p-6 bg-white hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-yellow-600 flex items-center justify-center text-white font-bold mr-3 shadow-md">
                    {review.guestName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-primary">{review.guestName}</h4>
                    <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <ApperIcon
                      key={i}
                      name="Star"
                      size={16}
                      className={i < review.rating ? 'text-secondary fill-secondary' : 'text-gray-300'}
                    />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-gray-700">{review.rating}.0</span>
                </div>
                <p className="text-gray-700 leading-relaxed italic">"{review.comment}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Experience Harbor Stays
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take a visual tour of our stunning facilities and elegant accommodations
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotelData.gallery.map((image) => (
            <div
              key={image.Id}
              className="relative h-64 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group"
            >
              <img
                src={image.imageUrl}
                alt={image.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm text-white/90">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Footer */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-primary/95 to-primary/90 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your stay at Harbor Stays today and discover the perfect blend of elegance, comfort, and exceptional service
          </p>
<Button
            variant="secondary"
            size="lg"
            className="px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-secondary/50 transition-all duration-300"
            onClick={() => {
              const bookingSection = document.getElementById('booking-section');
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Book Now
          </Button>
        </div>
      </section>

      {/* Staff Login Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button
            onClick={() => navigate('/admin')}
            variant="outline"
            className="inline-flex items-center gap-2 text-sm"
          >
            <ApperIcon name="Lock" size={16} />
            Staff Login
          </Button>
        </div>
      </section>
    </div>
  );
}
export default Homepage;