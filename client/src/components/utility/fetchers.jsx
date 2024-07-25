const fetchUserInfo = async (userID) => {
    console.log(userID);
  
    try {
      const res = await fetch(`http://localhost:3000/api/user/getinfo/${userID}`, {
        method: 'GET',
        credentials: 'include',
      });
  
      if (!res.ok) {
        throw new Error('Cannot load advisor information, please re-load the page');
      }
  
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message || 'Error fetching info');
      throw error; // rethrow the error so it can be handled by the caller
    }
  };
  
  export default fetchUserInfo;
  