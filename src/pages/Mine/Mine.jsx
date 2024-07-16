import React, {useState} from 'react';
import './Mine.css'

const Header = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playBtnWave = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="header">
      <div className="bg">
        <div className="circle__avatar">
          <span className="circle__btn" onClick={playBtnWave}>
          <span className={isPlaying ? 'pause active' : 'pause'}/>
          <span className={isPlaying ? 'play' : 'play active'}/></span>
          <span className="circle__back-1"/>
          <span className="circle__back-2"/>
        </div>
        <div className="wrapper">
          <div className="typing-demo">
            DDT 2024 By ChenMo.
          </div>
        </div>
      </div>
    </div>
  );
};

const Mine = () => {
  return (
    <>
      <div className="mine">
        <Header/>
      </div>
    </>
  )
}

export default Mine
