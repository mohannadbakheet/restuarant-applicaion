import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // من الممكن هنا حفظ البيانات أو التحقق منها
    if (name && email && password) {
      navigation.navigate('Home');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>إنشاء حساب</Text>

      <TextInput
        placeholder="الاسم الكامل"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 8 }}
      />

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
        onPress={handleSignup}
        style={{ backgroundColor: '#28a745', padding: 12, borderRadius: 8, marginBottom: 15 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center', fontSize: 16 }}>تسجيل</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={{ textAlign: 'center', color: '#1e90ff' }}>لديك حساب؟ تسجيل الدخول</Text>
      </TouchableOpacity>
    </View>
  );
}
