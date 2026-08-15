const generateTrackingId = () => {
  return `HC-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase()}`;
};

module.exports = generateTrackingId;