// Chat.jsx
"use client";
import React, { useState, useRef, useCallback } from "react";
import { GroupedVirtuoso } from "react-virtuoso";
import { generateUsers } from "./data";

const Chat = () => {
  const virtuosoRef = useRef(null);
  const START_INDEX = 10;
  const INITIAL_ITEM_COUNT = 20;
  const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX);

  const [users, setUsers] = useState(() =>
    generateUsers(INITIAL_ITEM_COUNT, START_INDEX)
  );

  const prepend = useCallback(() => {
    const usersToPrepend = 20;
    const nextFirstItemIndex = firstItemIndex - usersToPrepend;
    setUsers(() => [
      ...generateUsers(usersToPrepend, nextFirstItemIndex),
      ...users,
    ]);
    setFirstItemIndex(nextFirstItemIndex);
  }, [firstItemIndex, users]);

  const itemContent = (index, user) => {
    console.log("user", user);
    return (
      <div className="px-4 py-2">
        {index > 10 && index < 15 ? (
          <img src={user.img} alt="" />
        ) : (
          <div className="inline-block bg-blue-500 text-white px-1 py-1 rounded-lg">
            {index}, {user.index}. {user.name}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-[60vh] bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md h-full bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Chat Room</h1>
        </div>
        <div className="flex-1 overflow-hidden">
          {
            <GroupedVirtuoso
              ref={virtuosoRef}
              firstItemIndex={firstItemIndex}
              style={{ height: "100%" }}
              groupContent={() => (
                <div className="sticky top-0 bg-gray-200 py-1 px-4 text-center text-sm text-gray-600">
                  {"2024-10-10"}
                </div>
              )}
              itemContent={itemContent}
              data={users}
              startReached={prepend}
              rangeChanged={({ startIndex, endIndex }) =>
                console.log(
                  `rangeChanged end: ${endIndex} start: ${startIndex}`
                )
              }
              initialTopMostItemIndex={users.length - 1}
            />
          }
        </div>
        <div className="p-4 border-t">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={prepend}>prepend</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
