// src/components/Message.jsx
export default function Message({ text, type }) {
  const style = {
    color: type === "error" ? "red" : "green",
    marginTop: "10px",
    fontWeight: "bold",
  };

  return <p style={style}>{text}</p>;
}

