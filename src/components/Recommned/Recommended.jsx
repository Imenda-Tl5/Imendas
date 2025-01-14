import React, { useEffect, useState } from "react";
import "./Recommended.css";
import sarah from "../../assets/sarah.webp";
import { API_KEY, valueConverter } from "../../env";
import moment from "moment";

const Recommended = ({ categoryId }) => {
  const [sideVid, setSideVid] = useState([]); // Videos state
  const [channelInfo, setChannelInfo] = useState({}); // Channel details
  const [error, setError] = useState(null); // Error state

  // Fetch recommended videos
  const fetchSideVideo = async () => {
    const sideVidUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=60&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    try {
      const response = await fetch(sideVidUrl);
      const result = await response.json();

      if (result?.items) {
        setSideVid(result.items);
        // Fetch channel data after getting videos
        const channelIds = result.items.map((item) => item.snippet.channelId);
        fetchChannelData(channelIds);
      } else {
        setError("No videos found for this category.");
      }
    } catch (error) {
      console.error("Error fetching recommendation list:", error);
      setError("Failed to fetch recommended videos.");
    }
  };

  // Fetch channel details
  const fetchChannelData = async (channelIds) => {
    const channelIdString = channelIds.join(",");
    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelIdString}&key=${API_KEY}`;

    try {
      const response = await fetch(channelUrl);
      const result = await response.json();

      if (result?.items) {
        const channelData = {};
        result.items.forEach((element) => {
          channelData[element.id] = element.snippet;
        });
        setChannelInfo(channelData);
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  // Fetch videos whenever categoryId changes
  useEffect(() => {
    if (categoryId) {
      fetchSideVideo();
    }
  }, [categoryId]);

  // Render loading or error state if applicable
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!sideVid.length) {
    return <div className="loading">Loading recommendations...</div>;
  }

  // Render recommended videos
  return (
    <div className="Recommended">
      {sideVid.map((item) => (
        <div key={item.id} className="side-video">
          <img
            src={item.snippet?.thumbnails?.medium?.url || sarah}
            alt={item.snippet?.title || "Video Thumbnail"}
          />
          <div className="side-vid-details">
            <h3>{item.snippet?.title || "Video Title"}</h3>
            <span>
              <p>{item.snippet?.channelTitle || "Channel Name"}</p>
              <p>
                {valueConverter(item.statistics?.viewCount) || 0} views -{" "}
                {moment(item.snippet?.publishedAt).fromNow() || "Unknown date"}
              </p>
              {/* Display channel description if available */}
              <p>
                {channelInfo[item.snippet.channelId]?.description.slice(0,40) || "No channel description"}
              </p>
              <div>
              <img 
  src={channelInfo[item.snippet.channelId]?.thumbnails?.default?.url || sarah} 
  alt="channel-logo" 
  style={{
    height: "34px",
    width: "34px",
    borderRadius: "50%",
  }}
/>
              </div>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recommended;
