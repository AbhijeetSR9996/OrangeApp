import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyles from './globalStyles';
import { COLORS } from '../../constants/colors';

const TextInputGlobal = ({
  Svg,
  placeHolder,
  state,
  setState,
  show,
  maxLength,
  keyboardType,
  editable = true,
  secureTextEntry,
}) => {
  const [password, setPassword] = useState(false);
  const toggle = () => setPassword(!password);

  const onChangeText = text => {
    setState(text);
  };
  return (
    <View style={{ backgroundColor: 'transparent' }}>
      <View style={globalStyles.TextInput}>
        {Svg && <View style={styles.user}>{Svg}</View>}
        <TextInput
          secureTextEntry={secureTextEntry}
          //placeholder={placeHolder}
          //placeholderTextColor={'grey'}
          //keyboardType={'numeric'}
          maxLength={maxLength}
          keyboardType={keyboardType}
          //autoCapitalize={placeHolder == 'Email' ? 'none' : 'none'}
          editable={editable}
          style={styles.bodyTextInput}
          onChangeText={onChangeText}>
          {state}
        </TextInput>
      </View>
    </View>
  );
};

export default TextInputGlobal;

const styles = StyleSheet.create({
  user: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  bodyTextInput: {
    flex: 1,
    paddingRight: 10,
    color: COLORS.BLACK,
  },
});
