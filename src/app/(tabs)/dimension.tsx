import { Container } from "@/components/ui/container";
import { useState, useEffect } from "react";

import { useRouter } from "expo-router";

import {  View, StyleSheet, Text, Dimensions, useWindowDimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Size{
    width: number,
    height: number
}

interface Product{
    id: number,
    title: string,
    description?: string,
    imageUrl?: string,
    price: number
}


const DimensionScreen = ()=>{

    const images = [
        require(`../../../assets/images/products/1.png`),
        require(`../../../assets/images/products/2.jpg`),
        require(`../../../assets/images/products/3.jpg`),
        require(`../../../assets/images/products/4.jpg`),
    ]
    const products:Product[] = [
        {
            id: 1,
            title: 'Smartphone',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[0],
            price: 1200.00
        },
        {
            id: 2,
            title: 'Laptop',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[1],
            price: 2100.00
        },
        {
            id: 3,
            title: 'Earphones',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[2],
            price: 100.00
        },
        {
            id: 4,
            title: 'Powerbank',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt quasi sunt amet est voluptatem laborum culpa neque ab dicta eveniet labore minima deleniti, obcaecati tempora, quae recusandae delectus vel exercitationem.',
            imageUrl: images[3],
            price: 500.00
        },
    ];

    const router = useRouter();

    const {width:windowWidth, height: windowHeight} = Dimensions.get('window');
    const {width:screenWidth, height:screenHeight} = Dimensions.get('screen');

    const [windowSize, setWindowSize] = useState<Size>(Dimensions.get('window'))
    const [screenSize, setScreenSize] = useState<Size>(Dimensions.get('screen'))

    const dimension = useWindowDimensions();

    const isWide = dimension.width > dimension.height;

    const styles = StyleSheet.create({
    card:{
        backgroundColor:"#438a43",
        width: isWide ? 50: 150,
        height: isWide ? 50: 150,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    cardText:{
        color: 'white',
        fontSize: isWide? 24: 60
    },
    buttonBase: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#a03064',
        marginVertical: 5
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        textTransform: "uppercase",
        fontWeight: 'bold'
    },
})
    useEffect(()=>{
        const onWindowChange = ({window, screen}:{
            window:Size, screen: Size
        }) =>{
            setWindowSize(window)
            setScreenSize(screen)
        }
        
        const screenSub = Dimensions.addEventListener('change', onWindowChange)

        return ()=>{
            screenSub.remove();
        }
    },[]);

    const cards = ['A', 'B','C', 'D'];

    return (
        <SafeAreaView>
            {/* <Text>Width: {windowSize.width}{`\nHeight: ${windowSize.height}`}</Text>
            <Text>Width: {screenSize.width}{`\nHeight: ${screenSize.height}`}</Text> */}

            <Container>
                <Text>Width: {dimension.width}{`\nHeight: ${dimension.height}`}</Text>
            </Container>

            <Container style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: isWide?'flex-start': 'center'
            }}>
                {cards.map((item, index)=>(
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardText}>{item}</Text>
                    </View>
                ))}
            </Container>

            <Container>
                <TouchableOpacity style={styles.buttonBase}
                    onPress={()=>{
                        router.push({
                            pathname: '/'
                        })
                    }}
                >
                    <Text style={styles.buttonText}>Main Screen</Text>
                </TouchableOpacity>
            </Container>
        </SafeAreaView>
    )
}




export default DimensionScreen;