import React from 'react';
import '../../styles/intro_Movie_client.scss';
import ReactPlayer from 'react-player';

export default function Intro_movie_client() {
  return (
    <section className="intro_moive">
      <ReactPlayer
        url={process.env.PUBLIC_URL + '/videos/intro.mp4'}
        width="100%"
        height="auto"
        playing={true}
        muted={true}
        loop={true}
      />
    </section>
  );
}
