import React, { useState, useEffect, useRef } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  ExternalLink,
  Maximize2,
  Sparkles,
  Loader2,
} from 'lucide-react';

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
  const timerRef = useRef<any>(null);

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

    // Safety timeout to dismiss loading spinner if iframe load event takes long
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearTimeout(fallbackTimer);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [videoId, isCompleted]);

  // Listen to postMessage from YouTube IFrame
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('youtube.com')) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data && data.event === 'onStateChange') {
          // YT.PlayerState: 1 = playing, 2 = paused, 0 = ended
          if (data.info === 1) {
            setPlayerState('playing');
          } else if (data.info === 2) {
            setPlayerState('paused');
          } else if (data.info === 0) {
            setPlayerState('ended');
            handleMarkCompleted();
          }
        }
      } catch {
        // Not a JSON message, ignore
      }
    };

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
    setIsLoading(false);
    // Tell YouTube iframe to enable postMessage events
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'listening' }),
          '*'
        );
      } catch {
        // Cross-origin safe
      }
    }
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

  // Valid YouTube video embed URL with HTML5 iframe embed
  const embedUrl = `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1`;

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
            <p className="text-xs text-gray-300 font-medium">Loading YouTube Video...</p>
          </div>
        )}

        {/* Real Native YouTube IFrame Embed */}
        <iframe
          key={videoId}
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
