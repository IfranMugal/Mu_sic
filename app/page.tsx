"use client";
import { useEffect, useRef } from "react";
import { Appbar } from "./components/Appbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session.data?.user){
      router.push("/dashboard")
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "scale-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "scale-90", "translate-y-10");
          } else {
            // reverse when out of view
            entry.target.classList.remove("opacity-100", "scale-100", "translate-y-0");
            entry.target.classList.add("opacity-0", "scale-90", "translate-y-10");
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [session]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-800 to-blue-900 text-white">
      <Appbar />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* Hero */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="text-6xl">🎵</div>
          <h1 className="text-5xl font-extrabold tracking-wide">
            <span className="text-purple-300">Your Music,</span>{" "}
            <span className="text-pink-300">Your Crowd,</span>{" "}
            <span className="text-blue-300">Your Vibe</span>
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">
            Start a stream, let your friends and fans add songs, and upvote to
            play them earlier. Bajaoo makes music a shared experience.
          </p>
          
        </div>

        <div className="grid md:grid-cols-3 gap-8 p-10">
          {[
            {
              title: "🎙 Start a Stream",
              color: "text-purple-200",
              text: "Host your own music stream instantly. Share your vibe with anyone, anywhere."
            },
            {
              title: "🎵 Add Songs",
              color: "text-pink-200",
              text: "Your audience can suggest and add songs in real time to keep the vibe alive."
            },
            {
              title: "⬆ Upvote Favorites",
              color: "text-blue-200",
              text: "Songs with more upvotes move up the queue, so the crowd decides what plays next."
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm hover:scale-105 hover:bg-white/20 transition-transform duration-300 ease-out"
            >
              <h2 className={`text-2xl font-bold mb-3 ${feature.color}`}>{feature.title}</h2>
              <p className="text-gray-200">{feature.text}</p>
            </div>
          ))}
        </div>

        <div
          ref={(el) => {
            if (el) sectionsRef.current[0] = el;
          }}
          className="transform transition-all duration-700 ease-out opacity-0 scale-90 translate-y-10"
        >
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Create Your Room", desc: "Start your stream in one click and share the link." },
              { step: "2", title: "Invite Friends", desc: "Send the link so friends and fans can join instantly." },
              { step: "3", title: "Enjoy Together", desc: "Add, upvote, and enjoy the crowd-powered playlist." }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-2xl p-6 text-center shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300 ease-out"
              >
                <div className="text-4xl font-bold text-purple-200 mb-2">{item.step}</div>
                <h3 className="text-xl font-semibold text-blue-200">{item.title}</h3>
                <p className="text-gray-200 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={(el) => {
            if (el) sectionsRef.current[1] = el;
          }}
          className="transform transition-all duration-700 ease-out opacity-0 scale-90 translate-y-10"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Why People Love Bajaoo</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Makes parties more fun with collaborative playlists.",
              "Super easy to join — no friction.",
              "The crowd decides what plays next."
            ].map((reason, idx) => (
              <div
                key={idx}
                className="bg-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300 ease-out"
              >
                <p className="text-gray-200">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
}
