import { View, Text, StyleSheet } from "react-native";

const HomeScreen=()=>{
    return(
        /**
        
        <div>Text</div>
         */
        <View>
            <Text style={styles.welcomeText}>Welcome to React Native</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeText:{
        margin: 5,
        padding: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#91345b',
        color:'white',
        borderRadius: 8
    }
})

export default HomeScreen;