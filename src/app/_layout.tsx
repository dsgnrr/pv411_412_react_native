import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

// import "../global.css";

const RootLayout = () => {
    return (
        // <SafeAreaView>
        //     <View className="flex-1 items-center justify-center">
        //         <Text className="text-xl text-emerald-400">Hello Tailwind</Text>
        //     </View>
        // </SafeAreaView>
        <SafeAreaProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
                <Stack.Screen name="product_modal" options={{
                    presentation: 'modal',
                    headerShown: false
                }}/>
            </Stack>
        </SafeAreaProvider>
    )
}

export default RootLayout;