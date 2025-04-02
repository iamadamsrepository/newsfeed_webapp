import React from "react";
import { Link } from "react-router-dom";


function StoryListItem(props) {
  const story = props.story;
  return (
    <div>
      <Link to={`/story/${story.id}`} className="flex flex-row m-2">
        {story?.images?.length > 0 ? (
          <div className="flex-[1] w-full p-1">
            <img
              className="rounded-[2vw] max-h-[150px] md:max-h-[250px]"
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

export default function StoryItems(props) {
  const stories = props.stories;
  return (
    <main
      style={{
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <section
        style={{
          padding: "5px",
          outline: "0px solid #FFFFFF",
        }}
        className="m-[10px] md:m-[40px]"
      >
        <div className="font-heading text-[30px] md:text-[40px] mb-2 md:mb-6">Daily Digest</div>
        {stories.length > 0 ? (
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {stories.map((story, index) => (
              <li key={index}>
                {index === 0 ? (
                  <LeadStoryListItem story={story} />
                ) : (
                  <StoryListItem story={story} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div>Loading...</div>
        )}
      </section>
    </main>
  );
}
