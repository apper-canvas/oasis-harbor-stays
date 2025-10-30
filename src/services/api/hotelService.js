import hotelData from '@/services/mockData/hotel.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const hotelService = {
  async getHotelInfo() {
    await delay(800);
    
    return {
      ...hotelData.hotelInfo,
      facilities: [...hotelData.facilities],
      services: [...hotelData.services],
      reviews: [...hotelData.reviews],
      gallery: [...hotelData.gallery]
    };
  }
};

export default hotelService;