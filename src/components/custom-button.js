import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Button = ({ title, onPress, isLoading }) => {
  return (
    <TouchableOpacity style={styles.Button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
      {isLoading && (
        <ActivityIndicator
          style={{ position: 'absolute', right: 20, top: 10 }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  Button: {
    backgroundColor: '#F9ED32',
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
});
