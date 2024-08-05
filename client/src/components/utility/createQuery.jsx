export const createQueryString = (formData) => {
    const queryEntries = Object.entries(formData).map(([key, value]) => {
      if (value === '' || value === undefined) {
        return null;
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    }).filter(entry => entry !== null);
    
    return queryEntries.join('&');
  };