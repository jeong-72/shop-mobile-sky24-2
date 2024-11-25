import React, { useEffect, useState } from 'react';
import {Avatar, Card, IconButton, FAB, Snackbar, TextInput, Dialog, Portal, Button, Text, Surface, Divider, Searchbar, useTheme } from "react-native-paper";
import {View, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import { Dropdown } from "react-native-paper-dropdown";
import {
  fetchProductById,
  addProduct,
  updateProduct,
  fetchCategories,
} from "../utils/api";


export default function ProductEditScreen(props) {
  theme = useTheme();
  const { id } = props.route.params;
  const [product, setProduct] = useState(
    {
      "name": "",
      "price": 0,
      "stock": 0,
      "description": "",
      "categoryId": 1,
    }
  );
  const [offline, setOffline] = useState(false);
  const [error, setError] = useState([null]);
  const [categories, setCategories] = useState([]);
 const [selectedCategory, setSelectedCategory] = useState([null]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const fetchedCategories = await fetchCategories();
          setCategories(fetchedCategories);
          setSelectedCategory(fetchedCategories[0].id);

          if (id !== -1) {
            const data = await fetchProductById(id);
            setProduct(data);
            setSelectedCategory(data.categoryId);
            console.log(data);
          }
          else {
          console.log(product);
          }
        } catch (err) {
          console.error(err);
          setOffline(true);
          setError("Unable to fetch data, offline mode");
        }
      };

      fetchData();
    }, []);
  
    function showShopView() {
      props.navigation.navigate("ShopView");
    }
  
  async function handleSubmit() {
    try {
      const updatedProduct = { ...product, categoryId: selectedCategory };
      if (id === -1) {
        await addProduct(updatedProduct);
      } else {
        await updateProduct(id, updatedProduct);
      }
      props.navigation.goBack();
    } catch (err) {
      console.error(err);
      setError("Failed to save data.");
    }
  };

    async function handleSubmitTest() {
      try {
        if (id === -1) {
          await addProduct({
            name: "New Banana",
            price: 3.3,
            stock: 999,
            description: "Fresh yellow banana",
            categoryId: 1,
          });
        } else {
          await updateProduct(id, { ...product, name: product.name + " Updated" });
        }
        props.navigation.goBack();
      } catch (err) {
        console.error(err);
        setError("Failed to save data.");
      }
    }
  return (
    <Surface style={{ flex: 1, padding: 16 }}>
      <Text
        variant="headlineLarge"
        style={{
          marginHorizontal: 10,
          marginBottom: 24,
          fontWeight: "bold",
          color: theme.colors.primary,
        }}
      >
        {id === -1 ? "New Product" : product.name}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      ></View>
      <View>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 34 }}
        >
          <TextInput
            label="Name"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Price"
            value={product.phone}
            onChangeText={(text) => setProduct({ ...product, price: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Price"
            value={product.stock}
            onChangeText={(text) => setProduct({ ...product, stock: text })}
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />
          <TextInput
            label="Description"
            value={product.description}
            onChangeText={(text) =>
              setProduct({ ...product, description: text })
            }
            mode="outlined"
            keyboardType="numeric"
            style={{ marginBottom: 16 }}
          />

          <Dropdown
            label="Categories"
            mode="outlined"
            value={selectedCategory}
            onSelect={setSelectedCategory}
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat.id,
            }))}
          />
        </ScrollView>
      </View>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Button mode="outlined" icon="keyboard-return" onPress={showShopView}>
          Cancel
        </Button>
      </View>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <Button mode="contained" icon="update" onPress={handleSubmit}>
          Ok
        </Button>
      </View>
    </Surface>
  );
}


      // <Text variant="displaySmall">ProductEditScreen</Text>
      // <Text>{id}</Text>
      // <Text>{product?.name}</Text>
      // <Text>{product?.price}</Text>
      // <Text>{product?.stock}</Text>
      // <Text>{product?.description}</Text>
      // <Text>{product?.categoryId}</Text>
      // <Button mode="contained" icon="update" onPress={() => showShopView()}>
      //   GoBack
      // </Button>
      // <Button mode="contained" icon="update" onPress={() => handleSubmitTest()}>
      //   Save or New
      // {/* </Button> */}