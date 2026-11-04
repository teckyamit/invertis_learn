"use client";

import React, { useState } from "react";
import {
  Play,
  ListVideo,
  ExternalLink,
  Video,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Tv
} from "lucide-react";

export interface VideoLectureItem {
  id: string;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  videoType: "INDIVIDUAL_VIDEO" | "PLAYLIST" | string;
  channelName: string;
  unitNumber?: number | null;
  topic?: string | null;
  description: string;
  pricingType: string;
}

interface VideoLecturesSectionProps {
  subjectCode: string;
  subjectName: string;
  videos: VideoLectureItem[];
}

export function VideoLecturesSection({
  subjectCode,
  subjectName,
  videos,
}: VideoLecturesSectionProps) {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string>("ALL");

  // Extract unique units
  const availableUnits = Array.from(
    new Set(videos.map((v) => v.unitNumber).filter(Boolean) as number[])
  ).sort((a, b) => a - b);

  const filteredVideos =
    selectedUnit === "ALL"
      ? videos
      : videos.filter((v) => String(v.unitNumber) === selectedUnit);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-rose-50 text-rose-700 rounded-xl">
            <Video className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Curated Video Lectures</h2>
            <p className="text-xs text-slate-500">
              Academic lecture playlists and verified video series aligned with syllabus units
            </p>
          </div>
        </div>

        {videos.length > 0 && (
          <span className="text-xs font-semibold px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded-lg">
            {videos.length} Lecture Series
          </span>
        )}
      </div>

      {/* When Verified Videos Exist */}
      {videos.length > 0 ? (
        <div className="space-y-6">
          {/* Unit Filter Pills (if multiple units have videos) */}
          {availableUnits.length > 1 && (
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedUnit("ALL")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                  selectedUnit === "ALL"
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Lectures ({videos.length})
              </button>
              {availableUnits.map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedUnit(String(u))}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                    selectedUnit === String(u)
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Unit {u} ({videos.filter((v) => v.unitNumber === u).length})
                </button>
              ))}
            </div>
          )}

          {/* Videos Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredVideos.map((video) => {
              const isPlaylist = video.videoType === "PLAYLIST";
              const isInlinePlaying = activeVideoId === video.id;

              // Build privacy-enhanced YouTube embed url
              const embedUrl = isPlaylist
                ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(
                    video.youtubeId
                  )}&autoplay=1&rel=0`
                : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                    video.youtubeId
                  )}?autoplay=1&rel=0`;

              return (
                <div
                  key={video.id}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  {/* Video Player / Poster Area */}
                  <div className="relative aspect-video bg-slate-950 w-full overflow-hidden">
                    {isInlinePlaying ? (
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative group">
                        {/* Type indicator badge */}
                        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm border border-white/10 flex items-center">
                            {isPlaylist ? (
                              <>
                                <ListVideo className="h-3 w-3 mr-1 text-rose-400" />
                                PLAYLIST
                              </>
                            ) : (
                              <>
                                <Tv className="h-3 w-3 mr-1 text-blue-400" />
                                LECTURE
                              </>
                            )}
                          </span>

                          {video.unitNumber && (
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600/80 text-white backdrop-blur-sm">
                              Unit {video.unitNumber}
                            </span>
                          )}
                        </div>

                        {/* Interactive Play Button */}
                        <button
                          onClick={() => setActiveVideoId(video.id)}
                          className="h-14 w-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition mb-3"
                          title="Click to play lecture directly"
                        >
                          <Play className="h-6 w-6 ml-1 fill-white" />
                        </button>

                        <h4 className="text-xs font-semibold text-white/95 max-w-sm line-clamp-2 px-2">
                          {video.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 mt-1">
                          Instructor / Channel: <strong>{video.channelName}</strong>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Video Meta Info */}
                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">
                          {video.channelName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded">
                          {video.pricingType}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {video.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>

                      {video.topic && (
                        <p className="text-[11px] text-slate-500 font-medium">
                          Focus: {video.topic}
                        </p>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setActiveVideoId(video.id)}
                        className="inline-flex items-center text-xs font-semibold text-rose-700 hover:text-rose-800"
                      >
                        <Play className="h-3.5 w-3.5 mr-1 fill-rose-700" />
                        {isInlinePlaying ? "Playing Now" : "Play Lecture"}
                      </button>

                      <a
                        href={video.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
                        title="Watch on official YouTube channel in a new tab"
                      >
                        Watch on YouTube
                        <ExternalLink className="h-3 w-3 ml-1 text-slate-400" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* MANDATORY INITIAL STATE: "Video Lectures Coming Soon"                     */
        /* ========================================================================= */
        <div className="p-8 md:p-10 text-center bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
          <div className="mx-auto w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center shadow-xs">
            <Video className="h-6 w-6" />
          </div>

          <h3 className="text-base font-bold text-slate-900">
            Video Lectures Coming Soon
          </h3>

          <p className="text-xs text-slate-600 max-w-lg mx-auto leading-relaxed">
            Curated video lecture series and university playlist recommendations for{" "}
            <strong>{subjectCode}</strong> ({subjectName}) are currently being reviewed
            and mapped against each syllabus unit.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-1" />
              NPTEL / SWAYAM Mappings
            </span>
            <span>•</span>
            <span className="flex items-center">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 mr-1" />
              Verified University Channels
            </span>
            <span>•</span>
            <span>Zero Unverified Links</span>
          </div>
        </div>
      )}
    </div>
  );
}
