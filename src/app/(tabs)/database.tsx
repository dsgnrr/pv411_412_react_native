import { View, Text, StyleSheet, TextInput, Button, FlatList } from "react-native";
import { dbManager, Product } from "@/lib/db";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";

const DatabaseScreen = ()=>{
    const[products, setProducts] = useState<Product[]>([]);
    /**
     * Необхідно допрацювати CRUD
     * створіть форму для створення продуктів
     * надайте можливість видаляти продукти (повністю або м'яке видалення)
     * додайте чекбокс, який показує видалені продукти
     */
    useEffect(()=>{
        const setup = async()=>{
            await dbManager.init();
            await loadProducts();
        }

        setup();
    }, []);

    const loadProducts = async()=>{
        const list = await dbManager.getAllProducts();
        setProducts(list)
    }

    const addProduct = async()=>{
        await dbManager.addProduct(
            `Product-${Math.floor(Math.random() * 100)}`,
            Math.floor(Math.random() * 100)
        )
        await loadProducts();
    }

    return(
        <Container style={{padding: 20}}>
            <Button title="Add product" onPress={addProduct}/>
            <FlatList
                data={products}
                keyExtractor={(item)=> item.id}
                renderItem={({item})=>(
                    <View style={styles.listItem}>
                        <Text style={styles.listItemId}>{item.id}</Text>
                        <Text style={styles.listItemText}>{item.title}</Text>
                        <Text style={styles.listItemPrice}>{item.price}</Text>
                        <Text>{new Date(item.created_at).toDateString()}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{
                        textAlign: 'center',
                        marginTop: 50,
                        color:"#999",
                        fontSize: 16
                    }}>Products not found</Text>
                }
            />
        </Container>
    )

}

const styles = StyleSheet.create({
    listItem:{
        padding: 20,
        borderRadius: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#940e30',
        marginVertical: 8
    },
    listItemId: {fontSize: 11},
    listItemText: {fontSize: 20, fontWeight: 'bold'},
    listItemPrice: {fontSize: 17, fontWeight: "bold", color: '#238a23'}
})

export default DatabaseScreen;