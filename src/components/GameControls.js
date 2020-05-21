import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Refresh from './icons/Refresh';
import Settings from './icons/Settings';
import Play from './icons/Play';
import Stop from './icons/Stop';

export default function GameControls({ clockStatus, setClockStatus }) {
  return (
    <View style={styles.controlsContainer}>
      <View style={styles.box}>
        <TouchableOpacity activeOpacity={0.8}>
          <Settings style={styles.icons} fill='#222' height={50} width={50} />
        </TouchableOpacity>

        {clockStatus === 'RUNNING' ? (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setClockStatus('PAUSED')}>
            <Stop style={styles.icons} fill='#222' height={50} width={50} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setClockStatus('RUNNING')}>
            <Play style={styles.icons} fill='#222' height={50} width={50} />
          </TouchableOpacity>
        )}

        <TouchableOpacity activeOpacity={0.8} onPress={() => setClockStatus('RESET')}>
          <Refresh style={styles.icons} fill='#222' height={50} width={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 'auto',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 4,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.0,
    shadowRadius: 2.0,
    elevation: 2,
  },
  icons: {
    paddingHorizontal: 10,
    height: 50,
    width: 50,
    zIndex: 100,
  },
});
