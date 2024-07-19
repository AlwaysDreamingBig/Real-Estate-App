export const geocodeAddress = async (address) => {
    const encodedAddress = encodeURIComponent(address);
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`);
    const data = await response.json();
  
    if (data.length === 0) {
      throw new Error('Address not found');
    }
  
    const { lat, lon } = data[0];
    return [parseFloat(lat), parseFloat(lon)];
  };
  