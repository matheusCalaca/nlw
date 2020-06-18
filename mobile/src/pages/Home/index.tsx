import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, Image, ImageBackground, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useSafeArea } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import api from '../../services/api'


interface UFPoints {
    uf: [];
};

interface SelectItemInterface {
    label: string,
    value: string
}


const Home = () => {

    const [uf, setUf] = useState('');
    const [ufs, setUfs] = useState<SelectItemInterface[]>([]);
    const [city, setCity] = useState('');

    const navigation = useNavigation();

    function handleNavigationToPoints() {
        navigation.navigate('Points', {
            uf,
            city
        });
    }


    useEffect(() => {

        api.get<UFPoints>('/points/uf').then(response => {
            let selectItemInterface: SelectItemInterface[] = [];
            const ufs = response.data.uf;
            ufs.forEach(uf => {
                selectItemInterface.push({ label: uf, value: uf });
            })

            setUfs(selectItemInterface);
        })
    }, []);

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1
            }}
            behavior={Platform.OS == 'ios' ? 'padding' : undefined} >
            <ImageBackground
                source={require('../../assets/home-background.png')}
                imageStyle={{
                    width: 274,
                    height: 368
                }}
                style={styles.container}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleto de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a UF"
                        value={uf}
                        maxLength={2}
                        autoCapitalize='characters'
                        onChangeText={setUf}

                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Digite a Cidade"
                        value={city}
                        autoCapitalize='characters'
                        onChangeText={setCity}
                    />

                    <RNPickerSelect
                        onValueChange={setUf}
                        items={ufs}
                    />


                    <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text>
                                <Icon name="arrow-right" color="#FFF" size={24} />
                            </Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                    </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,

    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;
