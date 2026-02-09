import { View, ActivityIndicator } from 'react-native';
import AppText from './AppText';
import Pdf from 'react-native-pdf';
import { Asset } from 'expo-asset';
import { useEffect, useState } from 'react';

import { theme } from '../src/theme';

type Props = {
    path: number
}

export default function PdfView({ path }: Props) {
    const [localUri, setLocalUri] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                const asset = Asset.fromModule(
                    path
                );
                await asset.downloadAsync();
                setLocalUri(asset.localUri!);
            } catch (error) {
                console.error("Error loading PDF:", error);
            } finally {
                setLoading(false);
            }
        }

        loadPdf();
    }, [path]);

    if (loading) {
        return (
            <ActivityIndicator size="large" color={ theme.colors.primary } />
        );
    }

    if (!localUri) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <AppText>Не удалось загрузить файл PDF</AppText>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Pdf
                source={{ uri: localUri }}
                onError={(err) => console.error(err)}
                style={{ flex: 1 }}
            />
        </View>
    )
}