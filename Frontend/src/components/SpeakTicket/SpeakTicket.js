import React, { Component } from "react";

import Recorder from "react-mp3-recorder";
import ReactAudioPlayer from "react-audio-player";

import blobToBuffer from "blob-to-buffer";
import NextButton from "../NextButton/NextButton";
import { MobileView } from "react-device-detect";
import { BsFillLockFill } from "react-icons/bs";
import { Button } from "@material-ui/core";
import HorizontalSpacing from "../HorizontalSpacing/HorizontalSpacing";

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
            <HorizontalSpacing />
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
            <HorizontalSpacing variant="medium" />

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
        <HorizontalSpacing variant="medium" />

        <Button>
          <BsFillLockFill size={200} />
          <span>
            <small>
              Your data is safe with us! See the{" "}
              <a
                href="https://aws.amazon.com/agreement/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Cloud (service-level) Agreement
              </a>{" "}
              and{" "}
              <a
                href="https://aws.amazon.com/compliance/gdpr-center"
                rel="noopener noreferrer"
                target="_blank"
              >
                GDPR/Data-Privacy
              </a>{" "}
              of Amazon AWS Cloud Provider. We promise to <u>not</u> share your
              data with anyone except literally anyone because this is a
              prototype. You can also read details about the voice data
              processing of{" "}
              <a href="https://docs.aws.amazon.com/transcribe/latest/dg/data-protection.html">
                AWS Transcribe
              </a>{" "}
              as well as{" "}
              <a
                href="https://docs.aws.amazon.com/polly/latest/dg/data-protection.html"
                rel="noopener noreferrer"
                target="_blank"
              >
                AWS Polly
              </a>
              . For reading out your text recording we use AWS Polly can be seen
              here.
              {/* You can also checkout our summary
          written in easy words{" "}
          <a
            href="https://trello-attachments.s3.amazonaws.com/6038f5a47b2fb5806eff98b9/6039323da519db4bb37af44b/a34d0032e0f3490b7e41165939cb2975/Data_Protection_by_AWS.pdf"
            rel="noopener noreferrer"
            target="_blank"
          >
            here
          </a>. */}
            </small>
          </span>
        </Button>
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
