"use client";

import { Card, CardContent, Divider, Typography } from "@mui/joy";
import React from "react";
import { Download } from "lucide-react";
import { MdPictureAsPdf } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function FileCard({ item }: any) {
  console.log(item.file.url);
  return (
    <div>
      <Card
        className="h-28 w-60 bg-card text-card-foreground flex flex-row m-0 p-0 my-2"
        style={{ padding: "4px" }}
      >
        <CardContent className="flex flex-col p-0 justify-between">
          <p
            id="card-description"
            className="line-clamp-2 text-card-foreground p-0 m-0 rounded"
          >
            {item?.title}
          </p>
          <Divider />
          <div className="flex flex-row items-center justify-around m-0 p-2 rounded bg-muted">
            <a href={item.file.url} target="_blank" rel="noreferrer">
              <MdPictureAsPdf className="cursor-pointer rounded-full text-2xl" />
            </a>
           
            {/* <a
              href={item.file.url}
              download
              className="cursor-pointer rounded-full text-2xl"
            >
              <Download className="cursor-pointer rounded-full text-2xl" />
            </a> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default FileCard;
