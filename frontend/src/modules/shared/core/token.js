const getRefreshToken = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  return refreshToken;
};

const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  return accessToken;
};

const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const setAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
};

const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};

const getUserData = () => {
  return localStorage.getItem('userData');
};

const setUserData = (userData) => {
  localStorage.setItem('userData', userData);
};

const removeUserData = () => {
  localStorage.removeItem('userData');
};

const logout = () => {
  removeAccessToken();
  removeRefreshToken();
  removeUserData();
};

export {
  getRefreshToken,
  getAccessToken,
  setRefreshToken,
  setAccessToken,
  logout,
  setUserData,
  getUserData,
};
