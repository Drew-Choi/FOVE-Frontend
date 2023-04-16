/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import '../../styles/intro_Movie_client.scss';
import ReactPlayer from 'react-player';

export default function Intro_movie_client() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    setPlay((cur) => true);

    return () => {
      setPlay((cur) => false);
    };
  }, []);

  return (
    <section className="intro_moive">
      <ReactPlayer
        url="/videos/intro.mp4"
        width="100%"
        height="auto"
        playing={play}
        muted={true}
        loop={play}
      />
      ;
    </section>
  );
}
