import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TimerBlock from './TimerBlock';

export default function Main() {
  const timerRef = useRef(null);
  const [whiteTimer, setWhiteTimer] = useState(300);
  const [blackTimer, setBlackTimer] = useState(300);
  const [activePlayer, setActivePlayer] = useState('white');

  const switchPlayer = to => {
    // only switch if active player taps on the his block
    if (activePlayer === to) return;
    // clear previous setInterval instance as only one timer is used
    stopTimer();

    startTimer();

    // switching to next player and not on first turn
    activePlayer === 'white' ? setActivePlayer('black') : setActivePlayer('white');
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      // stop the function when player runs out of time
      if (whiteTimer <= 0 || blackTimer <= 0) {
        stopTimer();
        return;
      }

      if (activePlayer === 'white') {
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
      <Text>Game controls</Text>
      <TimerBlock side='black' seconds={blackTimer} onClick={switchPlayer} />
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
  },
});
