import React, { Component } from "react";
import axios from "axios";

const endpoint = "http://localhost:5000/upload";

class App extends Component {
  state = {
    selectedFile: null,
    loaded: 0,
    text: ""
  };

  handleselectedFile = event => {
    window.console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  handleUpload = () => {
    const data = new FormData();
    data.append("file", this.state.selectedFile, this.state.selectedFile.name);
    window.console.log(data);
    axios
      .post(endpoint, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          });
        }
      })
      .then(res => {
        window.console.log(res.data[0]);
      });
  };
  render() {
    return (
      <div className="App">
        <input type="file" name="" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    );
  }
}

export default App;
