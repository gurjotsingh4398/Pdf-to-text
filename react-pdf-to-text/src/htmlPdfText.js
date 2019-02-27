import React from "react";

const App = () => {
  return (
    <div>
      <form
        method="post"
        action="http://localhost:5000/upload"
        encType="multipart/form-data"
      >
        <input type="file" name="filename" />
        <input type="submit" value="upload" />
      </form>
    </div>
  );
};

export default App;
