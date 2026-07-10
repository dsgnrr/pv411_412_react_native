import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const TabLayout = () => {
    return (
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#91345b',
            headerStyle: {
                backgroundColor: '#f3f3f3'
            }
        }}>
            <Tabs.Screen name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />
                }}
            />
            <Tabs.Screen name="lists"
                options={{
                    title: 'Lists',
                    tabBarIcon: ({ color }) => <FontAwesome name="list" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}


export default TabLayout;