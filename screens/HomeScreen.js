import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper';
import { fetchProducts } from '../utils/api';

export default function HomeScreen(props) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error(err);
        setError("Unable to fetch data, offline mode");
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Home Screen</Text>
      {
          products.map((product) => {
            return (
              <Text key={product.id} variant="labelLarge">{product.name}</Text>
            );
})
    }
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});