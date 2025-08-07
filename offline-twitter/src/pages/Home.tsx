import type React from 'react'
import { Composer } from '../components/Composer'
import { TweetList } from '../components/TweetList'
import { useTimelineTweets } from '../context/AppState'

const Home: React.FC = () => {
  const tweets = useTimelineTweets()
  return (
    <div className="page">
      <h2>Home</h2>
      <Composer />
      <TweetList tweets={tweets} />
    </div>
  )
}

export default Home