import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import TimerBlock from './TimerBlock';
import GameControls from './GameControls';

export default function Main() {
  const timerRef = useRef(null);
  const [whiteTimer, setWhiteTimer] = useState(300);
  const [blackTimer, setBlackTimer] = useState(300);
  const [activePlayer, setActivePlayer] = useState('white');
  const [clockStatus, setClockStatus] = useState(null); // `RUNNING`, `PAUSED`, `COMPLETED`, `RESET`

  useEffect(() => {
    switch (clockStatus) {
      case 'RUNNING':
        startTimer(activePlayer);
        break;
      case 'PAUSED':
        stopTimer();
        break;
      case 'RESET':
        resetTimer();
        break;
      case 'COMPLETED':
        break;
    }
  }, [clockStatus]);

  const switchPlayer = to => {
    console.log('switch player', activePlayer, to);
    // only switch if active player taps on the his block
    if (activePlayer !== to) return;
    // clear previous setInterval instance as only one timer is used
    stopTimer();

    startTimer(to);

    // switching to next player and not on first turn
    activePlayer === 'white' ? setActivePlayer('black') : setActivePlayer('white');
    Vibration.vibrate(200);
  };

  const startTimer = side => {
    console.log('start timer', activePlayer);
    timerRef.current = setInterval(() => {
      // TODO: Timer doesn't stop after 0
      // stop the function when player runs out of time
      if (whiteTimer <= 0 || blackTimer <= 0) {
        stopTimer();
        return;
      }

      if (side === 'white') {
        if (whiteTimer > 0) {
          setWhiteTimer(prevState => prevState - 1);
        } else {
          stopTimer();
        }
      } else {
        if (blackTimer > 0) {
          setBlackTimer(prevState => prevState - 1);
        } else {
          stopTimer();
        }
      }
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
  };

  return (
    <View style={styles.container}>
      <TimerBlock side='white' seconds={whiteTimer} onClick={switchPlayer} />
      <TimerBlock side='black' seconds={blackTimer} onClick={switchPlayer} />
      <GameControls clockStatus={clockStatus} setClockStatus={setClockStatus} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column',
    position: 'relative',
  },
});
