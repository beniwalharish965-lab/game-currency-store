import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import api from '../services/api';

export default function TrackOrderScreen() {
  const [gameId, setGameId] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!gameId.trim()) {
      Alert.alert('Error', 'Please enter your Game ID');
      return;
    }

    try {
      setLoading(true);
      const response = await api.trackOrder(gameId);
      setOrders(response.orders || []);
      setSearched(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch orders. Please try again.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 1: return '#fbbf24'; // Pending - Yellow
      case 2: return '#3b82f6'; // Processing - Blue
      case 3: return '#10b981'; // Fulfilled - Green
      default: return '#6b7280'; // Gray
    }
  };

  const getStatusText = (status, type) => {
    if (type === 'payment') {
      switch (status) {
        case 1: return 'Pending';
        case 2: return 'Completed';
        default: return 'Unknown';
      }
    } else {
      switch (status) {
        case 1: return 'Pending';
        case 2: return 'Processing';
        case 3: return 'Fulfilled';
        default: return 'Unknown';
      }
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.searchSection}>
          <Text style={styles.title}>🔍 Track Your Order</Text>
          <Text style={styles.subtitle}>
            Enter your Game ID to view all your orders
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your Game ID"
            value={gameId}
            onChangeText={setGameId}
          />

          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.searchButtonText}>Search Orders</Text>
            )}
          </TouchableOpacity>
        </View>

        {searched && (
          <View style={styles.resultsSection}>
            {orders.length === 0 ? (
              <View style={styles.noOrders}>
                <Text style={styles.noOrdersText}>
                  No orders found for this Game ID
                </Text>
              </View>
            ) : (
              <>
                <Text style={styles.resultsTitle}>
                  Found {orders.length} order(s)
                </Text>
                {orders.map((order, index) => (
                  <View key={index} style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                      <Text style={styles.orderId}>Order #{order.id}</Text>
                      <Text style={styles.orderDate}>
                        {formatDate(order.create_time)}
                      </Text>
                    </View>

                    <View style={styles.orderDetail}>
                      <Text style={styles.detailLabel}>Product:</Text>
                      <Text style={styles.detailValue}>{order.product_name}</Text>
                    </View>

                    <View style={styles.orderDetail}>
                      <Text style={styles.detailLabel}>Quantity:</Text>
                      <Text style={styles.detailValue}>{order.quantity}</Text>
                    </View>

                    <View style={styles.orderDetail}>
                      <Text style={styles.detailLabel}>Total Amount:</Text>
                      <Text style={styles.detailValue}>₹{order.total_amount}</Text>
                    </View>

                    <View style={styles.statusContainer}>
                      <View style={styles.statusItem}>
                        <Text style={styles.statusLabel}>Payment:</Text>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(order.payment_status) },
                          ]}
                        >
                          <Text style={styles.statusText}>
                            {getStatusText(order.payment_status, 'payment')}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.statusItem}>
                        <Text style={styles.statusLabel}>Order:</Text>
                        <View
                          style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(order.order_status) },
                          ]}
                        >
                          <Text style={styles.statusText}>
                            {getStatusText(order.order_status, 'order')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>
        )}
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
  searchSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsSection: {
    marginTop: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  noOrders: {
    backgroundColor: '#fff',
    padding: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  noOrdersText: {
    fontSize: 16,
    color: '#6b7280',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  orderDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  orderDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  statusItem: {
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
