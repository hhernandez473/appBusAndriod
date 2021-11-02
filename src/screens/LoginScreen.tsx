import React, { useContext, useEffect } from 'react'
import { View, Text, TextInput, Platform, TouchableOpacity, KeyboardAvoidingView, Keyboard, Alert } from 'react-native';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { LoginStyles } from '../themes/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { };

export const LoginScreen = ({ navigation } : Props) => {

    const { signIn, errorMessage, removeError } = useContext(AuthContext)

    const { email, password, form, onChange} = useForm({
        email: '',
        password: ''
    });

    useEffect(() => {
        if(errorMessage.length === 0) return;

        Alert.alert('Login incorrecto', errorMessage, [
            { text: 'Ok', onPress: removeError}
        ]);
        
    }, [errorMessage])

    const onLogin = () =>{
        console.log({email, password});
        Keyboard.dismiss();
        signIn({email, password});
    }

    return (
        <>
            <Background />
            <KeyboardAvoidingView
                style={{ flex: 1}} 
                behavior={ (Platform.OS === 'ios') ? 'padding': 'height'}
            >
                <View style={ LoginStyles.formContainer }>
                    <WhiteLogo />
                    <Text style={ LoginStyles.title }> Login </Text>

                    <Text style={ LoginStyles.label} > Usuario </Text>
                    <TextInput 
                        placeholder="Ingrese su usuario"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid='white'
                        style={ [
                            LoginStyles.inputField,
                            ( Platform.OS === 'ios') && LoginStyles.inputFieldIOS
                        ] }
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'email')}
                        value={email}
                        onSubmitEditing={ onLogin }
                        autoCapitalize="none"
                        autoCorrect={ false }
                        
                    />

                    <Text style={ LoginStyles.label} > Contraseña </Text>
                    <TextInput 
                        placeholder="********"
                        placeholderTextColor="rgba(255,255,255,0.4)"  
                        underlineColorAndroid='white'
                        secureTextEntry
                        style={ [
                            LoginStyles.inputField,
                            ( Platform.OS === 'ios') && LoginStyles.inputFieldIOS
                        ] }
                        selectionColor="white"
                        onChangeText={(value) => onChange(value, 'password')}
                        value={password}
                        onSubmitEditing={ onLogin }
                    />
                    <View style={ LoginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ LoginStyles.btn }
                            onPress= { onLogin }
                            //onPress= { () => navigation.replace('LateralMenu') }
                        >
                            <Text style={ LoginStyles.btnText }>Iniciar sesión</Text>
                        </TouchableOpacity>
                        
                    </View>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}
