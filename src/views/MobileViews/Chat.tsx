import { useCallback, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import { useAppSelector } from 'src/app'
import { Navigate } from 'react-router-dom'
import { IChat, IMobileChat } from 'typings'
import { useGetMobileUserChatsQuery } from 'src/app/api/hooks'
import MobileViewPropsHeader from 'src/components/ui/MobileViewPropsHeader'
import MobileChatViewChatsWrap from 'src/components/ui/MobileChatViewComponents/MobileChatViewChatsWrap'

const ChatView = () => {
  const { user } = useAppSelector((state) => state.userReduce)
  const [userQuery, setUserQuery] = useState('')
  const [chats, setChats] = useState<IChat[]>([])

  if (!user) {
    return <Navigate to="/auth/login" />
  }

  const { data, isFetching, error, refetch } = useGetMobileUserChatsQuery()

  const mapToChats = useCallback(
    (chats: IMobileChat[]) =>
      chats.map((chat) => ({
        id: chat.id,
        members: [chat.me, chat.recipient.email],
      })),
    [],
  )

  useEffect(() => {
    if (data?.data) {
      setChats(mapToChats(data.data))
    }
  }, [data?.data, mapToChats])

  const debouncedFilterChats = useCallback(
    debounce((query: string) => {
      if (data?.data) {
        const filteredChats = data.data.filter((chat) =>
          chat.recipient.fullname.toLowerCase().includes(query.toLowerCase()),
        )
        setChats(mapToChats(filteredChats))
      }
    }, 500),
    [data?.data, mapToChats],
  )

  useEffect(() => {
    if (userQuery) {
      debouncedFilterChats(userQuery)
    } else if (data?.data) {
      setChats(mapToChats(data.data))
    }
  }, [data?.data, debouncedFilterChats, mapToChats, userQuery])

  if (error) {
    return (
      <div>
        <p className="italic">Error loading chats</p>
        <button type="button" onClick={() => refetch()}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="h-full w-full pt-4 flex flex-col gap-3">
      <MobileViewPropsHeader
        user={user}
        label="Chats"
        userQuery={userQuery}
        updateUserQuery={(e) => setUserQuery(e)}
      />
      <MobileChatViewChatsWrap isFetching={isFetching} userChats={chats} />
    </div>
  )
}

export default ChatView
