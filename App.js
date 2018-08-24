import React  from 'react';
import { View, ScrollView, Image, StyleSheet, Text, Dimensions, StatusBar } from 'react-native';
import Slider from './component/slider';


export default class App extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const screenWidth = Dimensions.get('window').width;
    return (
     
        <Slider>
          <Image  source={require('./assets/download1.jpg')} style={{width:screenWidth}}/>
          <Image  source={require('./assets/download2.jpg')} style={{width:screenWidth}} />
          <Text style={[styles.textStyle,{width:screenWidth, height:135}]}>Welcome World</Text>
          <Image  source={require('./assets/download3.jpg')} style={{width:screenWidth}} />
        </Slider>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
   alignItems:'center'
  },
  textStyle:{
    flex: 1,
    backgroundColor: 'orange',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 70,
  }
})
