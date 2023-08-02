import React,{useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStylesInput from './globalStylesInput';

const TextInputCode = ({
  Svg,
  placeHolder,
  state,
  setState,
  show,
  maxLength = null,
  keyboardType = 'default',
  editable = true,
}) => {
  const [password, setPassword] = useState(false);
  const toggle = () => setPassword(!password);

  const onChangeText = text => {
    setState(text);
  };
  return (
    <View style={{backgroundColor: 'transparent'}}>
      <View style={globalStylesInput.TextInput}
      >
        {Svg && <View style={styles.user}>{Svg}</View>}
        <TextInput
          secureTextEntry={password}
          placeholder={placeHolder}
          placeholderTextColor={'grey'}
          keyboardType={keyboardType}
          maxLength={maxLength}
          editable={false}
          style={styles.bodyTextInput}
          onChangeText={onChangeText}>
          {state}
        </TextInput>
      </View>
    </View>
  );
};

export default TextInputCode;

const styles = StyleSheet.create({
  user: {
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  bodyTextInput: {
    flex: 1,
    paddingRight: 10,
    color:'black'
  },
});
