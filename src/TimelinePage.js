import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineDot,
} from "@mui/lab";

import { apiHost, colors } from "./config";

function relativeDate(dateString) {
  const date = parseISO(dateString); // Converts "YYYY-MM-DD" to Date
  const relative = formatDistanceToNow(date, { addSuffix: true }); // "3 days ago"
  return relative;
}

function absoluteDate(dateString) {
  const date = parseISO(dateString); // Converts "YYYY-MM-DD" to Date
  const absolute = format(date, "EEEE d MMMM yyyy"); // "Thursday 5 April 2025"
  return absolute;
}

function TimelineSection(props) {
  var events = props.events;
  events = events.sort((a, b) => new Date(a.date) - new Date(b.date));
  return (
    <Timeline position="right">
      {events.map((event, index) => (
        <TimelineItem key={index} className="">
          <div className="text-gray ml-[-100px] mr-[5px] text-[10px] md:text-[12px] text-right">
            <div>{relativeDate(event.date)}</div>
            <div>{absoluteDate(event.date)}</div>
          </div>

          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: colors.blue, color: "white" }} />
            {index < events.length - 1 && <TimelineConnector sx={{ backgroundColor: colors.blue, color: "white" }}/>}
          </TimelineSeparator>

          <div className="p-1 md:p-3 mt-[-10px] md:mt-[-20px] mb-4 ml-2 md:ml-4 rounded-md text-gray flex items-center w-3/5">
            <div className="w-3/4 text-[12px] md:text-[16px] p-1 pr-2">{event.description}</div>
            <a className="m-1 pt-1 pb-1 rounded-md text-gray w-1/4 text-[10px] font-bold text-center outline outline-2 outline-gray"
              href={`https://www.digesticle.com/story/${event.story_id}`} target="_blank" rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  );
}


export default function TimelinePage() {
  const { id } = useParams();
  const [timeline, setTimeline] = useState(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      const response = await fetch(apiHost + `/timeline/${id}`);
      const data = await response.json();
      setTimeline(data);
      console.log(data);
    };
    fetchTimeline();
  }, [id]);

  const summary_section = timeline?.summary ? (
    <div
      style={{
        padding: "10px",
        margin: "10px",
        borderRadius: "10px",
      }}
      className="bg-lightRed"
    >
      <p className="font-heading text-[28px] mb-1">Summary</p>
      <ul>
        {timeline.summary.map((sentence, index) => (
          <li key={index} style={{ marginBottom: "10px", fontSize: "14px" }}>
            {sentence}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div></div>
  );

  return timeline ? (
    <div>
      <div className="p-[3px] m-[5px] md:m-[40px] flex flex-col md:flex-row gap-4">
        <div className="md:flex-[2] w-full">
          <div className="p-4">
            <div className="font-heading text-[30px] md:text-[40px]">Timeline</div>
            <h1 className="font-bold">{timeline.subject}</h1>
            <h1 className="font-heading mb-2 text-2xl font-bold">{timeline.headline}</h1>
          </div>
          <TimelineSection events={timeline.events}/>
        </div>
        <div className="md:flex-[1] w-full">
          {summary_section}
        </div>
      </div>
      {/* <TimelineStories stories={timeline.stories} /> */}
    </div>
  ) : (
    <div>Loading...</div>
  );
}
