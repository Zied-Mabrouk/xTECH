export const getStatus = (status) => {
  switch (status) {
    case 0:
      return "offline";
    case 1:
      return "busy";
    case 2:
      return "online";
    default:
      return "null";
  }
};
