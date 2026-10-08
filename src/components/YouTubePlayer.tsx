import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Volume2,
  Maximize2,
  Sparkles,
  Loader2,
  Tv,
} from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  topic?: string;
  duration?: number;
  onComplete?: () => void;
  onUnavailable?: () => void;
  isCompleted?: boolean;
}

export const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
  topic,
  duration,
  onComplete,
  onUnavailable,
  isCompleted = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState<'idle' | 'playing' | 'paused' | 'ended'>('idle');
  const [watchProgressPercent, setWatchProgressPercent] = useState<number>(isCompleted ? 100 : 0);
  const [isCompletedState, setIsCompletedState] = useState<boolean>(isCompleted);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const progressIntervalRef = useRef<any>(null);

  // Sync internal completed state if prop changes
  useEffect(() => {
    if (isCompleted) {
      setIsCompletedState(true);
      setWatchProgressPercent(100);
    }
  }, [isCompleted]);

  // Reset states whenever videoId changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage(null);
    setPlayerState('idle');
    if (!isCompleted) {
      setWatchProgressPercent(0);
      setIsCompletedState(false);
    }

    if (!videoId || videoId.trim() === '') {
      setHasError(true);
      setErrorMessage('No verified video is currently available for this topic.');
      setIsLoading(false);
      return;
    }

    // Set up YouTube IFrame API script if not yet loaded
    let scriptTag = document.getElementById('youtube-iframe-api');
    if (!scriptTag) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (window.YT && window.YT.Player && iframeRef.current) {
        try {
          // Destroy previous player instance if any
          if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
            playerInstanceRef.current.destroy();
          }

          playerInstanceRef.current = new window.YT.Player(iframeRef.current, {
            events: {
              onReady: () => {
                setIsLoading(false);
              },
              onStateChange: (event: any) => {
                // YT.PlayerState: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (video cued)
                if (event.data === 1) {
                  setPlayerState('playing');
                  // Start progress tracking
                  startProgressTracking();
                } else if (event.data === 2) {
                  setPlayerState('paused');
                  stopProgressTracking();
                } else if (event.data === 0) {
                  // Video finished!
                  setPlayerState('ended');
                  stopProgressTracking();
                  handleMarkCompleted();
                }
              },
              onError: (event: any) => {
                // 101 or 150 = The owner of the requested video does not allow it to be played in embedded players.
                // 100 = Video requested not found.
                // 2 = Invalid parameter.
                console.warn('YouTube Player error code:', event.data);
                setHasError(true);
                setErrorMessage('This video is currently unavailable.');
                setIsLoading(false);
                if (onUnavailable) {
                  onUnavailable();
                }
              },
            },
          });
        } catch (err) {
          console.warn('YT.Player initialization note:', err);
          setIsLoading(false);
        }
      }
    };

    if (window.YT && window.YT.Player) {
      // Small timeout to allow iframe DOM rendering
      const timer = setTimeout(initPlayer, 400);
      return () => clearTimeout(timer);
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };
    }

    return () => {
      stopProgressTracking();
      if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
        try {
          playerInstanceRef.current.destroy();
        } catch {}
      }
    };
  }, [videoId]);

  const startProgressTracking = () => {
    stopProgressTracking();
    progressIntervalRef.current = setInterval(() => {
      if (playerInstanceRef.current && typeof playerInstanceRef.current.getCurrentTime === 'function') {
        try {
          const currentTime = playerInstanceRef.current.getCurrentTime();
          const totalDuration = playerInstanceRef.current.getDuration();
          if (totalDuration > 0) {
            const pct = Math.min(100, Math.round((currentTime / totalDuration) * 100));
            setWatchProgressPercent((prev) => Math.max(prev, pct));
            // If watched over 75%, automatically consider video completed if not already marked
            if (pct >= 75 && !isCompletedState) {
              handleMarkCompleted();
            }
          }
        } catch {}
      }
    }, 2000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleMarkCompleted = () => {
    if (!isCompletedState) {
      setIsCompletedState(true);
      setWatchProgressPercent(100);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleIframeLoaded = () => {
    // If API ready didn't trigger, ensure loading state clears
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // If there's an error or unavailable video
  if (hasError || !videoId) {
    return (
      <div className="w-full rounded-2xl sm:rounded-3xl border border-rose-200 dark:border-rose-900/50 bg-[#0F1D38] p-6 sm:p-8 text-center text-white space-y-4 shadow-md">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-rose-200">
            {errorMessage || 'This video is currently unavailable.'}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
            {topic
              ? `We could not embed this lesson video for "${topic}". You can switch to another verified educational lecture.`
              : 'The video could not be loaded into the player.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {onUnavailable && (
            <button
              onClick={onUnavailable}
              className="px-4 py-2.5 bg-[#F2B544] hover:bg-[#e0a433] text-[#14264A] text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Find Another Video</span>
            </button>
          )}

          {videoId && (
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Watch directly on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    );
  }

  // Valid YouTube video embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${encodeURIComponent(
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
  )}&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0B162C] rounded-2xl sm:rounded-3xl border border-[#1C2E52] overflow-hidden shadow-lg transition-all"
    >
      {/* Top Video Status & Title Bar */}
      <div className="px-4 py-2.5 bg-[#0F1D38] border-b border-[#1C2E52] flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 truncate">
          <span className="flex h-2 w-2 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                playerState === 'playing' ? 'bg-emerald-400' : 'bg-[#F2B544]'
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2 w-2 ${
                playerState === 'playing' ? 'bg-emerald-500' : 'bg-[#F2B544]'
              }`}
            />
          </span>
          <span className="font-extrabold text-[#F2B544] tracking-wider uppercase text-[10px]">
            YouTube Player
          </span>
          <span className="text-gray-400 text-[11px] hidden sm:inline">•</span>
          <span className="font-semibold text-gray-200 truncate text-[11px] sm:text-xs">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {duration && (
            <span className="px-2 py-0.5 rounded-md bg-black/40 text-gray-300 font-mono text-[10px]">
              {duration}m
            </span>
          )}

          <a
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Open on YouTube"
            className="p-1 text-gray-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleFullscreen}
            title="Toggle Fullscreen"
            className="p-1 text-gray-400 hover:text-white transition-colors cursor-pointer hidden sm:block"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Responsive Video Area */}
      <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Loading Spinner State */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0B1B36] text-white space-y-3">
            <Loader2 className="w-8 h-8 text-[#F2B544] animate-spin" />
            <p className="text-xs text-gray-300 font-medium">Connecting to YouTube Player...</p>
          </div>
        )}

        {/* Real YouTube IFrame Embed */}
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title={title}
          className="w-full h-full border-0 absolute inset-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleIframeLoaded}
        />
      </div>

      {/* Video Completion & Progress Bar */}
      <div className="p-3 sm:p-4 bg-[#0F1D38] border-t border-[#1C2E52] flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left: Progress info */}
        <div className="w-full sm:w-auto flex items-center gap-3">
          <div className="flex-1 sm:w-48 bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isCompletedState
                  ? 'bg-emerald-500'
                  : watchProgressPercent > 50
                  ? 'bg-[#F2B544]'
                  : 'bg-amber-400'
              }`}
              style={{ width: `${watchProgressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-gray-300 font-mono whitespace-nowrap">
            {isCompletedState ? '100% Watched' : `${watchProgressPercent}% Watched`}
          </span>
        </div>

        {/* Right: Completion status & action */}
        <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-2">
          {isCompletedState ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lesson Completed (+20 XP)</span>
            </div>
          ) : (
            <button
              onClick={handleMarkCompleted}
              className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-[#F2B544] to-[#f4c265] hover:from-[#e0a433] hover:to-[#eeb755] text-[#14264A] text-xs font-black rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-[#14264A]" />
              <span>Mark Lesson Complete (+20 XP)</span>
            </button>
          )}

          {onUnavailable && (
            <button
              onClick={onUnavailable}
              title="Switch to another verified lecture on this topic"
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-gray-700 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Alternative Video</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
