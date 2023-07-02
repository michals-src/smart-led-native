import * as React from 'react';
import {
    View,
    PanResponder,
    StyleSheet,
    GestureResponderEvent,
    PanResponderGestureState,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const VSlider = function VSlider({
    min = 0,
    max = 100,
    step = 1,
    width = 100,
    height = 150,
    onChange,
    onComplete,
    value: initialValue
}: any) {

    const value = new Animated.Value<number>(initialValue);
    const _value = useSharedValue<number>(initialValue);
    const _moveStartValue = useSharedValue<number>(0);

    const computeBaseStyle = () => ({
        width,
        height
    })

    const sliderBaseStyles = React.useMemo(computeBaseStyle, [width, height]);

    const clamp = (newValue: number, minValue: number, maxValue: number) => {
        return Math.min(Math.max(newValue, minValue), maxValue);
    }

    const updateNewValue = (newValue: number) => {
        let valueToUpdate = clamp(newValue, min, max);
        _value.value = withSpring(valueToUpdate);
        value.setValue(valueToUpdate);
    };


    const calculateValues = () => {
        updateNewValue(initialValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(calculateValues, [initialValue]);

    // Initializing when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(calculateValues, []);

    const _calculateValue = (gestureState: PanResponderGestureState) => {
        const ratio = -gestureState.dy / height;
        const diff = max - min;
        return step
            ? Math.max(
                min,
                Math.min(
                    max,
                    // @ts-ignore
                    _moveStartValue.value + Math.round((ratio * diff) / step) * step
                )
            )
            : Math.floor(
                // @ts-ignore
                Math.max(min, _moveStartValue.value + ratio * diff) * 100
            ) / 100;
    };

    const onStartShouldSetPanResponder = () => true;
    const onMoveShouldSetPanResponder = () => false;
    const onPanResponderTerminationRequest = () => false;
    const onPanResponderGrant = () => {
        _moveStartValue.value = _value.value
    }
    const onPanResponderMove = (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
    ) => {
        onChange(_calculateValue(gestureState))
    }

    const onPanResponderRelease = (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
    ) => {
        const newValue = _calculateValue(gestureState)
        onChange(newValue);
        onComplete?.(newValue);
    }
    const onPanResponderTerminate = (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState
    ) => {
        onComplete?.(_calculateValue(gestureState))
    }

    const panResponder = React.useRef(PanResponder.create({
        onStartShouldSetPanResponder,
        onMoveShouldSetPanResponder,
        onPanResponderTerminationRequest,
        onPanResponderGrant,
        onPanResponderMove,
        onPanResponderRelease,
        onPanResponderTerminate
    })).current

    const sliderStyle = useAnimatedStyle(() => ({
        height: ((_value.value - min)) * height / (max - min),
        backgroundColor: '#444444',
        borderRadius: 5
    }), [_value]);

    return (
        <View style={[sliderBaseStyles]}>
            <View
                style={[
                    styles.container,
                    sliderBaseStyles,
                    { backgroundColor: '#000000' },
                ]}
                {...panResponder.panHandlers}
            >
                <Animated.View style={[sliderBaseStyles, styles.slider, sliderStyle]} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    slider: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 0,
    },
});

export default VSlider;