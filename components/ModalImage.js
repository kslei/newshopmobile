import React, {useState, useRef, createRef} from 'react';
import { View, Modal, Pressable, Animated, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import { REACT_APP_API_URL } from 'react-native-dotenv';
import Icon from './Icon';
import { gStyle, $danger, $sizeIcon } from '../styles/style';

const ModalImage = ({vis, modal, onHide}) => {
  const [panEnabled, setPanEnabled] = useState(false)
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height

  const initialHeight = /* (height - width / (1 / 1)) / 2 */100
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(initialHeight)).current;
  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event([{
    nativeEvent: { scale }
  }],
    { useNativeDriver: true });

  const onPanEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY
    }
  }],
    { useNativeDriver: true });

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    console.log(nativeEvent.state)
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }
    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
        Animated.spring(translateY, {
          toValue: initialHeight,
          useNativeDriver: true
        }).start();
        setPanEnabled(false);
      }
      
    }
  };
  const reset = () => {
    scale.setValue(1)
    translateX.setValue(0)
    translateY.setValue(initialHeight)
    onHide()
  }  
  console.log(panEnabled)
  return (
  <View style={gStyle.container}>
    <Modal
      animationType="slide"
      visible={vis}
      onRequestClose={onHide}
      transparent={false}
    >
      <View style={[gStyle.container, { position: 'relative', padding: 'auto' }]}>
        <Pressable style={{ position: 'absolute', padding: 20, top: 10, right: 10, zIndex: 10 }} onPress={reset} >
          <Icon name='close' size={$sizeIcon} color={$danger} />
        </Pressable>
        <GestureHandlerRootView>
          <PanGestureHandler
            onGestureEvent={onPanEvent}
            ref={panRef}
            simultaneousHandlers={[pinchRef]}
            enabled={panEnabled}
            shouldCancelWhenOutside={false}
          >
            <Animated.View>
              <PinchGestureHandler
                ref={pinchRef}
                onGestureEvent={onPinchEvent}
                simultaneousHandlers={[panRef]}
                onHandlerStateChange={handlePinchStateChange}
              >
                <Animated.Image style={{ width: width, aspectRatio: 1 / 1, transform: [{ scale }, { translateX }, { translateY }] }} resizeMode='contain' source={{ uri: REACT_APP_API_URL + modal }} />
              </PinchGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </GestureHandlerRootView>
      </View>
    </Modal>
  </View>
  );
};
export default ModalImage;