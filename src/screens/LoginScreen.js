import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor, ingrese su nombre de usuario y contraseña.');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const hashedPassword = CryptoJS.SHA256(password).toString();

      const user = users.find(u => u.username === username && u.password === hashedPassword);

      if (user) {
        alert('Inicio de sesión exitoso');
        navigation.navigate('ProductList');
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      alert('Hubo un error al iniciar sesión');
    }
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Iniciar Sesión</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#000"
        />
        <Button title="Iniciar Sesión" onPress={handleLogin} />
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          ¿No tienes una cuenta? Regístrate ahora
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 16,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 75,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#FFF',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#ffffffaa',
  },
  link: {
    marginTop: 16,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default LoginScreen;


