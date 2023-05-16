import React, { useState } from 'react';

const drumPads = [
  {
    id: 'Heater-1',
    keyTrigger: 'Q',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    name: 'Heater 1',
  },
  {
    id: 'Heater-2',
    keyTrigger: 'W',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    name: 'Heater 2',
  },
  {
    id: 'Heater-3',
    keyTrigger: 'E',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    name: 'Heater 3',
  },
  {
    id: 'Heater-4',
    keyTrigger: 'A',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    name: 'Heater 4',
  },
  {
    id: 'Clap',
    keyTrigger: 'S',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    name: 'Clap',
  },
  {
    id: 'Open-HH',
    keyTrigger: 'D',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    name: 'Open-HH',
  },
  {
    id: 'Kick-n\'-Hat',
    keyTrigger: 'Z',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    name: 'Kick-n\'-Hat',
  },
  {
    id: 'Kick',
    keyTrigger: 'X',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    name: 'Kick',
  },
  {
    id: 'Closed-HH',
    keyTrigger: 'C',
    src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
    name: 'Closed-HH',
  },
];

const DrumPad = ({ id, keyTrigger, src, name, onClick }) => {
  const handleClick = () => {
    onClick(name);
    const audio = document.getElementById(keyTrigger);
    audio.currentTime = 0;
    audio.play();
  };

  return (
    <div id={id} className="drum-pad" onClick={handleClick}>
      {keyTrigger}
      <audio className="clip" id={keyTrigger} src={src}></audio>
    </div>
  );
};

const App = () => {
  const [display, setDisplay] = useState('');

  const handlePadClick = (name) => {
    setDisplay(name);
  };

  const handleKeyPress = (event) => {
    const pad = drumPads.find((p) => p.keyTrigger === event.key.toUpperCase());
    if (pad) {
      handlePadClick(pad.name);
      const audio = document.getElementById(pad.keyTrigger);
      audio.currentTime = 0;
      audio.play();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine" className="container">
      <div id="display" className="display">
{display}
</div>
<div className="drum-pads">
{drumPads.map((pad) => (
<DrumPad
         key={pad.id}
         id={pad.id}
         keyTrigger={pad.keyTrigger}
         src={pad.src}
         name={pad.name}
         onClick={handlePadClick}
       />
))}
</div>
</div>
);
};

export default App;
