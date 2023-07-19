import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, FlatList, Pressable, Dimensions, Switch } from 'react-native';

import PlugIcon from 'react-native-bootstrap-icons/icons/plug';
import CheckCircleFillIcon from 'react-native-bootstrap-icons/icons/check-circle-fill';

const { width: screenWidth } = Dimensions.get('window');

import { VSlider } from './src/components/v-slider';

export default function App() {
	const [sliderValue, setSliderValue] = React.useState<number>(0);

	return (
		<View className='h-full bg-blue-800'>
			<View className='px-4 py-8'>
				<View className='px-4 py-4 text-white rounded-lg flex-row space-between items-center'>
					<View className='w-8/12'>
						<Text className='text-base leading-6 text-white w-full my-0'>Główne zasilanie urządzenia</Text>
						<Text className='text-sm leading-4 text-blue-300 w-full my-0'>Zarządzenie zasilaniem wszystkich urządzeń</Text>
					</View>
					<Switch className='ml-auto' />
				</View>
			</View>
			<View className='h-full mt-8 bg-zinc-900 rounded-t-3xl'>
				<CheckCircleFillIcon
					width='50'
					height='50'
					fill='rgb(189, 189, 189)'
				/>
				<VSlider
					width={70}
					value={sliderValue}
					onChange={setSliderValue}
				/>
				<Text className='mb-4 color-white text-lg font-bold px-4'>Światło rgb</Text>
				<FlatList
					className='px-4 mr-4'
					horizontal
					showsHorizontalScrollIndicator={false}
					data={Array(3).fill('')}
					renderItem={(item: any, index: any) => {
						return (
							<View
								key={index}
								className='flex mr-4 h-60'>
								<Pressable
									className={`w-[${screenWidth * 0.8}px] h-full bg-zinc-700 p-10 rounded-lg items-center justify-center`}>
									<Text className='text-6xl text-white font-bold'>Item {index}</Text>
								</Pressable>
							</View>
						);
					}}
				/>
			</View>
			<StatusBar style='dark' />
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
