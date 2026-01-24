import { useCallback, useState } from 'react'
import type { FC, FormEvent } from 'react'
import {
  IRoom,
  useCreateFormState,
  useLocalState,
  useRemoteState,
} from '../state'

const CreateMeeting: FC = () => {
  const [userNameError, setUserNameError] = useState('')

  const preferences = useLocalState(state => state.preferences)
  const socket = useRemoteState(state => state.socket)

  const { capacity, meetingName, userName, loading, error } =
    useCreateFormState()
  const setState = useCreateFormState.setState

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!userName.trim()) {
        setUserNameError('Please enter your name')
        return
      }

      // Sync name to preferences immediately before navigating/creating
      useLocalState.setState({
        preferences: {
          ...preferences,
          userName,
        },
      })

      if (loading) return

      setState({
        error: null,
        loading: true,
      })
      const room: IRoom = {
        id: '',
        name: meetingName,
        created_by: userName,
        opts: {
          capacity: parseInt(capacity) || 0,
        },
      }
      socket.emit('request:create_room', { room }, err => {
        if (err) {
          setState({
            error: err.message,
          })
        }
        setState({
          loading: false,
        })
      })

      useLocalState.setState({
        preferences: {
          ...preferences,
          userName,
          meetingName,
        },
      })
    },
    [loading, setState, meetingName, userName, capacity, socket, preferences],
  )

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white">Get Started</h2>
        <p className="text-sm opacity-50 mt-1.5 font-medium">Create or join a private room instantly</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <label className="absolute -top-2 left-4 px-2 bg-white dark:bg-[#25211f] text-[9px] font-bold text-primary uppercase tracking-[0.2em] z-10 transition-colors group-focus-within:text-accent-brown">Your Name</label>
            <input
              className={`w-full bg-muted-beige/40 dark:bg-white/5 border-0 rounded-xl py-4.5 px-6 text-base focus:ring-2 focus:ring-primary/40 placeholder:text-accent-brown/20 focus:outline-none ${userNameError ? 'ring-2 ring-red-400/50' : ''
                }`}
              value={userName}
              onChange={e => {
                setState({ userName: e.target.value })
                if (userNameError) setUserNameError('')
              }}
              placeholder="Alex Rivera"
              required
            />
          </div>
          <div className="relative group">
            <label className="absolute -top-2 left-4 px-2 bg-white dark:bg-[#25211f] text-[9px] font-bold text-primary uppercase tracking-[0.2em] z-10 transition-colors group-focus-within:text-accent-brown">Room Name</label>
            <input
              className="w-full bg-muted-beige/40 dark:bg-white/5 border-0 rounded-xl py-4.5 px-6 text-base focus:ring-2 focus:ring-primary/40 placeholder:text-accent-brown/20 focus:outline-none"
              value={meetingName}
              onChange={e => setState({ meetingName: e.target.value })}
              placeholder="Design Sync"
            />
          </div>
        </div>

        {/* Capacity Hidden Input fallback or visual if needed */}
        <input type="hidden" value={capacity} />

        {userNameError && (
          <p className="text-xs text-red-500 text-center">{userNameError}</p>
        )}
        {error && <div className="text-sm text-red-500 text-center">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-xl shadow-xl shadow-primary/25 transition-all active:scale-[0.98] text-lg"
        >
          {loading && (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 inline-block" />
          )}
          Create Meeting
        </button>
      </form>
    </div>
  )
}

export default CreateMeeting
