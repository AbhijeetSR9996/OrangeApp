import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

const Location = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Location Screen</Text>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
  },
  text: {
    color: COLORS.ORANGE,
    alignSelf: 'center',
  },
});
