export const GetMessageType = (type) => {
    switch (type) {
      case 0:
        return "text";
      case 1:
        return "image";
      case 2:
        return "vocal";
      default:
        return null;
    }
  };
  