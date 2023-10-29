import { FlatList, StyleSheet, Text, View } from "react-native";

export const History = (props) => {
    return (
        <View style={styles.historySection}>
            <Text style={styles.historyTitle}>Guesses</Text>
            <FlatList data={props.history} renderItem={itemData => {
                return (
                    <View style={styles.historyItem}>
                    <Text style={styles.historyText}>
                        {itemData.item.id}                         {itemData.item.guess} - {itemData.item.feedback}
                    </Text>
                    </View>
                )
            }}
            keyExtractor={(item, index)=>{
                return item.id;
            }} 
            alwaysBounceVertical={false} />
        </View>
    );
}

const styles = StyleSheet.create({
    historySection: {
        flex: 15,
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
    },
    historyTitle: {
        fontSize: 18,
        marginBottom: 8,
        textAlign: "center",
        color: "white",
    },
    historyItem: {
        margin: 2,
        padding: 4,
        borderRadius: 6,
        backgroundColor: "#5e0acc",
    },
    historyText: {
        color: "white",
        textAlign: "left",
    },
});