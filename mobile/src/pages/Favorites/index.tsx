import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';


import styles from './styles';
import PageHeader from '../components/PageHeader';
import TeacherItem, { Teacher } from '../components/TeacherItem';

function Favorites() {
    const [favorities, setFavorities] = useState([]);

    useFocusEffect(() => {
        loadFavorites();
    });

    function loadFavorites() {
        AsyncStorage.getItem('favorities').then(response => {
            if (response) {
                setFavorities(JSON.parse(response));
            }
        });
    }


    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />


            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {
                    favorities.map((teacher: Teacher) => {
                        return (
                            <TeacherItem
                                key={teacher.id}
                                favorited={true}
                                teacher={teacher}
                            />);
                    })
                }

            </ScrollView>
        </View>
    );
}

export default Favorites;
