const mascotStates = {
  idle: '/mascot-states/idle.png',
  happy: '/mascot-states/happy.png',
  thinking: '/mascot-states/thinking.png',
  sad: '/mascot-states/sad.png',
};

export default function Mascot({ state = 'idle' }) {
  const mascotState = mascotStates[state] ? state : 'idle';

  return (
    <div className={`mascot-shell mascot-state-${mascotState}`}>
      <img
        className="mascot-image"
        src={mascotStates[mascotState]}
        alt=""
        aria-hidden="true"
      />
    </div>
  );
}
