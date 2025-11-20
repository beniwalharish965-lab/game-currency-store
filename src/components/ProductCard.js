import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  const gameTypeName = product.game_type === 1 ? 'BGMI' : 'FreeFire';
  const gameColor = product.game_type === 1 ? '#ff6b35' : '#ffd700';

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(product)}>
      <View style={[styles.gameBadge, { backgroundColor: gameColor }]}>
        <Text style={styles.gameBadgeText}>{gameTypeName}</Text>
      </View>
      
      <Text style={styles.packageName}>{product.package_name}</Text>
      <Text style={styles.currencyAmount}>
        {product.currency_amount} {product.game_type === 1 ? 'UC' : 'Diamonds'}
      </Text>
      
      {product.description && (
        <Text style={styles.description}>{product.description}</Text>
      )}
      
      <View style={styles.priceContainer}>
        <Text style={styles.priceLabel}>Price:</Text>
        <Text style={styles.price}>₹{product.price}</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.buyButton}
        onPress={() => onPress(product)}
      >
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gameBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  gameBadgeText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  packageName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  currencyAmount: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9ca3af',
    marginBottom: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#6b7280',
    marginRight: 8,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  buyButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductCard;
