"use client";

import {
  MultiFileDropzone,
  type FileState,
} from "@/components/EdgeStore/MultiFileDropzone";

import { useState } from "react";

export default function EdgeStoreUploader({isCancelled=false, isSubmitted= false}) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [urls, setUrls] = useState<string[]>([]);


  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  if (isSubmitted) {
    return <div className="flex flex-col items-center m-6">COMPLETE!!!</div>;
  }
  if (isCancelled) {
    return <div className="flex flex-col items-center m-6">CANCELLED!!!</div>;
  }

  return (
    <div className="flex flex-col items-center m-6">
      <div className="flex gap-4">
        <MultiFileDropzone
          value={fileStates}
          onChange={(files) => {
            setFileStates(files);
          }}
          onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
              addedFiles.map(async (addedFileState) => {
                try {
                  //  you can write here server query
                  //   file: addedFileState.file,
                  //   options: {
                  //     temporary: true,
                  //   },
                  //   onProgressChange: async (progress) => {
                  //     updateFileProgress(addedFileState.key, progress);
                  //     if (progress === 100) {
                  //       // wait 1 second to set it to complete
                  //       // so that the user can see the progress bar at 100%
                  //       await new Promise((resolve) =>
                  //         setTimeout(resolve, 1000)
                  //       );
                  //       updateFileProgress(addedFileState.key, "COMPLETE");
                  //     }
                  //   },
                  // });
                  // setUrls((prev) => [...prev, res.url]);
                } catch (err) {
                  updateFileProgress(addedFileState.key, "ERROR");
                }
              })
            );
          }}
        />
        {/* Just a dummy form for demo purposes */}
      
      </div>
    </div>
  );
}

function TextField(props: {
  name?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <input
      type="text"
      name={props.name}
      className="bg-zinc-900 border border-zinc-600 rounded px-2 py-1"
      onChange={(e) => props.onChange?.(e.target.value)}
    />
  );
}