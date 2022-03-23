import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const txtHandlerEmail = (enteredEmail) => {
        setEmail(enteredEmail);
    };

    const txtHandlerPassword = (enteredPassword) => {
        setPassword(enteredPassword);
    };


    const login = async () => {
        
        
        try {
            const jsonValue = await EncryptedStorage.getItem('User');
            const User = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log(User);

            if(email === User.email && password === User.password){
                navigation.navigate('ListStores');
            }
        
        } catch (e) {
        
        }
       
    };


    return (
        <View style={styles.containerCenter}>
            {/* <Icon name="person"></Icon> */}
            <Image
                style={styles.tinyLogo}
                source={require('../Vanamo_Logo.png')}
            />
            <TextInput style={styles.textInput} placeholder="Email" onChangeText={txtHandlerEmail} />
            <TextInput style={styles.textInput} placeholder="Password" onChangeText={txtHandlerPassword} />
            <TouchableOpacity onPress={() => navigation.navigate('NewUser')}>
                <Text style={styles.textNewUser}>Nouvel utilisateur ?</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.buttonLogin} onPress={() => context.Login(true)}> */}
            <TouchableOpacity style={styles.buttonLogin} onPress={login}>
                <Text style={styles.textLogin}>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    containerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    containerCenterMargin: {
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
    },
    tinyLogo: {
        width: 80,
        height: 80,
        marginBottom: 30,
        marginTop: 25,
    },
    textInput: {
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
        paddingLeft: 15,
        width: 300,
        marginBottom: 5,
        borderRadius: 10,
    },
    buttonLogin: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 300,
        backgroundColor: 'rgb(123, 129, 156)',
        color: 'black',
    },
    buttonAddUser: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 300,
        backgroundColor: 'rgb(123, 129, 156)',
        color: 'black',
        marginTop: 20,
    },
    textLogin: {
        fontSize: 15,
    },
    textNewUser: {
        marginBottom: 10,
        marginTop: 10,
    },
});

export default LoginScreen;
