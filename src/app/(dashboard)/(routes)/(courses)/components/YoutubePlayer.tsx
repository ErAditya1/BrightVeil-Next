'use client'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Play, Pause, Volume2, VolumeX,  PlayCircle, PauseCircle } from 'lucide-react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { IoCheckmarkDoneCircleOutline, IoCheckmarkDoneCircleSharp } from 'react-icons/io5';
import { SlSpeedometer } from 'react-icons/sl';
import Duration from './Duration';
import { MdForward10, MdOutlineReplay10 } from 'react-icons/md';


// import { Slider } from '@headlessui/react';

interface CustomVideoPlayerProps {
  videoId: string;
  thumbnailUrl: string;
  title: string;
}



export default function CustomVideoPlayer ({ videoId, thumbnailUrl , title}:CustomVideoPlayerProps)  {
  
  useEffect(()=>{
    if(videoId){
      load(`https://www.youtube.com/watch?v=${videoId}`)
    }
  },[videoId])
  
  const [url, seturl] = useState('')
  const [pip, setpip] = useState(false)
  const [playing, setPlaying] = useState(false);
  const [controls, setControls] = useState(true);
  const [light, setLight] = useState(thumbnailUrl);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [isVolume, setIsVolume] = useState(false);
  const [isSpeed, setIsSpeed] = useState(false);
  const [ready, setReady] = useState(false);

  const playerRef = useRef<ReactPlayer>(null);
  
  const handle = useFullScreenHandle();
  

  

  const load = (url:string) => {
    seturl(url);
    setPlayed(0);
    setLoaded(0);
    setpip(false)

  }

    // Function to show controls
    const showControls = useCallback(() => {
      setControls(true);
      resetHideTimeout();
    }, []);
  
    // Function to hide controls after a timeout
    const hideControls = useCallback(() => {
      setControls(false);
    }, []);
  
    // Timeout reference
    const hideTimeout = useRef<NodeJS.Timeout | null>(null);
  
    // Function to reset the hide timeout
    const resetHideTimeout = useCallback(() => {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }
      hideTimeout.current = setTimeout(hideControls, 3000); // Hide after 3 seconds of inactivity
    }, [hideControls]);
  
    useEffect(() => {
      resetHideTimeout();
  
      return () => {
        if (hideTimeout.current) {
          clearTimeout(hideTimeout.current);
        }
      };
    }, [resetHideTimeout]);
    

  const handlePlayPause = () => {
    setPlaying(!playing);
  };



  const handleToggleLoop = () => {
    setLoop(!loop);
  };

  const handleVolumeChange = (e:any) => {
    setVolume(  parseFloat(e.target.value) );
  };

  const handleMuteUnmute = () => {
    setMuted(!muted);
  };

  const handleSetPlaybackRate = (e:any) => {
     setPlaybackRate(parseFloat(e.target.value) );
  };

  const handleOnPlaybackRateChange = (speed:any) => {
    setPlaybackRate( parseFloat(speed) );
  };

  const handleTogglePIP = () => {
    setpip(!pip)
  };

  const handlePlay = () => {
   
    setPlaying(true)
  };

  const handleEnablePIP = () => {
    setpip(true)
  };

  const handleDisablePIP = () => {
    setpip(false)
  };

  const handlePause = () => {
    setPlaying(false)
  };

  const handleSeekMouseDown = () => {
    setSeeking(true)
  };

  const handleSeekChange = (e:any) => {
    setPlayed(parseFloat(e.target.value))
    
  };
  const handleSeekFarword = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10);
  }
  const handleSeekReverse = () => {
    playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10);
  }

  const handleSeekMouseUp = (e:any) => {
    setSeeking(false)
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    if (playerRef.current) {
      playerRef.current.seekTo(newPlayed);
    }
  };

  const handleProgress = (state:any) => {
    (progress: { played: number }) => setPlayed(progress.played)
    if (!seeking) {
      setLoaded(state.loaded);
      setPlayed(state.played);
      
      // setState(state);

    }
  };

  const handleEnded = () => {
    console.log("onEnded");
    setPlaying (loop );
  };

  const handleDuration = (duration:any) => {
    console.log("onDuration", duration);
    setDuration( duration );
  };

  const handleFullscreen = () => handle.active ? handle.exit() : handle.enter();

 


  

  // const handleProgress = (progress: { played: number }) => setPlayed(progress.played);

  return (
    <div
        className="h-full w-full relative select-none  "
        
      >
        <section className="section h-full w-full  lex justify-center items-center relative">
          <div className="player-wrapper h-full w-full relative flex justify-center items-center">
            <ReactPlayer
              ref={playerRef}
              className="react-player rounded-lg"
              width="100%"
              height="100%"
              url={url}
              pip={pip}
              playing={playing}
              controls={false}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => { 
                setReady(true)
                setPlaying(true)
                console.log("onReady")}}
              onStart={() => {
                showControls()
                console.log("onStart")

              }}
              onPlay={handlePlay}
              onEnablePIP={handleEnablePIP}
              onDisablePIP={handleDisablePIP}
              onPause={handlePause}
              onBuffer={() => console.log("onBuffer")}
              onPlaybackRateChange={handleOnPlaybackRateChange}
              onSeek={(e) => console.log("onSeek", e)}
              onEnded={handleEnded}
              onError={(e) => console.log("onError", e)}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onPlaybackQualityChange={(e:any) =>
                console.log("onPlaybackQualityChange", e)
              }
              
            />

          </div>
        </section>

        <div className={`${!ready && 'hidden'} absolute  top-0 w-full h-full select-none  `}
          onMouseMove={showControls}
          onClick={showControls}
        >
          <div
            className={`w-full h-full select-none  ${!controls && "hidden duration-1000"}`}
          >
            <div className="w-full   h-full flex justify-center items-center  select-none">
              {/* previous */}

              <div
                className="h-full w-full flex justify-center items-center"
                onDoubleClick={handleSeekReverse}
              >
                <button
                  className=" text-2xl z-20 cursor-pointer "
                  onClick={handleSeekReverse}
                >
                  <MdOutlineReplay10 size={40} />
                </button>
              </div>

              {/* play pause */}

              <div
                className=" h-full w-full flex justify-center items-center"
                onDoubleClick={handleFullscreen}
                onClick={handlePlayPause}
              >
                <button
                  className=" text-2xl z-20 cursor-pointer "
                  onClick={handlePlayPause}
                >
                  {playing ? (
                    <PauseCircle size={45} />
                  ) : (
                    <PlayCircle size={45} />
                  )}
                </button>
              </div>

              {/* Skipped Right */}
              <div
                className=" h-full w-full flex justify-center items-center"
                onDoubleClick={handleSeekFarword}
              >
                <button
                  className=" text-2xl z-20 cursor-pointer "
                  onClick={handleSeekFarword}
                >
                  <MdForward10 size={40} />
                </button>
              </div>
            </div>
            <div
              className="w-full h-17  absolute bg-card"
              style={{ bottom: 0 }}
            >
              <div className="w-full h-full flex justify-center items-center flex-col p-2">
                <input
                  type="range"
                  min={0}
                  max={0.999999}
                  step="any"
                  value={played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  className="w-full top-2 m-2 h-1 "
                />
                <div className="w-full h-7 flex flex-row items-center justify-left">
                  <span className="mr-2">
                    <Duration seconds={duration * played} /> /{" "}
                    <Duration seconds={duration} />
                  </span>
                  <div
                    className="flex justify-between items-center "
                    onMouseEnter={() => {
                      setIsVolume(true);
                    }}
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setIsVolume(false)
                      }, 500)
                    }
                  >
                    <button
                      className="cursor-pointer  mx-2"
                      onClick={handleMuteUnmute}
                    >
                      {!muted ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="any"
                      value={volume}
                      onChange={handleVolumeChange}
                      className={`h-1 mr-2 w-16 ${!isVolume && "hidden"}`}
                    />
                  </div>
                  <div
                    className="flex justify-between items-center "
                    onMouseEnter={() => {
                      // this.setState({ isSpeed: true });
                      setIsSpeed(true);
                    }}
                    onMouseLeave={() =>
                      setTimeout(() => {
                        // this.setState({ isSpeed: false });
                        setIsSpeed(false)
                      }, 500)
                    }
                  >
                    <button className="cursor-pointer mx-2">
                      <SlSpeedometer size={20} />
                    </button>
                    <input
                      type="range"
                      min={0.25}
                      max={2}
                      step={0.25}
                      value={playbackRate}
                      onChange={handleSetPlaybackRate}
                      className={`h-1 mr-2 w-20 ${!isSpeed && "hidden"}`}
                    />
                    <span>{playbackRate.toFixed(2)}x</span>
                  </div>
                  <div className="flex justify-between items-center ">
                  <button className="cursor-pointer  mx-2">
                    {false ? (
                      <IoCheckmarkDoneCircleSharp size={25} />
                    ) : (
                      <IoCheckmarkDoneCircleOutline size={25} />
                    )}
                  </button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
