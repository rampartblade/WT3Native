import React from 'react';
import { StyleSheet, Text, SafeAreaView,Button, FlatList, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {ListItem} from 'react-native-elements';
//import './layoutit/src/css/bootstrap.css';
//import './layoutit/src/css/bootstrap-reboot.css';
//import Navbarcomp from './navbarcomp';

class Home extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
        crypto: [],
    }
  }
  componentDidMount(){
      axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cethereum%2Cripple%2Clitecoin%2Cverge%2Cdogecoin%2Ccardano%2Cmonero%2Cstellar&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        .then(res=> {
            const crypto = res.data;
            console.log(crypto);
            this.setState({crypto});
        })
  }
    static navigationOptions = {    
        title: 'Crypto Price Tracker and Info',  
    }; 

    keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => (
        <ListItem
            onPress={() => this.props.navigation.navigate('CryptoDetail',{
                coinID: item.id,
                coinName: item.name,
                coinSymbol: item.symbol,
                coinCurrentPrice: item.current_price,
                coinHigh: item.high_24h,
                coinLow: item.low_24h,
                coinPrice: item.price_change_24h,
                coinImage: item.image
            })}
            title={item.name}
            leftAvatar = {{ source: { uri: item.image /*'https://ui-avatars.com/api/?name=' + item.name*/} } }
            bottomDivider
            chevron
        />
    )

render() {
    return (
        <ScrollView>
            <SafeAreaView style={{ margin: 20}}>
                <Text>Welcome!</Text>
                <SafeAreaView style={{ marginTop: 10, borderTopWidth:1, borderTopColor:'#000'}}>
                    <Text>Selamat datang di website kami, website kami menyediakan informasi harga Cryptocurency yang sedang terkenal.</Text>
                </SafeAreaView>
                <SafeAreaView style={{marginTop:20}}>
                    <Text>Home</Text>
                    <Text>Crypto Price Checker</Text>
                </SafeAreaView>

                <FlatList
                    keyExtractor={this.keyExtractor}
                    data={this.state.crypto}
                    renderItem={this.renderItem}
                />
            </SafeAreaView>
       </ScrollView>

    );
  }
}

export default Home;