import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Dimensions, Animated } from 'react-native';
import {Icon, Button, Container, Header, Content, Left} from 'native-base';

const {width} = Dimensions.get('window');
const FIXED_BAR_WIDTH = 280;
const BAR_SPACE = 10;
export default class Slider extends Component {
  constructor(props){
    super(props)
    this.state={
      slideNumber : 1,
      distance: 0
    }
    
    // this.horizontalScroll=this.horizontalScroll.bind(this);
    // this.nextImage=this.nextImage.bind(this);
  }
  numItems = this.props.children.length;
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  scrollX = new Animated.Value(0);

  
  doScroll = (direction, distance) => {
    let numItems = this.props.children.length;
    let scrollLength = numItems * 410;
    
    let way = (direction && direction === 'right') ? 1 : 1;
    if(direction == 'right'){ 
      console.log('Direction:' + direction)

      
        this.setState({
          
          slideNumber: this.state.slideNumber === numItems ? slideNumber=0 : this.state.slideNumber + 1,
          distance: this.state.distance === scrollLength ? distance=0 : this.state.distance + 410
          
        })
        console.log('SlideNumber:' + this.state.slideNumber)
        console.log('Distance:' + distance)
        return { x: this.state.slideNumber + this.state.distance * way, y: 0 , animated: true } 
    }

    if(direction == 'left'){  
      console.log('Direction:' + direction)
      
        this.setState({
          
          slideNumber: this.state.slideNumber === 0 ? slideNumber = numItems : this.state.slideNumber - 1,
          distance: this.state.distance === 0 ? distance=scrollLength : this.state.distance - 410
          
        })
        console.log('SlideNumber:' + this.state.slideNumber)
        console.log('Distance:' + this.state.distance)
        return { x: this.state.slideNumber + this.state.distance * way, y: 0 , animated: true } 
    }
    
  }

  horizontalScroll=(dir, dis)=>{
    this.refs['scrollView'].scrollTo(this.doScroll(dir,dis));
  }

  
  render() {
    const children = this.props.children;
    let position = Animated.divide(this.scrollX, width);
    let imageArray = []
    let barArray = [];
    const images = this.props.children
    
    images.forEach((child,i)=>{
      const thisImage =(
        child
      )
     
      imageArray.push(thisImage)
      
      const scrollBarVal = this.scrollX.interpolate({
        inputRange: [width * (i - 1), width * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })
      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View style={styles.container}>
        {/* <View> */}
          <ScrollView ref="scrollView" pagingEnabled horizontal={true} style={styles.contentContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent:{contentOffset:{x:this.scrollX}}}])} scrollEventThrottle={10}>
           
            {imageArray}
          
          </ScrollView>
          <View style={styles.barContainer}>
            {barArray}
          </View>
          <View style={ {left:10, position:'absolute',marginTop:120,zIndex:0 } }>
            <Icon style={{color:'#ffffff'}} name="arrow-round-back" onPress={this.horizontalScroll.bind(this,'left', 410)} />
          </View>
          <View style={ {right:10,position:'absolute',marginTop:120, zIndex:0 } }>
            <Icon style={{color:'#ffffff'}} name="arrow-round-forward" onPress={this.horizontalScroll.bind(this,'right', this.state.distance)} />
          </View>
         
       </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
 
  contentContainer:{
    marginTop: 50,
    paddingVertical: 20,
    backgroundColor: '#F5FCFF',
  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    top: 220,
    left:110,
    flexDirection: 'row',
    alignItems:'center',
  },
  bar: {
    backgroundColor: '#5294d6',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
})