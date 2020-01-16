import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from './Home';
import CryptoDetail from './CryptoDetail';

const MainNavigator = createStackNavigator({
    Home: {screen: Home},
    CryptoDetail: {screen: CryptoDetail},
});
const App = createAppContainer(MainNavigator);
export default App;