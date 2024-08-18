import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    try {
      const hashedPassword = CryptoJS.SHA256(password).toString();
      const user = { username, email, password: hashedPassword };
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.some(u => u.username === username || u.email === email);
      if (userExists) {
        alert('El nombre de usuario o correo electrónico ya están registrados.');
        return;
      }

      users.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(users));
      alert('Usuario registrado con éxito');
      navigation.navigate('Login');
    } catch (error) {
      alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Registro</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
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
        <Button title="Registrarse" onPress={handleRegister} />
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          ¿Ya tienes una cuenta? Inicia sesión ahora
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

export default RegisterScreen;

