import { StyleSheet } from 'react-native';

export const GridStyles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        padding: 16,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        width: 15,
        height: 15,
        borderRadius: 5,
        marginBottom: 8,
    },
    currentTime:{
        backgroundColor: '#FFD700',
    },
    ThemeGrey:{
        backgroundColor: '#808080',
    },
    ThemeDark:{
        backgroundColor: '#000000',
    },
    ThemeWhite:{
        backgroundColor: '#FFFFFF',
    },

});