import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import { View, StyleSheet, FlatList } from "react-native";
import Countdown from '../Countdown/Countdown';
import CountdownService  from '../../services/CountdownService/CountdownService';

const palette = {
    primary: '#1565c0',
    primaryLight: '#5e92f3',
    primaryDark: '#003c8f'
}

const styles = StyleSheet.create({

    countdown: {
        paddingBottom: 20
    },

    listView: {
        marginBottom: 30
    }

})

const CountdownList = ({handleEditPress}) => {

    const [countdownListData, setCountdownListData] = useStateIfMounted([]);

	CountdownService.getCountdownList()
        .then(data => setCountdownListData(data));
        
    const renderCountdown = ({ item, index, separators }) => {

        if (item && item.title && item.date && item.id) {
            return (
                <View style={styles.listView}>
                    <Countdown 
                        style={styles.countdown} 
                        id={item.id} 
                        key={item.id} 
                        date={item.date} 
                        title={item.title} 
                        handleEditPress={handleEditPress}
                    />
                </View>
            )
        }
    };

    if (countdownListData.length > 0) {
        return (

            <View>
                <FlatList
                    data={countdownListData}
                    renderItem={renderCountdown}
                    keyExtractor={item => item && item.id ? item.id : null}
                />
            </View>

        );
    }

    return <View />;
  
}

export default CountdownList;
