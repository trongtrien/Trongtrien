import React, { useState } from 'react'
import ReactPlayer from 'react-player/youtube'

function Player(
    {videoId,
     startAt,
     playing,
     setPlayingSeconds,
     setplaying,
     setDuration,
     setPlayedSeconds,
     }) {
         const [played, setplayed] = useState('')
  return (<ReactPlayer
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${videoId}?start=${startAt}`}
            controls={true}
            playing={playing}
            onPlay={() => setplaying(true)}
            onPause={() => {
                setPlayedSeconds(played)
                setplaying(false)
            }}
            onProgress={({playedSeconds}) => {
                setplayed(playedSeconds.toFixed())
                setPlayingSeconds(playedSeconds.toFixed())
            }}
            onDuration={((duration) => setDuration(duration.toFixed()))}
        />
    );
}

export default Player;
