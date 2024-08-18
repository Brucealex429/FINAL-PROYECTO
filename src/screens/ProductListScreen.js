import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CartContext } from '../../context/CartContext';

const ProductListScreen = ({ navigation }) => {
  const { addToCart } = useContext(CartContext);

  const products = [
    { id: 1, title: 'Camisa de verano', brand: 'Zara', price: 50 },
    { id: 2, title: 'Pantalones de invierno', brand: 'H&M', price: 80 },
    { id: 3, title: 'Abrigo de otoño', brand: 'Uniqlo', price: 120 },
    { id: 4, title: 'Zapatillas deportivas', brand: 'Nike', price: 90 },
    { id: 5, title: 'Sombrero de verano', brand: 'Adidas', price: 25 },
  ];

  return (
    <View style={styles.container}>
      {products.map((product) => (
        <View key={product.id} style={styles.productCard}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text>Marca: {product.brand} - Precio: ${product.price}</Text>
          <Button title="Agregar al carrito" onPress={() => addToCart(product)} />
        </View>
      ))}
      <Button title="Ver Carrito" onPress={() => navigation.navigate('Cart')} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    width: '80%',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;





