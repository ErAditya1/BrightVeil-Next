'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Play, Pause, Volume2, VolumeX, PlayCircle, PauseCircle, ChevronRightIcon } from 'lucide-react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { IoSettings } from 'react-icons/io5';

import Duration from './Duration';
import { MdForward10, MdOutlineClose, MdOutlineLoop, MdOutlinePictureInPicture, MdOutlinePictureInPictureAlt, MdOutlineReplay10 } from 'react-icons/md';
import ValidatedImage from '@/components/ValidatedImage';
import { BsFillPipFill, BsFullscreen, BsFullscreenExit, BsPip } from 'react-icons/bs';
import { Divider } from '@mui/joy';
import Image from 'next/image';

interface CustomVideoPlayerProps {
  videoId: string | string[];
  thumbnailUrl: string;
  title: string;
}

export default function CustomVideoPlayer({ videoId, thumbnailUrl, title }: CustomVideoPlayerProps) {
  useEffect(() => {
    if (videoId) load(`https://www.youtube.com/watch?v=${videoId}`);
    setThumbnail(thumbnailUrl);
  }, [videoId]);
  useEffect(() => {

    setThumbnail(thumbnailUrl);
  }, [videoId, thumbnailUrl]);

  const [url, setUrl] = useState('');
  const [start, setStart] = useState(false);
  const [pip, setPip] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [controls, setControls] = useState(true);
  const [thumbnail, setThumbnail] = useState(thumbnailUrl);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [loop, setLoop] = useState(true);
  const [seeking, setSeeking] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isQuality, setIsQuality] = useState(false);
  const [isSpeed, setIsSpeed] = useState(false);
  const [ready, setReady] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('')
  const [qualityLevels, setQualityLevels] = useState([''])

  const playerRef = useRef<ReactPlayer>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handle = useFullScreenHandle();
  const hideTimeout = useRef<NodeJS.Timeout | null>(null);

  const load = (url: string) => {
    setUrl(url);
    setPlayed(0);
    setLoaded(0);
    setPip(false);
  };



  const showControls = useCallback(() => {

    setControls(true);
    resetHideTimeout();
    

  }, []);

  const hideControls = useCallback(() => {
    setControls(false);
  }, []);

  const handleSetting = () => {
    setIsSetting(!isSetting)
    setIsQuality(false)
    setIsSpeed(false)
  }

  const resetHideTimeout = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(hideControls, 3000);
  }, [hideControls]);

  useEffect(() => {
    resetHideTimeout();
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [resetHideTimeout]);
  
  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsSetting(false)
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleReady = () => {
    setReady(true);
    if (playerRef.current) {
      const iframe = playerRef.current.getInternalPlayer(); // Access YouTube iframe
      const availableQualities = iframe.getAvailableQualityLevels(); // Fetch quality levels
      setQualityLevels(availableQualities);
      console.log(availableQualities)
    }
  };
  const handlePlayPause = () => {
    handleReady()
    setStart(true)
    setPlaying((prev) => !prev)
  };
  const handleToggleLoop = () => setLoop((prev) => !prev);
  const handleMuteUnmute = () => setMuted((prev) => !prev);
  const handleTogglePIP = () => setPip((prev) => !prev);
  const handleQualityChange = (quality: string) => {
    if (playerRef.current) {
      const iframe = playerRef.current.getInternalPlayer(); // Access YouTube iframe
      iframe.setPlaybackQuality(quality); // Set selected quality
      setSelectedQuality(quality);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => setPlayed(parseFloat(e.target.value));
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => setVolume(parseFloat(e.target.value));
  const handleSetPlaybackRate = (value: number) => setPlaybackRate(value);
  const handleDuration = (duration: any) => {
    console.log("onDuration", duration);
    setDuration(duration);
  };
  const handleFullscreen = () => {
    setFullScreen(!fullscreen)
    handle.active ? handle.exit() : handle.enter()
  };

  const handleSeekFarword = () => playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10);
  const handleSeekReverse = () => playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10);

  const handleProgress = (state: { loaded: number; played: number }) => {
    if (!seeking) {
      setLoaded(state.loaded);
      setPlayed(state.played);
    }
  };

  const handleSeekTouchStart = () => {
    setSeeking(true);
  };

  const handleSeekTouchMove = (e: React.TouchEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.currentTarget.value);
    setPlayed(newValue);
  };

  const handleSeekTouchEnd = (e: React.TouchEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.currentTarget.value);
    setSeeking(false);
    setPlayed(newValue);
    if (playerRef.current) {
      playerRef.current.seekTo(newValue);
    }
  };

  const handleEnded = () => setPlaying(loop);



  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          handleSeekFarword();
          break;
        case 'ArrowLeft':
          handleSeekReverse();
          break;
        case ' ':
          handlePlayPause();
          break;
        case 'f':
          handleFullscreen();
          break;
        case 'm':
          handleMuteUnmute();
          break;
        case 'ArrowUp':
          setVolume((prev) => Math.min(prev + 0.1, 1));
          break;
        case 'ArrowDown':
          setVolume((prev) => Math.max(prev - 0.1, 0));
          break;
        case 'p':
          handleTogglePIP();
          break;
        case 'r':
          setPlaying(true);
          break;
        case 'Escape':
          setPip(false);
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <FullScreen handle={handle} className={`h-full w-full relative select-none ${fullscreen && "-rotate-90"} sm:rotate-0`}>
      <div onMouseMove={showControls} onClick={showControls} className='h-full w-full'>
        <section className="section h-full w-full flex justify-center items-center relative">
          <div className="player-wrapper h-full w-full relative flex justify-center items-center">

            <ReactPlayer
              ref={playerRef}
              className="react-player rounded-lg p-0"
              width="100%"
              height="100%"
              url={url}
              pip={pip}
              playing={playing}
              controls={false}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={handleReady}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onProgress={handleProgress}
              onDuration={handleDuration}
              onEnded={handleEnded}
            />
            {thumbnail && !start &&
              <Image
                src={thumbnail}
                alt={title}
                height={500}
                width={500}
                className="object-cover rounded-lg shadow-2xl cursor-pointer absolute w-full h-full"

              />

            }

          </div>
        </section>
        <div className={`${!ready && 'hidden'} absolute top-0 w-full h-full select-none`} onMouseMove={showControls} onClick={showControls}>
          <div className={`w-full h-full ${!controls && 'hidden duration-1000'}`}>
            <div className="w-full h-full flex justify-evenly  items-center">
              <button className="text-2xl mx-2 cursor-pointer" onClick={handleSeekReverse}>
                <MdOutlineReplay10 size={40} />
              </button>
              <button className="text-2xl mx-2 cursor-pointer" onClick={handlePlayPause}>
                {playing ? <PauseCircle size={45} /> : <PlayCircle size={45} />}
              </button>
              <button className="text-2xl mx-2 cursor-pointer" onClick={handleSeekFarword}>
                <MdForward10 size={40} />
              </button>
            </div>
            <div className="w-full h-17 absolute bg-card" style={{ bottom: 0 }}>
            <div className='px-2 '>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step="any"
                  value={played}
                  onMouseDown={() => setSeeking(true)}
                  onChange={handleSeekChange}

                  onTouchStart={handleSeekTouchStart}
                  onTouchMove={handleSeekTouchMove}
                  onTouchEnd={handleSeekTouchEnd}
                  onMouseUp={(e: any) => {
                    setSeeking(false);
                    playerRef.current?.seekTo(parseFloat(e.target.value));
                  }}
                  className="w-full  h-1"
                />
               
              </div>
              <div className="w-full h-8 flex items-center justify-between px-2  relative">
                <div className='flex flex-row items-center'>
                  <span className="mr-2 text-xs">
                    <Duration seconds={duration * played} /> / <Duration seconds={duration} />
                  </span>
                  <div className="relative mx-2 flex flex-row items-center gap-2">
                    <button onClick={handleMuteUnmute}>{!muted ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
                    <div className="  flex justify-center items-center ">
                      <input type="range" min={0} max={1} step="any" value={volume} onChange={handleVolumeChange} className="w-24 h-1 " />
                    </div>
                  </div>
                </div>
                <div className="right-4 flex  gap-3 justify-center items-center">
                  {isSetting &&
                    <div className="w-48 border bg-background absolute bottom-12 right-0 p-2 mr-4 rounded-lg" ref={dropdownRef}>
                      <div className="flex justify-between items-center w-full relative py-2 ">
                        <p>Settings</p>
                        <button onClick={() => setIsSetting(false)} className="text-2xl right-2 absolute ">
                          <MdOutlineClose size={20} className='border rounded' />
                        </button>
                        <hr />
                      </div>
                      {isSpeed || isQuality ?
                        <div className='flex gap-2 flex-col'>
                          {
                            isSpeed && (
                              [0.25, 0.50, 1, 1.5, 1.75, 2].map((item, index) => (
                                <div >
                                  <button
                                    key={index}
                                    onClick={() => handleSetPlaybackRate(item)}
                                    className={`text-md w-full ${playbackRate == item ? 'font-semibold border rounded' : ''}`}
                                  >
                                    {item ===1 ? 'Normal' : `${item}x`}
                                  </button>
                                </div>
                              ))
                            )

                          }
                          {
                            isQuality && (
                              qualityLevels?.map((item: any, index) => (
                                <div >
                                  <button
                                    key={index}
                                    onClick={() => handleQualityChange(item)}
                                    className={`text-md  ${selectedQuality === item ? 'font-semibold text-lg text-green-600 ' : ''}`}

                                  >
                                    {item}
                                  </button>
                                </div>
                              ))
                            )
                          }
                        </div>
                        :
                        <div>
                          <div className="flex justify-between items-center w-full relative py-1" onClick={() => setIsSpeed(!isSpeed)}>

                            <p>Speed</p>
                            <button className="text-2xl">
                              <ChevronRightIcon size={20} className='right-2 absolute' />
                            </button>

                            <Divider />
                          </div>
                          {
                            qualityLevels.length > 0 &&
                            <div className="flex justify-between items-center w-full relative py-1 " onClick={() => setIsQuality(!isQuality)}>
                              <p>Quality</p>
                              <button className="text-2xl right-0">
                                <ChevronRightIcon size={20} className='right-2 absolute' />

                              </button>

                              <Divider />
                            </div>
                          }
                        </div>
                      }

                    </div>
                  }

                  <button onClick={handleSetting} className=''>
                    <IoSettings size={20} />
                  </button>
                  <button onClick={handleTogglePIP} className=''>
                    
                    {!pip ? <BsPip size={20} /> : <BsFillPipFill size={20} />}
                  </button>
                  <button onClick={handleFullscreen} className=''>
                    {fullscreen ? <BsFullscreenExit size={20} /> : <BsFullscreen size={16} />}
                  </button>
                  

                </div>


              </div>
             
            </div>
          </div>
        </div>
      </div>
    </FullScreen>
  );
}
