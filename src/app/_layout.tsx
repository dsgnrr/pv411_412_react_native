import { View, Text, ActivityIndicator } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

import { Redirect, Slot, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect } from "react";

// import "../global.css";

const InitialLayout = ()=>{
    const { token, isLoading } = useAuth();
    const segments = useSegments();
    const router = useRouter();
    
    useEffect(()=>{
        if (isLoading) return;

        const inAuthGroup = segments[0] ==="(auth)";
        if(!token && !inAuthGroup){
            router.replace("/(auth)/login");
        }else if(token && inAuthGroup){
            router.replace("/(tabs)/profile");
        }
    }, [token, isLoading, segments]);
        if (isLoading) {
            return (
                <View style={{
                    flex:1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <ActivityIndicator size={"large"} color="#6e0e36" />
                </View>
            )
        }
       return <Slot/>;
}


const RootLayout = () => {
    return (
        // <SafeAreaView>
        //     <View className="flex-1 items-center justify-center">
        //         <Text className="text-xl text-emerald-400">Hello Tailwind</Text>
        //     </View>
        // </SafeAreaView>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <AuthProvider>
                    <InitialLayout/>
                </AuthProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}

export default RootLayout;