import React from "react";
import MessageItem from "./MessageItem";

export default function MessagesList({ messages }) {
  return (
    <div className="bg-white card border-bottom-0 text-left">
      <div className="d-flex flex-wrap c-blue- ml-table-header py-3  col-12 border-bottom">
        <div className="col-4 pl-3">Sender</div>
        <div className="col-5">Subject</div>
        <div className="col-3">Sent</div>
      </div>
      {messages.map((mess, index) => (
        <MessageItem
          key={index}
          sender={mess.sender}
          heading={mess.head}
          senderFname={mess.fullName}
          read={mess.read}
          messageid={mess.messageID}
          dateSent={mess.timeSent}
        />
      ))}
    </div>
  );
}
