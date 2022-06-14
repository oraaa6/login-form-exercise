import React from "react";
import "./message.scss";

function Message(props: { message: string }) {
  return <p className="message">{props.message}</p>;
}

export default Message;
