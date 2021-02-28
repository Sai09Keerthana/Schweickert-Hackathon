import React, { Component } from "react";

import Recorder from "react-mp3-recorder";
import ReactAudioPlayer from "react-audio-player";

import blobToBuffer from "blob-to-buffer";
import NextButton from "../NextButton/NextButton";
import { MobileView } from "react-device-detect";

export default class SpeakTicket extends Component {
  state = {
    url: "",
  };

  render() {
    const { url } = this.state;

    return (
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            // minHeight: "100vh",
          }}
        >
          <div>
            <Recorder
              onRecordingComplete={this._onRecordingComplete}
              onRecordingError={this._onRecordingError}
              style={{
                margin: "0 auto",
              }}
            />

            <p>
              Click and <b>hold</b> to start recording.
            </p>

            <MobileView>
              <p style={{ color: "red" }}>
                SORRY you are on a mobile phone and this does not work on
                mobile. Use a desktop browser. I've created a{" "}
                <a
                  href="https://github.com/transitive-bullshit/react-mp3-recorder/pull/17"
                  rel="noopener noreferrer"
                >
                  Pull Request
                </a>{" "}
                that should fix it but it's not yet approved
              </p>
            </MobileView>

            {url && (
              <div
                onTouchStart={this._onMouseDown}
                onTouchEnd={this._onMouseUp}
                onMouseDown={this._onMouseDown}
                onMouseUp={this._onMouseUp}
              >
                <ReactAudioPlayer
                  src={url}
                  controls
                  style={
                    {
                      // minWidth: "500px",
                    }
                  }
                />
              </div>
            )}
            {/* {url && <div>URL: {url}</div>} */}
          </div>
        </div>
        <MobileView>
          <NextButton to={this.props.to} label={"Next"} />
        </MobileView>
        {url && <NextButton to={this.props.to} label={"Next"} />}
      </div>
    );
  }

  _onRecordingComplete = (blob) => {
    blobToBuffer(blob, (err, buffer) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log("recording", blob); //TODO: upload to API as POST to /upload

      if (this.state.url) {
        window.URL.revokeObjectURL(this.state.url);
      }

      this.setState({
        url: window.URL.createObjectURL(blob),
      });
    });
  };

  _onRecordingError = (err) => {
    console.log("error recording", err);

    if (this.state.url) {
      window.URL.revokeObjectURL(this.state.url);
    }

    this.setState({ url: null });
  };
}
