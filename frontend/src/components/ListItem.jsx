import React from "react";

const ListItem = () => {
  return (
    <div className="flex items-center w-full border-b border-gray-100 py-4">
      <p className="flex-grow text-gray-800">Item name</p>
      <p className="text-gray-800">20</p>
    </div>
  );
};

export default ListItem;
