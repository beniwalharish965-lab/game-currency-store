import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../services/api';

export default function OrderFormScreen({ route, navigation }) {
  const product = route.params?.product;
  
  const [formData, setFormData] = useState({
    customerName: '',
    gameId: '',
    contactEmail: '',
    contactPhone: '',
    quantity: '1',
    upiTransactionId: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.customerName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.gameId.trim()) {
      Alert.alert('Error', 'Please enter your Game ID');
      return false;
    }
    if (!formData.contactEmail.trim() && !formData.contactPhone.trim()) {
      Alert.alert('Error', 'Please provide either email or phone number');
      return false;
    }
    if (!formData.upiTransactionId.trim()) {
      Alert.alert('Error', 'Please enter UPI Transaction ID');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);
      
      const orderData = {
        product_id: product?.id || '',
        customer_name: formData.customerName,
        game_id: formData.gameId,
        contact_email: formData.contactEmail || null,
        contact_phone: formData.contactPhone || null,
        quantity: parseInt(formData.quantity) || 1,
        total_amount: (product?.price || 0) * (parseInt(formData.quantity) || 1),
        upi_transaction_id: formData.upiTransactionId,
        payment_status: 1, // Pending
        order_status: 1, // Pending
      };

      const response = await api.createOrder(orderData);
      
      Alert.alert(
        'Success! 🎉',
        response.message || 'Your order has been placed successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                customerName: '',
                gameId: '',
                contactEmail: '',
                contactPhone: '',
                quantity: '1',
                upiTransactionId: '',
              });
              navigation.navigate('Home');
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = (product?.price || 0) * (parseInt(formData.quantity) || 1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {product && (
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.package_name}</Text>
            <Text style={styles.productPrice}>₹{product.price} per package</Text>
          </View>
        )}

        <View style={styles.paymentInfo}>
          <Text style={styles.sectionTitle}>💳 Payment Information</Text>
          <Text style={styles.upiId}>UPI ID: jaatharish16@axl</Text>
          <Text style={styles.paymentNote}>
            Please complete the payment and enter the transaction ID below
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Your Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={formData.customerName}
            onChangeText={(value) => handleInputChange('customerName', value)}
          />

          <Text style={styles.label}>Game ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your in-game ID"
            value={formData.gameId}
            onChangeText={(value) => handleInputChange('gameId', value)}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="your.email@example.com"
            keyboardType="email-address"
            value={formData.contactEmail}
            onChangeText={(value) => handleInputChange('contactEmail', value)}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="+91 XXXXXXXXXX"
            keyboardType="phone-pad"
            value={formData.contactPhone}
            onChangeText={(value) => handleInputChange('contactPhone', value)}
          />

          <Text style={styles.label}>Quantity *</Text>
          <TextInput
            style={styles.input}
            placeholder="1"
            keyboardType="number-pad"
            value={formData.quantity}
            onChangeText={(value) => handleInputChange('quantity', value)}
          />

          <Text style={styles.label}>UPI Transaction ID *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter UPI transaction ID"
            value={formData.upiTransactionId}
            onChangeText={(value) => handleInputChange('upiTransactionId', value)}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>₹{totalAmount}</Text>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Place Order</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 16,
  },
  productInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    color: '#6366f1',
    fontWeight: '600',
  },
  paymentInfo: {
    backgroundColor: '#fef3c7',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  upiId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 8,
  },
  paymentNote: {
    fontSize: 14,
    color: '#6b7280',
  },
  form: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
