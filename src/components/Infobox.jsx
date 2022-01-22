import { useState } from "react";

export const Infobox = (props) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="border-solid border-2 border-black mb-2 rounded-md ">
      <div
        className="flex justify-between items-center cursor-pointer bg-gray-100"
        onClick={() => setShowInfo(!showInfo)}
      >
        <h3 className="font-bold text-2xl pl-2 text-center">{props.title}</h3>
        <button className="p-4" type="button">
          {showInfo ? "-" : "+"}
        </button>
      </div>
      <div style={{ display: showInfo ? "block" : "none" }}>
        {props.children}
      </div>
    </div>
  );
};
