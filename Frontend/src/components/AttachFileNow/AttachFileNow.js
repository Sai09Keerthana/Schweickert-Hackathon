import { Button } from "@material-ui/core";
import React from "react";
import { GrAttachment } from "react-icons/gr";

const AttachFileNow = () => {
  const buildFileSelector = () => {
    const fileSelector = document.createElement("input");
    fileSelector.setAttribute("type", "file");
    fileSelector.setAttribute("multiple", "multiple");

    return fileSelector;
  };

  const handleClickBrowseFiles = () => {
    buildFileSelector().click();
  };

  return (
    <div>
      <h1>Attach a File</h1>
      <p>
        <Button variant="outlined" onClick={handleClickBrowseFiles}>
          <GrAttachment size={100} />
        </Button>
      </p>
    </div>
  );
};

export default AttachFileNow;
