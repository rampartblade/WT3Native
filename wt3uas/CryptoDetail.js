import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image, FlatList } from 'react-native';
import axios from 'axios';
import { Avatar, ListItem } from 'react-native-elements';

class CryptoDetail extends React.Component {  
    static navigationOptions = {    
        title: 'Crypto Detail' 
    };  
    constructor(props) {
        super(props)
        this.state = {
            crypto: [],
        };
      }
    componentDidMount() {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=`+ this.props.navigation.state.params.coinID +`&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then(res => {
            const crypto = res.data;
            console.log(crypto);
            this.setState({crypto});
        })
    } 

    render() {  
        const { navigation } = this.props; // sama dengan this.props.navigation 
        return (      
        <SafeAreaView style={{flex : 1}}>
            <Image source={{uri: encodeURI(navigation.getParam('coinImage'))}} style={{width:100, height:100, marginTop: 10, marginLeft:10}}/>    
            <FlatList
            data={[
                {key: 'Cryptocurrency Name: '+ navigation.getParam('coinName')+' ('+ navigation.getParam('coinSymbol')+')'},
                {key: 'Current Price: $ '+ navigation.getParam('coinCurrentPrice')},
                {key: 'High & Low: \n'+ '\nHigh: $ '+navigation.getParam('coinHigh')+'   Low : $ ' + navigation.getParam('coinLow')},
                {key: 'Price $ Change in 24h: $ '+ navigation.getParam('coinPrice')},   
                
            ]}
            renderItem = {({item}) =>
                <ListItem
                    title={item.key}
                    
                />
            }
            /> 
        </SafeAreaView>    
        );  
    }
}

export default CryptoDetail;
