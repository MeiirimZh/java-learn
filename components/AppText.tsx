import { Text, TextProps, StyleSheet } from 'react-native';
import { theme } from '../src/theme';

export default function AppText(props: TextProps) {
    return (
        <Text {...props} style={ [styles.text, props.style] } />
    )
}

const styles = StyleSheet.create({
    text: {
        fontFamily: theme.fonts.regular
    }
});