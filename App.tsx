import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, FlatList, Pressable, Dimensions, Switch } from 'react-native';

const { width: screenWidth } = Dimensions.get('window')

import { VSlider } from './src/components/v-slider'

export default function App() {
  const [sliderValue, setSliderValue] = React.useState<number>(0)

  return (
    <View className="h-full bg-zinc-900">
      <View className="px-4 py-8">
        <View className="px-8 py-4 bg-zinc-700 text-white rounded-lg flex-row space-between">
          <Text className="text-white w-8/12">Open up App.tsx to start working on your app!</Text>
          <Switch className="ml-auto" />
        </View>
      </View>
      <View>
        <VSlider value={sliderValue} onChange={setSliderValue} />
        <Text className="mb-4 color-white text-lg font-bold px-4">Światło rgb</Text>
        <FlatList
          className="px-4 mr-4"
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Array(3).fill('')}
          renderItem={(item: any, index: any) => {
            return (
              <View key={index} className="flex mr-4 h-60">
                <Pressable className={`w-[${screenWidth * 0.8}px] h-full bg-zinc-700 p-10 rounded-lg items-center justify-center`}>
                  <Text className="text-6xl text-white font-bold">Item {index}</Text>
                </Pressable>
              </View>
            )
          }}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
