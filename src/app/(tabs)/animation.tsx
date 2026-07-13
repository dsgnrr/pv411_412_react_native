import React, { useEffect, useRef } from "react";
import { ScrollView, View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Container } from "@/components/ui/container";

const AnimateScreen = () => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const moveAnim = useRef(new Animated.Value(0)).current;
    const colorAnim = useRef(new Animated.Value(0)).current;

    const animate = (toValue: number, animateValue: Animated.Value, duration = 3000, useNativeDriver = true) => {
        Animated.timing(animateValue, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: useNativeDriver
        }).start()
    }

    const boxColor = colorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#1f1f1f', '#fff']
    })

     const moveInterpol = moveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"]
    })

    const show = () => {
        animate(1, fadeAnim, 3000)
    }
    const suspense = () => {
        animate(0, fadeAnim, 3000)
    }

    /* Анімація не спрацювала по тій причині, що анімації які керуються нейтів-двигуном, а анімації не керуються
    нейтів-двигуном не можна чіпляти на один елемент.
    */

    return (
        <ScrollView>
            <Container>
                <Text style={styles.headerText}>Fade animation</Text>
                <Animated.View style={[styles.fadeBox, { opacity: fadeAnim }]}>
                    <Text style={styles.text}>Animate</Text>
                </Animated.View>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    <TouchableOpacity onPress={() => show()} style={[styles.buttonBase, { backgroundColor: "#a03064", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Show</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => suspense()} style={[styles.buttonBase, { backgroundColor: "#611e3d", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Suspense</Text>
                    </TouchableOpacity>
                </View>
            </Container>
            <Container>

                <Text style={styles.headerText}>Move animation</Text>
                <Animated.View style={
                    [styles.moveBox,
                    {
                        transform: [{
                            translateX: moveInterpol
                        }],
                        backgroundColor: boxColor
                    }]}>
                        <Text
                        style={{
                            color:"#1f1f1f",
                            textTransform:'uppercase',
                            fontSize: 16,
                            fontWeight:'bold'
                        }}>Hello</Text>
                    </Animated.View>
                <View style={{ flexDirection: 'row', gap: 3 }}>
                    <TouchableOpacity onPress={() => {
                        animate(1, moveAnim, 3000, false)
                        animate(1, colorAnim, 3000, false)
                    }} style={[styles.buttonBase, { backgroundColor: "#a03064", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Move Right</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        animate(0, moveAnim, 3000, false)
                        animate(0, colorAnim, 3000, false)
                    }} style={[styles.buttonBase, { backgroundColor: "#611e3d", marginVertical: 5 }]}>
                        <Text style={styles.buttonText}>Move Back</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#424242'
    },
    moveBox: {
        width: 100,
        height: 100,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fadeBox: {
        padding: 20,
        backgroundColor: "#1f1f1f",
        borderRadius: 8
    },
    buttonBase: {
        flex: 1,
        padding: 10,
        borderRadius: 8
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        textTransform: "uppercase",
        fontWeight: 'bold'
    },
    text: {
        color: "#fff",
        fontSize: 20
    }
})

export default AnimateScreen;