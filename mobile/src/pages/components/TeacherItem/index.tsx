import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import heartOutlineIcon from '../../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../../assets/images/icons/whatsapp.png';


export interface Teacher {
    id: number;
    subject: string;
    cost: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}


interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorited, setFavorited] = useState(favorited)

    function handlerWhatsappLinking() {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handlerToggleFavorite() {
        const result = await AsyncStorage.getItem('favorities');
        let favoritedArray: Teacher[] = [];
        if (favoritedArray) {
            favoritedArray = JSON.parse(result as string);
        }

        if (isFavorited) {
            const favoriteIndex = favoritedArray.findIndex((t: Teacher) => {
                return t.id === teacher.id;
            });

            favoritedArray.splice(favoriteIndex, 1);
            setFavorited(false);
        } else {
            favoritedArray.push(teacher);
            await AsyncStorage.setItem('favorities', JSON.stringify(favoritedArray));
            setFavorited(true);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: teacher.avatar }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>
            <Text style={styles.bio}>
                {teacher.bio}
            </Text>
            <View style={styles.footer}>
                <Text style={styles.price} >
                    Proço/Hora {'   '}
                    <Text style={styles.priceValue} >R$ {teacher.cost}</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton
                        onPress={handlerToggleFavorite}
                        style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
                    >
                        {
                            isFavorited
                                ? <Image source={unfavoriteIcon} />
                                : <Image source={heartOutlineIcon} />
                        }
                    </RectButton>
                    <RectButton style={styles.contactButton} onPress={handlerWhatsappLinking} >
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText} >Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;
