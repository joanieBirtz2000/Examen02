import React, {useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, SafeAreaView, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getApi } from '../util/Api';
import { getDBConnection, createTable, saveStoresItems, getStoreItems,deleteTable } from '../util/Db';
import {createChannels,handleNotification} from '../util/Notifications'

function StoresListScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [listFiltre, setlistFiltre] = useState([]);
  const [monInput, setmonInput] = useState('');

  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = await getApi();
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getStoreItems(db);
      if (storedTodoItems.length) {
        setData(storedTodoItems);
        setlistFiltre(storedTodoItems);
      } else {
        await saveStoresItems(db, initTodos);
        setData(initTodos);
        setlistFiltre(initTodos);
      }
      handleNotification('List a jour!');
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
    createChannels();
  }, [loadDataCallback]);

  const Item = ({ item, onPress }) => (
    <View style={styles.containerItem}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.viewCoordonne}>
            <Text style={styles.titleStore}>{item.banner}</Text>
            <Text style={styles.textLastVisit}>{item.lastVisit}</Text>
        </View>
        
        <Text style={styles.titleAddress}>{item.address}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {

    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('Map', { item: item })}
      />
    );
  };

  const txtHandlerRechercheStore = (monInput) => {
    setmonInput(monInput);
    let result = data.filter(store => store.banner.startsWith(monInput) || store.city.startsWith(monInput));
    setlistFiltre(result);
};
  return (
    <SafeAreaView>
    <TextInput style={styles.textInput} placeholder="Rechercher" onChangeText={txtHandlerRechercheStore} />
    <FlatList
      data={listFiltre}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    containerCenter: {
      flex: 1,
      alignItems: 'center',
    },
    containerItem: {
      borderColor: 'black',
      borderWidth: 2,
      marginBottom: 2,
      marginTop: 10,
      marginLeft: 30,
      marginRight: 30,
      backgroundColor: 'white',
    },
    titleStore: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    titleAddress: {
      fontSize: 15,
    },
    viewCoordonne: {
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    textLastVisit: {
      fontSize: 15,
      marginRight: 10,
    },
    textInput: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        paddingLeft: 15,
        width: 350,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 10,
        alignSelf: 'center',
    },
  });

export default StoresListScreen;
