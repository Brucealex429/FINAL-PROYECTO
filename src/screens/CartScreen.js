import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { CartContext } from '../../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  const handlePurchase = () => {
    alert('¡Compra realizada con éxito!');
    clearCart();
    navigation.navigate('ProductList');
  };

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        cartItems.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text>Marca: {item.brand} - Precio: ${item.price}</Text>
            <Button title="Eliminar" onPress={() => removeFromCart(item)} />
          </View>
        ))
      ) : (
        <Text>El carrito está vacío</Text>
      )}
      {cartItems.length > 0 && (
        <Button title="Comprar" onPress={handlePurchase} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
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

export default CartScreen;




