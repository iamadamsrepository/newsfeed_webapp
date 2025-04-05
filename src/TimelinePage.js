import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { format, formatDistanceToNow, parseISO } from "date-fns";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
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
        <TimelineItem key={index} className="outline outline-2 outline-gray rounded-md">
          <div className="text-gray ml-[-30px] text-[10px] md:text-[12px]">
            <div>{relativeDate(event.date)}</div>
            <div>{absoluteDate(event.date)}</div>
          </div>

          <TimelineSeparator>
            <TimelineDot sx={{ backgroundColor: colors.blue, color: "white" }} />
            {index < events.length - 1 && <TimelineConnector sx={{ backgroundColor: colors.blue, color: "white" }}/>}
          </TimelineSeparator>

          <div className="p-1 md:p-3 mt-[-10px] mb-8 ml-2 md:ml-6 outline outline-2 outline-gray rounded-md text-gray flex items-center w-2/3">
            <div className="w-3/4 text-[11px]">{event.description}</div>
            <a className="p-1 text-lightBlue rounded-md bg-gray w-1/4 text-[10px] font-bold text-center"
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

// function TimelineStories(props) {
//   const stories = props.stories;
//   console.log(stories);
//   return stories ? (
//     <ul
//       style={{
//         listStyleType: "none",
//         padding: 0,
//         display: "grid",
//         gridTemplateColumns: window.innerWidth > 800 ? "1fr 1fr" : "1fr",
//         gap: "10px",
//       }}
//     >
//       {stories.map((story, index) => (
//         <li
//           key={index}
//           style={{
//             marginBottom: "15px",
//             padding: "10px",
//             borderRadius: "10px",
//           }}
//           className="border-2 border-lightRed"
//         >
//           asdf
//         </li>
//       ))}
//     </ul>
//   ) : (
//     <div>No articles available</div>
//   );
// }

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
