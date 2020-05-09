import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { secondsToHms } from '../utils';

export default function TimerBlock({ onClick, seconds, side }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    setTime(secondsToHms(seconds));
  }, [seconds]);

  const formatTwoDigits = no => {
    return String(no).length == 1 ? `0${no}` : no;
  };

  return (
    <TouchableOpacity
      style={[styles.block, side === 'white' ? styles.blockWhite : styles.blockBlack]}
      onPress={() => onClick(side)}>
      <Text style={[styles.blockText, side === 'black' && styles.bloakTextBlack]}>
        {time.h ? `${time.h}:` : ''}
        {time.m}:{formatTwoDigits(time.s)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockWhite: {
    backgroundColor: 'white',
    color: 'black',
  },
  blockBlack: {
    backgroundColor: 'black',
  },
  blockText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  bloakTextBlack: {
    color: 'white',
  },
});

TimerBlock.propTypes = {
  seconds: PropTypes.number.isRequired,
  side: PropTypes.oneOf(['white', 'black']).isRequired,
};
