import React from "react";

const Error = (error) => {
  return (
    <div>
      <h1>Error:</h1>
      <pre>
        <code>{JSON.stringify(error, null, 4)}</code>
      </pre>
    </div>
  );
};

export default Error;
