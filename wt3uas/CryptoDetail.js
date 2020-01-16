import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image, FlatList, View } from 'react-native';
import axios from 'axios';
//import {Avatar, ListItem} from 'react-native-elements';

class CryptoDetail extends React.Component {      
    /*keyExtractor = (item, index) => index.toString()
    renderItem = ({ item }) => (
        <Avatar
            size = "large" 
            source= {{ uri:  'https://ui-avatars.com/api/?name=' + item.name }}
            bottomDivider
            chevron
        />
    )*/
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

    cryptcolor(){
        const {navigation} = this.props;
        if(navigation.getParam('coinPrice') < 0){
            return styles.priceDown;
        } 
        else if (navigation.getParam('coinPrice') > 0){
            return styles.priceUp;
        }
    }

    render() {  
        const { navigation } = this.props; // sama dengan this.props.navigation 
        const style = this.cryptcolor();
        return (      
        <SafeAreaView style={{flex : 1,marginTop: 10, marginLeft:10,}}>
            <Image source={{uri: encodeURI(navigation.getParam('coinImage'))}} style={{width:100, height:100, marginLeft:10,  backgroundColor:"#D3D3D3", borderRadius:100}}/>    
            {/* <FlatList
            data={[
                {key: 'Cryptocurrency Name: '+ navigation.getParam('coinName')+' ('+ navigation.getParam('coinSymbol')+')'},
                {key: 'Current Price: $ '+ navigation.getParam('coinCurrentPrice')},
                {key: 'High & Low: \n'+ '\nHigh: $ '+navigation.getParam('coinHigh')+'   Low : $ ' + navigation.getParam('coinLow')},
                {key: 'Price $ Change in 24h: '+ navigation.getParam('coinPrice')},   
                
            ]}
            renderItem = {({item}) =>
                <ListItem 
                    title={item.key}
                />
            }
            />  */}
            <Text></Text>
            <Text>     Cryptocurrency Name : {navigation.getParam('coinName')} ({navigation.getParam('coinSymbol')})</Text>
            <Text> </Text>
            <Text>     Current Price : $ {navigation.getParam('coinCurrentPrice')}</Text>
            <Text></Text>
            <Text>     High & Low :</Text>
            <Text></Text>
            <Text>     High : $ {navigation.getParam('coinHigh')}    <Text>Low : $ {navigation.getParam('coinLow')}</Text></Text>
            <Text></Text>
            <Text>     Price $ Change in 24 h : <Text style={style}>{navigation.getParam('coinPrice')}</Text></Text>
            {/* <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.crypto}
                renderItem={this.renderItem}
                renderItem={({ item }) => <Text style={style}>{"City : " + navigation.getParam('coinPrice')}</Text>}
                bottomDivider
                chevron/> */}
        </SafeAreaView>   
        );  
    }
}

const styles = StyleSheet.create({
    priceUp: {
        color: 'rgb(0,153,51)',
    },
      priceDown: {
        color: 'rgb(204,51,51)',
      },
})

export default CryptoDetail;
