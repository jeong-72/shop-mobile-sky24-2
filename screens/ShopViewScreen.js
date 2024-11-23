import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import { fetchProducts } from "../utils/api";

export default function ShopViewScreen(props) {
  const [products, setProducts] = useState([]); 
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState([null]);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProductName, setSelectedProductName] = useState("");


  const fetchData = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setOffline(true);
      setError("Unable to fetch data, offline mode");
    }
  };

  useEffect(() => {
  fetchData();
  }, []);
  
  // #region Navigation
  function showViewProduct(id) {
    props.navigation.navigate("ProductView", { id: id });
  }
  // #endregion
  

  return (
    <Surface style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <Text variant='displaySmall'>ShopViewScreen</Text>
      {products.map((product) => (
        <Text key={product.id}>{product.name}</Text>
      ))} 
      <Button mode="contained" icon="update" onPress={() => showViewProduct(3)}>
        View Person no 2
      </Button>
    </Surface>
  )
}