import React, { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";

const GuestBookingModal = ({ isOpen, onClose, onSubmit, selectedRoom = null, rooms = [] }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+1",
    roomId: "",
    checkIn: "",
    checkOut: "",
    numberOfGuests: 1,
    specialRequests: ""
  });

  const [errors, setErrors] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  useEffect(() => {
    if (selectedRoom) {
      setFormData(prev => ({ ...prev, roomId: selectedRoom.Id }));
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (!isOpen) {
      setShowConfirmation(false);
      setBookingConfirmation(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        countryCode: "+1",
        roomId: selectedRoom?.Id || "",
        checkIn: "",
        checkOut: "",
        numberOfGuests: 1,
        specialRequests: ""
      });
      setErrors({});
    }
  }, [isOpen, selectedRoom]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,15}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits)";
    }

    if (!formData.roomId) {
      newErrors.roomId = "Please select a room";
    }

    if (!formData.checkIn) {
      newErrors.checkIn = "Check-in date is required";
    } else if (formData.checkIn < today) {
      newErrors.checkIn = "Check-in date cannot be in the past";
    }

    if (!formData.checkOut) {
      newErrors.checkOut = "Check-out date is required";
    } else if (formData.checkOut <= formData.checkIn) {
      newErrors.checkOut = "Check-out date must be after check-in date";
    }

    if (formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = "At least 1 guest is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedRoomData = rooms.find(r => r.Id === parseInt(formData.roomId));
    const nights = Math.ceil((new Date(formData.checkOut) - new Date(formData.checkIn)) / (1000 * 60 * 60 * 24));
    const totalAmount = selectedRoomData ? selectedRoomData.baseRate * nights : 0;

    const bookingData = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: `${formData.countryCode}${formData.phone}`,
      roomId: parseInt(formData.roomId),
      checkIn: formData.checkIn,
      checkOut: formData.checkOut,
      numberOfGuests: parseInt(formData.numberOfGuests),
      specialRequests: formData.specialRequests.trim(),
      totalAmount
    };

    const result = await onSubmit(bookingData);
    
    if (result) {
      setBookingConfirmation({
        ...result,
        roomName: selectedRoomData?.type,
        nights
      });
      setShowConfirmation(true);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleClose = () => {
    setShowConfirmation(false);
    setBookingConfirmation(null);
    onClose();
  };

  if (!isOpen) return null;

  const availableRooms = rooms.filter(r => r.status === "available");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-4 flex items-center justify-between rounded-t-lg z-10">
          <div className="flex items-center space-x-3">
            <ApperIcon name="Calendar" size={24} />
            <h2 className="text-2xl font-bold">
              {showConfirmation ? "Booking Confirmed!" : "Book Your Stay"}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
          >
            <ApperIcon name="X" size={24} />
          </button>
        </div>

        <div className="p-6">
          {showConfirmation && bookingConfirmation ? (
            <div className="space-y-6">
              <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <ApperIcon name="Check" size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Booking Confirmed!
                </h3>
                <p className="text-green-700 mb-4">
                  Your reservation has been successfully created.
                </p>
                <div className="bg-white rounded-lg p-4 text-left space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Confirmation Number:</span>
                    <span className="text-primary font-bold text-lg">#{bookingConfirmation.Id}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Guest Name:</span>
                    <span className="text-gray-900 font-semibold">{bookingConfirmation.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Room:</span>
                    <span className="text-gray-900 font-semibold">{bookingConfirmation.roomName}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Check-in:</span>
                    <span className="text-gray-900 font-semibold">{new Date(bookingConfirmation.checkIn).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Check-out:</span>
                    <span className="text-gray-900 font-semibold">{new Date(bookingConfirmation.checkOut).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Nights:</span>
                    <span className="text-gray-900 font-semibold">{bookingConfirmation.nights}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600 font-medium">Guests:</span>
                    <span className="text-gray-900 font-semibold">{bookingConfirmation.numberOfGuests}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-600 font-bold text-lg">Total Amount:</span>
                    <span className="text-primary font-bold text-2xl">${bookingConfirmation.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <ApperIcon name="Mail" size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-blue-900 font-medium">Confirmation Email Sent</p>
                    <p className="text-blue-700 text-sm mt-1">
                      A confirmation email with your booking details has been sent to <strong>{bookingConfirmation.email}</strong>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleClose}
                  variant="primary"
                  size="lg"
                  className="px-8"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="John Doe"
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="john.doe@example.com"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => handleChange("countryCode", e.target.value)}
                      className="w-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200"
                    >
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+91">+91</option>
                      <option value="+86">+86</option>
                      <option value="+81">+81</option>
                      <option value="+49">+49</option>
                      <option value="+33">+33</option>
                      <option value="+39">+39</option>
                      <option value="+34">+34</option>
                      <option value="+61">+61</option>
                    </select>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder="1234567890"
                      className={`flex-1 ${errors.phone ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Room <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.roomId}
                    onChange={(e) => handleChange("roomId", e.target.value)}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 ${
                      errors.roomId ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="">Choose a room</option>
                    {availableRooms.map(room => (
                      <option key={room.Id} value={room.Id}>
                        {room.roomNumber} - {room.type} (${room.baseRate}/night)
                      </option>
                    ))}
                  </select>
                  {errors.roomId && (
                    <p className="text-red-500 text-sm mt-1">{errors.roomId}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.checkIn}
                    onChange={(e) => handleChange("checkIn", e.target.value)}
                    min={today}
                    className={errors.checkIn ? "border-red-500" : ""}
                  />
                  {errors.checkIn && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.checkOut}
                    onChange={(e) => handleChange("checkOut", e.target.value)}
                    min={formData.checkIn || today}
                    className={errors.checkOut ? "border-red-500" : ""}
                  />
                  {errors.checkOut && (
                    <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.numberOfGuests}
                  onChange={(e) => handleChange("numberOfGuests", e.target.value)}
                  className={errors.numberOfGuests ? "border-red-500" : ""}
                />
                {errors.numberOfGuests && (
                  <p className="text-red-500 text-sm mt-1">{errors.numberOfGuests}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  value={formData.specialRequests}
                  onChange={(e) => handleChange("specialRequests", e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all duration-200 resize-none"
                  placeholder="Early check-in, late checkout, extra pillows, dietary requirements, etc."
                />
                <p className="text-gray-500 text-xs mt-1">
                  Let us know if you have any special preferences or requirements
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Confirm Booking
                </Button>
              </div>
            </form>
          )}
        </div>
      </Card>
    </div>
  );
};

export default GuestBookingModal;