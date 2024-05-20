import { StyleSheet } from 'react-native';

const appStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#EFEFF3',
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    },
    card: {
      width: '30%',
      height: 'auto',
      flexShrink: 0,
      borderRadius: 20,
      border: '1px solid #BFBFBF',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 4 4 0 rgba(0, 0, 0, 0.50)',
      margin: 10,
      padding: 10,
      paddingLeft: 25,
      paddingRight: 25,
    },
    cardText:{
      display: 'flex',
      width: 260,
      height: 115,
      flexDirection: 'column',
      justifyContent: 'center',
      flexShrink: 0,
      color: '#2A2A2A',
      textAlign: 'left',
      fontFamily: 'Inter',
      fontSize: 18,
      fontStyle: 'normal',
      fontWeight: 600,
      margin: 10
    },
    inputText:{
      display: 'flex',
      width: 260,
      height: 'auto',
      flexDirection: 'column',
      justifyContent: 'center',
      flexShrink: 0,
      color: '#BFBFBF',
      textAlign: 'left',
      fontFamily: 'Inter',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 600,
      margin: 5
    },
    categoryName: {
      display: 'flex',
      width: 'auto',
      height: 40,
      flexDirection: 'column',
      justifyContent: 'center',
      flexShrink: 0,
      color: '#2A2A2A',
      textAlign: 'center',
      fontFamily: 'Inter',
      fontSize: 30,
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: 'normal',
    },
    rounded: {
      borderTopWidth: 8,
      borderTopColor: '#bbb',
      borderRadius: 5,
    },
    myButton: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 30,
      border: '1px solid #E9E9F2',
      margin: 2,
    },
  });

  export default appStyles;