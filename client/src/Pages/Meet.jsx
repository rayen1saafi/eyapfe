import { JitsiMeeting } from "@jitsi/react-sdk";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Meet = () => {
  const meets = useSelector((state) => state?.meet?.meet);
  const { id } = useParams();
  return (
    <div style={{ height: "100vh", display: "grid", flexDirection: "column" }}>
      {Array.isArray(meets) &&
        meets
          .filter((mee) => mee?._id === id)
          .map((mee) => (
            <JitsiMeeting
              domain="meet.jit.si"
              roomName={mee?.titre}
              displayName="YOUR_DISPLAY_NAME"
            />
          ))}
    </div>
  );
};

export default Meet;
