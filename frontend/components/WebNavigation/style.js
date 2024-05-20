import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row', // Arrange items in a row (horizontal)
      justifyContent: 'space-between', // Space between columns
      alignItems: 'center', // Center items vertically
      padding: 16, // Add some padding for spacing
      backgroundColor: 'white'
    },
    logoColumn: {
      flexDirection: 'row',
      flexGrow: 2,
      flex: 1, // Each column takes an equal amount of space
      alignItems: 'center', // Center items within each column
    },
    column: {
        flexDirection: 'row',
        flex: 1, // Each column takes an equal amount of space
        alignItems: 'center', // Center items within each column
      },
    link: {
      fontSize: 18,
      flexDirection: 'row',
      paddingHorizontal: 16,
    //   color: 'blue',
    //   textDecorationLine: 'underline',
    },
  });

  export default styles