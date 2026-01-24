import { useCallback, useState } from 'react'
import type { FormEvent, FC } from 'react'
import { useJoinFormState, useLocalState, useRemoteState } from '../state'

interface JoinProps { }

const JoinMeeting: FC<JoinProps> = () => {
  const [userNameError, setUserNameError] = useState('')

  const [socket] = useRemoteState(state => [state.socket])
  const [preferences] = useLocalState(state => [state.preferences])

  const { loading, error, userName, roomId } = useJoinFormState()
  const setState = useJoinFormState.setState

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      let finalUserName = userName
      // Fallback to preferences if local name is empty (since we might hide the input)
      if (!finalUserName && preferences.userName) {
        finalUserName = preferences.userName
      }

      if (!finalUserName.trim()) {
        // If still empty, we technically can't join. 
        // In the specific design case where we hide the input, this is a risk.
        // We will assume the user interacts with the "Your Name" field above.
        setUserNameError('Please enter your name above')
        return
      }
      if (loading) return

      setState({
        loading: true,
        error: null,
      })
      // Use finalUserName
      socket.emit('request:join_room', { userName: finalUserName, roomId }, err => {
        if (err) {
          setState({
            error: err.message,
          })
        }
        setState({
          loading: false,
        })
        // should redirect to room via event listener in Eagle component
      })

      useLocalState.setState({
        preferences: {
          ...preferences,
          userName,
        },
      })
    },
    [loading, preferences, roomId, setState, socket, userName],
  )

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        className="flex-grow bg-muted-beige/40 dark:bg-white/5 border-0 rounded-xl py-4.5 px-6 text-base focus:ring-2 focus:ring-primary/40 placeholder:text-accent-brown/20 focus:outline-none"
        value={roomId}
        onChange={e => setState({ roomId: e.target.value })}
        placeholder="Meeting code"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="px-8 bg-accent-brown dark:bg-white/10 hover:bg-black dark:hover:bg-white/20 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : 'Join'}
      </button>
    </form>
  )
}

export default JoinMeeting
