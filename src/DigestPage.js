import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { apiHost } from "./config";


function StoryListItem(props) {
  const story = props.story;
  return (
    <div>
      <Link to={`/story/${story.id}`} className="flex flex-row m-2">
        {story?.images?.length > 0 ? (
          <div className="flex-[1] w-full p-1">
            <img
              className="rounded-[1vw] max-h-[150px] md:max-h-[250px]"
              src={story.images[0].url}
              alt={story.title}
            />
          </div>

        ) : (
          <img
            src="logo.png"
            alt="logo"
          />
        )}
        <div className="flex-[1] md:flex-[2] w-full ml-0 mt-0 md:ml-6 md:mt-6 place-content-center">
          <div className="text-[10px] md:text-[12px] font-bold">From {story.n_articles} Sources</div>
          <div className="text-[16px] md:text-[20px]">
            <div>{story.title}</div>
          </div>
        </div>
      </Link>
      <div className="border-t border-slate-600 ml-4 mr-4 md:ml-10 md:mr-10"></div>
    </div>
  )
}

function LeadStoryListItem(props) {
  const story = props.story;
  return (
    <div className="bg-lightRed p-3 rounded-[2vw]">
      <div className="pb-2 text-[24px] md:text-[32px] ml-1 mt-1 md:ml-3 md:mt-3 font-heading">Top Story</div>
      <Link to={`/story/${story.id}`} className="flex flex-col md:flex-row">
        <div className="md:flex-[1] place-content-center">
          <div className="text-[10px] md:text-[12px] font-bold">From {story.n_articles} Sources</div>
          <div className="text-[18px] md:text-[24px]">
            <div>{story.title}</div>
          </div>
        </div>
        {story?.images?.length > 0 ? (
          <img
            className="md:flex-[1] w-full max-h-[400px] rounded-[2vw]"
            src={story.images[0].url}
            alt="story"
            onerror="this.onerror=null; this.src='logo.png';"
          />
        ) : (
          <img
            src="logo.png"
            alt="logo"
          />
        )}
      </Link>
    </div>
  )
}

function TimelineListItem(props) {
  const timeline = props.timeline;
  console.log(timeline);
  // return (<div>timeline list item</div>);
  return ( timeline ? (
    <div>
      <Link to={`/timeline/${timeline.id}`} className="m-2 p-6 outline outline-2 outline-gray rounded-[2vw] flex flex-row">
        <div className="font-heading text-[30px] md:text-[40px]">TIMELINE</div>
        <div className="pl-4 w-full">
          <div className="text-[10px] md:text-[12px] font-bold">{timeline.subject} </div>
          <div className="text-[16px] md:text-[20px]">
            <div>{timeline.headline}</div>
          </div>
        </div>
      </Link>
      <div className="border-t border-slate-600 ml-4 mr-4 md:ml-10 md:mr-10"></div>
    </div>
  ) : ( <div>Loading...</div> )
  );
}

export default function DigestPage() {
  const { id } = useParams();
  const [digest, setDigest] = useState(null);

  useEffect(() => {
    const getData = async () => {
      if (digest === null) {
        const url = id ? apiHost + `/digest/${id}` : apiHost + `/latest_digest`;
        let response = await fetch(url);
        let digest = await response.json();
        if (digest !== null) {
          digest.stories.forEach((story) => {
            story.n_articles = story.articles.length;
          });
        }
        setDigest(digest);
        console.log(digest);
      }
    };
    getData();
  }, [digest, id]);

  const itemList = [];
  let s = 0;
  let t = 0;
  let i = 0;
  while (s < digest?.stories.length && t < digest?.timelines.length) {
    if (i === 0) {
      const leadStory = digest.stories[i];
      itemList.push(<LeadStoryListItem story={leadStory} />);
      s++;
    } else if (i % 3 === 1) {
      const timeline = digest.timelines[t];
      itemList.push(<TimelineListItem timeline={timeline} />);
      t++;
    } else {
      const story = digest.stories[s];
      itemList.push(<StoryListItem story={story} />);
      s++;
    }
    i++;
  }
  while (s < digest?.stories.length) {
    const story = digest.stories[s];
    itemList.push(<StoryListItem story={story} />);
    s++;
  }
  while (t < digest?.timelines.length) {
    const timeline = digest.timelines[t];
    itemList.push(<TimelineListItem timeline={timeline} />);
    t++;
  }

  return (
    <div
      style={{
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          padding: "5px",
          outline: "0px solid #FFFFFF",
        }}
        className="m-[10px] md:m-[40px]"
      >
        <div className="font-heading text-[30px] md:text-[40px] mb-2 md:mb-6">Daily Digest</div>
        {digest?.stories.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {itemList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}
