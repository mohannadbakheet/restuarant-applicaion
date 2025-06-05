import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function ItemDetailScreen({ route, navigation }) {
  const { item } = route.params;

  const [comments, setComments] = useState([
    { id: '1', text: 'لذيذ جداً!', rating: 5 },
    { id: '2', text: 'جيد لكن مالح قليلاً', rating: 3 },
  ]);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState('');

  const handleAddComment = () => {
    if (newComment && rating) {
      const newEntry = {
        id: Date.now().toString(),
        text: newComment,
        rating: parseInt(rating),
      };
      setComments([...comments, newEntry]);
      setNewComment('');
      setRating('');
    }
  };

  const handleAddToCart = () => {
    // سيتم لاحقًا استخدام التخزين أو context
    navigation.navigate('Cart', { addedItem: item });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{item.name}</Text>
      <Text style={{ color: '#666', marginVertical: 5 }}>{item.category}</Text>
      <Text style={{ marginBottom: 10 }}>{item.description}</Text>
      <Text style={{ fontWeight: 'bold' }}>القيمة الغذائية:</Text>
      <Text>{item.nutrition}</Text>

      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>التعليقات:</Text>
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#eee' }}>
              <Text>{item.text}</Text>
              <Text>التقييم: {item.rating} / 5</Text>
            </View>
          )}
        />

        <TextInput
          placeholder="اكتب تعليقك هنا"
          value={newComment}
          onChangeText={setNewComment}
          style={{ borderWidth: 1, padding: 8, marginTop: 15, borderRadius: 8 }}
        />
        <TextInput
          placeholder="التقييم (من 1 إلى 5)"
          keyboardType="numeric"
          value={rating}
          onChangeText={setRating}
          style={{ borderWidth: 1, padding: 8, marginTop: 10, borderRadius: 8 }}
        />

        <TouchableOpacity
          onPress={handleAddComment}
          style={{ backgroundColor: '#1e90ff', padding: 12, borderRadius: 8, marginTop: 10 }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>إضافة التعليق</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleAddToCart}
        style={{ backgroundColor: '#28a745', padding: 12, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>إضافة إلى السلة</Text>
      </TouchableOpacity>
    </View>
  );
}
