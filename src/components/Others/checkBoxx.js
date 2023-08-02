import React, {useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {IMAGES} from '../../constants/images';
import {COLORS} from '../../constants/colors';

const Checkboxx = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxPress = () => {
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <CheckBox
        size={20}
        checked={checked}
        onPress={handleCheckboxPress}
        checkedIcon={
          <Image source={IMAGES.tickcheckboxIcon} style={styles.checkedImage} />
        }
        uncheckedIcon={<View style={styles.view} />}
      />
    </View>
  );
};

export default Checkboxx;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedImage: {
    height: 30,
    width: 30,
  },
  view: {
    height: 30,
    width: 30,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.GREYLIGHT,
    borderRadius: 7,
  },
});
