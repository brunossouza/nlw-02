import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

function TeacherItem() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://github.com/brunossouza.png' }}
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>Bruno Silva</Text>
                    <Text style={styles.subject}>Física</Text>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;
