import { useEffect, useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const source = new EventSource(
      `${process.env.REACT_APP_API_ENDPOINT}/count`
    );

    source.addEventListener("open", () => {
      console.log("EventSource connection opened");
    });

    source.addEventListener("message", (message) => {
      setCount(message.data);
    });

    source.addEventListener("error", (error) => {
      console.error("Error: ", error);
    });

    return () => {
      source.close();
    };
  }, []);

  return <div>{count}</div>;
}
