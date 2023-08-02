import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';

const globalStylesInput = StyleSheet.create({
  button: {
    height: 50,
    backgroundColor: '#F57F17',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
    elevation: 8,
  },
  buttonText: {
    fontSize: 19,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Bold',
  },
  view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText2: {
    fontSize: 12,
  },

  TextInput: {
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
    backgroundColor: COLORS.PINK,
    elevation: 10,
  },
  Applybutton: {
    height: 30,
    backgroundColor: '#EF3340',
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 10,
    bottom: 485,
    right: 115,
  },
  ApplybuttonText: {
    fontSize: 15,
    marginTop: Platform.OS == 'android' ? 3 : 0,
    bottom: 3,
  },
});

export default globalStylesInput;
