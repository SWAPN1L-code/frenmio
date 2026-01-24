import { FC, useEffect, useRef, useState } from 'react'
import fscreen from 'fscreen'
import Header from './header'
import CreateMeeting from './create'
import JoinMeeting from './join'
import {
  useLocalState,
  startMediaDevice,
  stopMediaDevice,
  dummyAudioDevice,
  dummyVideoDevice,
} from '../state'

const Landing: FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showSetup, setShowSetup] = useState(false)

  const [
    userStream,
    currentMicId,
    currentCameraId,
    audioDevices,
    videoDevices,
  ] = useLocalState(state => [
    state.userStream,
    state.currentMicId,
    state.currentCameraId,
    state.audioDevices,
    state.videoDevices,
  ])

  useEffect(() => {
    if (fscreen.fullscreenElement) fscreen.exitFullscreen()
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = userStream
    }
  }, [userStream])

  const toggleMic = async () => {
    if (currentMicId) {
      const device = audioDevices.find(d => d.deviceId === currentMicId)
      if (device) stopMediaDevice(device)
      else stopMediaDevice(dummyAudioDevice)
    } else {
      await startMediaDevice(audioDevices[0] || dummyAudioDevice)
    }
  }

  const toggleCam = async () => {
    if (currentCameraId) {
      const device = videoDevices.find(d => d.deviceId === currentCameraId)
      if (device) stopMediaDevice(device)
      else stopMediaDevice(dummyVideoDevice)
    } else {
      await startMediaDevice(videoDevices[0] || dummyVideoDevice)
    }
  }

  const changeAudioInput = async (deviceId: string) => {
    if (currentMicId) {
      const oldDevice = audioDevices.find(d => d.deviceId === currentMicId)
      if (oldDevice) stopMediaDevice(oldDevice)
    }
    const newDevice = audioDevices.find(d => d.deviceId === deviceId)
    if (newDevice) await startMediaDevice(newDevice)
  }

  const changeVideoInput = async (deviceId: string) => {
    if (currentCameraId) {
      const oldDevice = videoDevices.find(d => d.deviceId === currentCameraId)
      if (oldDevice) stopMediaDevice(oldDevice)
    }
    const newDevice = videoDevices.find(d => d.deviceId === deviceId)
    if (newDevice) await startMediaDevice(newDevice)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark text-accent-brown dark:text-background-light transition-colors duration-300 font-sans overflow-hidden">
      <div className="aspect-[16/9] max-h-screen w-full flex flex-col relative mx-auto">
        <Header />

        <main className="flex-grow flex items-center px-16 pb-12 overflow-hidden">
          <div className="grid grid-cols-12 gap-16 w-full items-center">
            {/* Left Column (Hero) */}
            <div className="col-span-6 flex flex-col justify-center space-y-12">
              <div className="space-y-8">
                <div className="inline-flex items-center px-6 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-[0.2em] uppercase">
                  Purely Peer-to-Peer
                </div>
                <h1 className="text-[6.5rem] leading-[0.9] font-bold tracking-tighter text-accent-brown dark:text-white font-display">
                  Connect <br />
                  <span className="text-primary italic font-medium">Naturally.</span>
                </h1>
                <p className="text-2xl opacity-70 font-light leading-relaxed max-w-xl">
                  Meetings shouldn't feel cold. Experience crystal clear video in a
                  space designed for warmth, privacy, and genuine human connection.
                </p>
              </div>

              <div className="flex flex-col space-y-10">
                <div className="flex items-center space-x-12">
                  <div className="flex items-center space-x-4">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      verified_user
                    </span>
                    <span className="text-base font-semibold opacity-80">
                      E2E Encrypted
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="material-symbols-outlined text-primary text-4xl">
                      eco
                    </span>
                    <span className="text-base font-semibold opacity-80">
                      Eco-friendly
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="w-14 h-14 rounded-full border-4 border-background-light dark:border-background-dark bg-muted-beige flex items-center justify-center text-xs font-bold text-accent-brown"
                      >
                        {/* Avatar */}
                      </div>
                    ))}
                    <div className="w-14 h-14 rounded-full border-4 border-background-light dark:border-background-dark bg-muted-beige flex items-center justify-center text-xs font-bold text-accent-brown/60">
                      +12k
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-bold tracking-wide text-accent-brown dark:text-white/80 uppercase">
                      Trusted Globally
                    </p>
                    <p className="text-xs opacity-50 font-medium">
                      Used by teams at the world's best studios
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Card) */}
            <div className="col-span-6 flex justify-end">
              <div className="bg-white dark:bg-white/5 p-10 rounded-2xl shadow-[0_40px_100px_-12px_rgba(163,92,59,0.12)] border border-white dark:border-white/10 backdrop-blur-md w-full max-w-[560px]">
                {/* Video Preview */}
                <div className="relative rounded-xl overflow-hidden bg-muted-beige dark:bg-accent-brown aspect-video mb-10 group shadow-inner">
                  {currentCameraId ? (
                    <video
                      key={currentCameraId}
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-cover transform scale-x-[-1]"
                    />
                  ) : (
                    <img
                      alt="Camera preview"
                      className="w-full h-full object-cover grayscale-[20%] opacity-90 transition-transform duration-700 group-hover:scale-105"
                      src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                  {/* Controls Overlay */}
                  <div className="absolute top-4 right-4 flex space-x-2.5 z-20">
                    {/* Setup Trigger */}
                    <div className="relative">
                      <button
                        onClick={() => setShowSetup(!showSetup)}
                        className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/80 transition-all active:scale-95"
                      >
                        <span className="material-symbols-outlined text-xl">settings</span>
                      </button>
                      {showSetup && (
                        <div className="absolute top-full mt-2 right-0 p-4 bg-white dark:bg-[#1A1614] rounded-xl shadow-2xl border border-muted-beige dark:border-white/10 z-50 text-left space-y-4 w-56">
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold uppercase text-primary">Microphone</label>
                            <select
                              className="w-full text-xs p-2 rounded-lg bg-muted-beige/50 border-none truncate"
                              value={currentMicId || ''}
                              onChange={(e) => changeAudioInput(e.target.value)}
                            >
                              {audioDevices.map(d => (
                                <option key={d.deviceId} value={d.deviceId}>{d.label || 'Default Mic'}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[9px] font-bold uppercase text-primary">Camera</label>
                            <select
                              className="w-full text-xs p-2 rounded-lg bg-muted-beige/50 border-none truncate"
                              value={currentCameraId || ''}
                              onChange={(e) => changeVideoInput(e.target.value)}
                            >
                              {videoDevices.map(d => (
                                <option key={d.deviceId} value={d.deviceId}>{d.label || 'Default Camera'}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={toggleMic}
                      className={`w-11 h-11 rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-all active:scale-95 ${!currentMicId ? 'bg-red-500' : 'bg-black/50 backdrop-blur-md'}`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {currentMicId ? 'mic' : 'mic_off'}
                      </span>
                    </button>
                    <button
                      onClick={toggleCam}
                      className={`w-11 h-11 rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-all active:scale-95 ${!currentCameraId ? 'bg-red-500' : 'bg-black/50 backdrop-blur-md'}`}
                    >
                      <span className="material-symbols-outlined text-xl">
                        {currentCameraId ? 'videocam' : 'videocam_off'}
                      </span>
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center space-x-3 px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md text-white text-[11px] font-bold tracking-widest uppercase">
                    <span className={`w-2 h-2 rounded-full ${currentCameraId ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
                    <span>{currentCameraId ? 'Live Preview' : 'Camera Off'}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Forms */}
                  <CreateMeeting />

                  <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-muted-beige dark:border-white/10"></div>
                    <span className="flex-shrink mx-6 text-[10px] font-bold opacity-30 tracking-[0.4em] uppercase">
                      OR
                    </span>
                    <div className="flex-grow border-t border-muted-beige dark:border-white/10"></div>
                  </div>

                  <JoinMeeting />
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="w-full px-16 py-10 flex justify-between items-center z-20 text-[11px] font-bold tracking-[0.2em] uppercase opacity-40 text-accent-brown dark:text-white">
          <div className="flex items-center space-x-4">
            <div className="px-2 py-1 bg-accent-brown dark:bg-white/20 rounded text-white dark:text-background-light text-[9px]">
              FN
            </div>
            <span>Frenmio © 2024 — Designed for Connection</span>
          </div>
          <div className="flex space-x-12">
            <a className="hover:text-primary transition-colors" href="#">
              Privacy
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Terms
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Status
            </a>
          </div>
        </footer>

        <div className="absolute bottom-10 right-10 z-50 pointer-events-none hidden lg:block">
          <div className="bg-white dark:bg-accent-brown px-6 py-3.5 rounded-full shadow-2xl flex items-center space-x-3 border border-muted-beige dark:border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.6)]"></span>
            <span className="text-[10px] font-bold opacity-70 tracking-widest uppercase text-accent-brown dark:text-white">
              P2P Network Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
