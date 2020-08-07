import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import givesClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
    const { goBack } = useNavigation();

    function handlerNavigationBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={givesClassesBgImage}
                style={styles.content}
                resizeMode="contain"
            >
                <Text style={styles.title}>Quer ser um proffy?</Text>
                <Text style={styles.description}>
                    Para começar, você precisa se cadastrar na nossa plataforma
                    web.
                </Text>
            </ImageBackground>
            <RectButton onPress={handlerNavigationBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo Bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;
