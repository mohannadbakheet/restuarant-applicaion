import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// بيانات الفئات
const categories = [
  { id: '1', name: 'مأكولات بحرية', icon: 'fish' },
  { id: '2', name: 'ساندويشات', icon: 'food-sandwich' },
  { id: '3', name: 'أطباق رئيسية', icon: 'silverware-fork-knife' },
  { id: '4', name: 'شوربات', icon: 'pot' },
  { id: '5', name: 'مقبلات', icon: 'food-apple' },
  { id: '6', name: 'مشروبات', icon: 'cup' },
];

// بيانات الأصناف
const items = [
  { id: '101', name: 'سمك مشوي', category: 'مأكولات بحرية', description: 'سمك طازج مشوي مع توابل', nutrition: '200 كالوري', icon: 'fish' },
  { id: '102', name: 'شوربة عدس', category: 'شوربات', description: 'عدس مطبوخ مع بهارات طبيعية', nutrition: '150 كالوري', icon: 'pot' },
  { id: '103', name: 'برجر دجاج', category: 'ساندويشات', description: 'برجر دجاج لذيذ', nutrition: '300 كالوري', icon: 'hamburger' },
  // أضف المزيد حسب الحاجة
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ItemDetail', { item })}
      style={styles.itemContainer}
    >
      <View style={styles.itemHeader}>
        <MaterialCommunityIcons name={item.icon} size={20} color="#333" style={{ marginRight: 6 }} />
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => {
    const categoryItems = items.filter(i => i.category === item.name);

    return (
      <View style={{ marginBottom: 25 }}>
        <View style={styles.categoryHeader}>
          <MaterialCommunityIcons name={item.icon} size={28} color="#1e90ff" style={{ marginRight: 8 }} />
          <Text style={styles.categoryTitle}>{item.name}</Text>
        </View>

        <FlatList
          data={categoryItems}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={2}             // عرض 2 عنصر في الصف
          columnWrapperStyle={styles.row} // لتباعد بين الأعمدة
          scrollEnabled={false}      // لتعطيل التمرير الداخلي (يفضل ترك التمرير في القائمة الرئيسية)
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        renderItem={renderCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    width: '48%', // تقريبا نصف العرض مع بعض التباعد
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  itemName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
