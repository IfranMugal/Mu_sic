"use client";
import { useState } from "react";

export default function Dashboard() {
  const [queue, setQueue] = useState([
    { id: 1, title: "Song One", votes: 0, thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg" },
    { id: 2, title: "Song Two", votes: 0, thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/0.jpg" },
    { id: 3, title: "Song Three", votes: 0, thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/0.jpg" },
  ]);
  const [url, setUrl] = useState("");

  const extractVideoId = (youtubeUrl: string) => {
    const match = youtubeUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
    return match ? match[1] : null;
  };

  const addToQueue = () => {
    if (!url.trim()) return;
    const videoId = extractVideoId(url) || "dQw4w9WgXcQ"; // fallback ID
    const thumbnail = `https://img.youtube.com/vi/${videoId}/0.jpg`;
    setQueue((prev) =>
      [...prev, { id: Date.now(), title: url, votes: 0, thumbnail }].sort(
        (a, b) => b.votes - a.votes
      )
    );
    setUrl("");
  };

  const vote = (id: number, delta: number) => {
    setQueue((prev) =>
      prev
        .map((song) =>
          song.id === id ? { ...song, votes: song.votes + delta } : song
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 via-30% to-pink-400 animate-gradient-x bg-[length:400%_400%] z-0"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Queue */}
          <div>
            {/* Add to Queue */}
            <div className="flex mb-6 gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter YouTube URL..."
                className="flex-1 px-4 py-2 rounded-lg text-black focus:outline-none"
              />
              <button
                onClick={addToQueue}
                className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600 transition"
              >
                Add to Queue
              </button>
            </div>

            {/* Queue List */}
            <div className="space-y-4">
              {queue.map((song) => (
                <div
                  key={song.id}
                  className="bg-white/10 p-3 rounded-lg flex items-center justify-between backdrop-blur-sm"
                >
                  {/* Thumbnail */}
                  <img
                    src={song.thumbnail}
                    alt={song.title}
                    className="w-20 h-14 rounded-md object-cover"
                  />

                  {/* Title */}
                  <span className="flex-1 ml-4">{song.title}</span>

                  {/* Voting */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => vote(song.id, 1)}
                      className="bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600"
                    >
                      ⬆
                    </button>
                    <span>{song.votes}</span>
                    <button
                      onClick={() => vote(song.id, -1)}
                      className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      ⬇
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Video */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">🎶 Now Playing</h2>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-64 rounded-lg"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Dummy Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Background Animation Style */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 18s ease infinite;
        }
      `}</style>
    </div>
  );
}
