import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ route }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('كاش');

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  useEffect(() => {
    if (route.params?.addedItem) {
      addItemToCart(route.params.addedItem);
    }
  }, [route.params]);

  const loadCartFromStorage = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      const storedQuantities = await AsyncStorage.getItem('quantities');
      if (storedItems) setCartItems(JSON.parse(storedItems));
      if (storedQuantities) setQuantities(JSON.parse(storedQuantities));
    } catch (e) {
      console.error('فشل في تحميل السلة', e);
    }
  };

  const saveCartToStorage = async (items, qtys) => {
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(items));
      await AsyncStorage.setItem('quantities', JSON.stringify(qtys));
    } catch (e) {
      console.error('فشل في حفظ السلة', e);
    }
  };

  const addItemToCart = (item) => {
    const exists = cartItems.find(i => i.id === item.id);
    let updatedItems = [...cartItems];
    let updatedQuantities = { ...quantities };

    if (exists) {
      updatedQuantities[item.id] += 1;
    } else {
      updatedItems.push(item);
      updatedQuantities[item.id] = 1;
    }

    setCartItems(updatedItems);
    setQuantities(updatedQuantities);
    saveCartToStorage(updatedItems, updatedQuantities);
  };

  const handleQuantityChange = (itemId, value) => {
    const intVal = parseInt(value);
    if (!isNaN(intVal) && intVal > 0) {
      const newQuantities = { ...quantities, [itemId]: intVal };
      setQuantities(newQuantities);
      saveCartToStorage(cartItems, newQuantities);
    }
  };

  const handleConfirmOrder = async () => {
    Alert.alert(
      'تم إرسال الطلب',
      `طريقة الدفع: ${paymentMethod}\nعدد الأصناف: ${cartItems.length}`,
      [{ text: 'موافق' }]
    );
    setCartItems([]);
    setQuantities({});
    await AsyncStorage.removeItem('cartItems');
    await AsyncStorage.removeItem('quantities');
  };

  const renderCartItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
      <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
      <Text>{item.description}</Text>
      <TextInput
        keyboardType="numeric"
        value={quantities[item.id]?.toString() || '1'}
        onChangeText={value => handleQuantityChange(item.id, value)}
        style={{ borderWidth: 1, borderRadius: 6, padding: 5, width: 60, marginTop: 5 }}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 15 }}>سلة المشتريات</Text>

      {cartItems.length === 0 ? (
        <Text>السلة فارغة.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={renderCartItem}
        />
      )}

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 20 }}>اختر طريقة الدفع:</Text>

      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        {['كاش', 'فيزا'].map(method => (
          <TouchableOpacity
            key={method}
            onPress={() => setPaymentMethod(method)}
            style={{
              backgroundColor: paymentMethod === method ? '#1e90ff' : '#ccc',
              padding: 10,
              borderRadius: 8,
              marginRight: 10,
            }}
          >
            <Text style={{ color: '#fff' }}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleConfirmOrder}
        style={{ backgroundColor: '#28a745', padding: 14, borderRadius: 10, marginTop: 30 }}
        disabled={cartItems.length === 0}
      >
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>تأكيد الطلب</Text>
      </TouchableOpacity>
    </View>
  );
}
