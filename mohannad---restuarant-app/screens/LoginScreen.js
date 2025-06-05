import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // هنا يتم التحقق من بيانات الدخول (يمكن التوسيع لاحقًا)
    if (email && password) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>تسجيل الدخول</Text>
      
      <TextInput
        placeholder="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 }}
      />

      <TextInput
        placeholder="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: '#1e90ff', padding: 12, borderRadius: 8, marginBottom: 15 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>دخول</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={{ textAlign: 'center', color: '#1e90ff' }}>ليس لديك حساب؟ سجل الآن</Text>
      </TouchableOpacity>
    </View>
  );
}
