import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import sarah from "../../../assets/sarah.webp";
import { API_KEY, valueConverter } from "../../../env";
import { useParams } from "react-router-dom";
import Recommended from "../../Recommned/Recommended";
import like from "../../../assets/thumb_up.png"
import dis_like from "../../../assets/thumb_down.png"
const PlayVideo = () => {
  const { videoId,categoryId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const [error, setError] = useState(null);

  // Fetch video data
  const fetchVideoData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setVideoData(result.items?.[0] || null);
    } catch (err) {
      console.error("Error fetching video info:", err);
      setError("Unable to load video information. Please try again later.");
    }
  };

  // Fetch channel data
  const fetchChannelData = async (channelId) => {
    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setChannelData(result.items?.[0] || null);
    } catch (err) {
      console.error("Error fetching channel data:", err);
    }
  };

  // Fetch comments data
  const fetchCommentData = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const result = await response.json();
      setCommentData(result.items || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Fetch video data when videoId changes
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  // Fetch channel and comments data when videoData is available
  useEffect(() => {
    if (videoData?.snippet?.channelId) {
      fetchChannelData(videoData.snippet.channelId);
      fetchCommentData();
    }
  }, [videoData]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!videoData) {
    return <div className="loading">Loading video...</div>;
  }

  return (
    <div className="play-video">
      <div className="main-content">
        {/* Video Player */}
        <div className="top">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={videoData.snippet.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <h3>{videoData.snippet.title}</h3>
        </div>

        {/* Video and Channel Info */}
        <div className="main-content-info">
          <div className="main-content-details">
            <div className="logo">
              <img
                src={channelData?.snippet?.thumbnails?.default?.url || sarah}
                alt={channelData?.snippet?.title || "Channel Logo"}
              />
              <div>
              <h3 className="channel-name">
                {channelData?.snippet?.title || "Channel Name"}
              </h3>
              <h4>{valueConverter(channelData?.statistics?.subscriberCount)} Subscribers</h4>
              </div>
              
            </div>
            <div className="like-section">
                 <img src={like} alt="like image" />
                 <img src={dis_like} alt="dis-like image" />
            </div>
          </div>
        </div>

        {/* Video Description */}
        <div className="vid-info-description">
          <p>
            {videoData.snippet.description
              ? `${videoData.snippet.description.slice(0, 140)}...`
              : "No description available."}
          </p>
        </div>

        {/* Comments Section */}
        <div className="comments">
          <h3>{videoData?.statistics?.commentCount} Comments</h3>
          <div className="comment-container">
            {commentData.length > 0 ? (
              commentData.map((comment, index) => (
                <div key={index} className="comment">
                  <img
                    src={
                      comment.snippet.topLevelComment.snippet.authorProfileImageUrl ||
                      sarah
                    }
                    className="logo"
                    alt="Author"
                  />
                  <div className="comment-details">
                    <h5>
                      {comment.snippet.topLevelComment.snippet.authorDisplayName}{" "}
                      <span>
                        {new Date(
                          comment.snippet.topLevelComment.snippet.publishedAt
                        ).toLocaleString()}
                      </span>
                    </h5>
                    <h4>{comment.snippet.topLevelComment.snippet.textDisplay}</h4>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </div>
      </div>
      <Recommended categoryId={categoryId}/>
    </div>
  );
};

export default PlayVideo;
