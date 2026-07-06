import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';

const TabLayout = () =>{
    return(
        <Tabs screenOptions={{
            tabBarActiveTintColor:'#91345b',
            headerStyle:{
                backgroundColor:'#f3f3f3'
            }
        }}>
            <Tabs.Screen name="index"
                options={{
                    title:'Home',
                    tabBarIcon:({color})=><Entypo name="home" size={24} color={color} />
                }}
            />
        </Tabs>
    )
}


export default TabLayout;