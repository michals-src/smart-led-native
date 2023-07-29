import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, FlatList, Pressable, Dimensions, Switch, Button, TouchableOpacity } from 'react-native';

import AbtDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');

import { VSlider } from './src/components/v-slider';
import { HSlider } from './src/components/h-slider';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { colors } from './src/utils';

export default function App() {
	const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
	const [sliderValue, setSliderValue] = React.useState<number>(0);
	const [sliderValue2, setSliderValue2] = React.useState<number>(0);

	const snapPoints = React.useMemo(() => ['80%', '80%'], []);

	const handlePresentModalPress = React.useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<View className='h-full bg-zinc-900'>
			<BottomSheetModalProvider>
				<ScrollView>
					<View className='px-4 py-8 relative'>
						<View className='bg-zinc-800 px-4 py-4 text-white rounded-lg flex-row space-between items-center'>
							<View className='w-8/12'>
								<Text className='text-base leading-6 text-white w-full my-0'>Główne zasilanie urządzenia</Text>
								<Text className='text-sm leading-4 text-zinc-500 w-full my-0'>Zarządzenie zasilaniem wszystkich urządzeń</Text>
							</View>
							<Switch className='ml-auto' />
						</View>
					</View>

					<View>
						<Text className='pl-8 pr-4 mt-4 mb-2 text-sm font-bold text-white'>Światło kolorowe</Text>
						<FlatList
							className='w-full pl-4'
							horizontal
							showsHorizontalScrollIndicator={false}
							data={Array(3).fill('')}
							renderItem={(item: any, index: any) => {
								return (
									<View
										key={index}
										className='flex mr-4 h-60'>
										<TouchableOpacity
											onPress={handlePresentModalPress}
											className={`w-[calc(100vw*0.5)] h-60 bg-zinc-800 rounded-2xl px-6 py-4 flex flex-col justify-end`}
											style={{
												backgroundColor: 'rgba(0,100,255,.3)',
											}}>
											<View className='mb-4'>
												<Ionicons
													name='color-filter-outline'
													size={32}
													color='#0090ff'
												/>
											</View>
											<Text className='text-white text-2xl'>Kanał</Text>
											<View className='mt-1 flex flex-row items-center opacity-60'>
												<Ionicons
													name='sunny-outline'
													size={16}
													color='#ffffff'
												/>
												<Text className='text-white text-basic px-1'>40 %</Text>
											</View>
										</TouchableOpacity>
									</View>
								);
							}}
						/>
					</View>

					<View className='px-4 mt-4 relative'>
						<Text className='px-3 mt-4 mb-2 text-sm font-bold text-white'>Oświetlenie</Text>
						<TouchableOpacity className='bg-zinc-800 px-4 py-4 text-white rounded-lg flex-row space-between items-center'>
							<Ionicons
								name='bulb'
								size={32}
								color='#ffffff'
							/>
							<View className='w-8/12 px-4'>
								<Text className='text-sm leading-4 text-zinc-400 w-full my-0'>Wył.</Text>
							</View>
							<Switch className='ml-auto' />
						</TouchableOpacity>
					</View>
				</ScrollView>

				<BottomSheetModal
					ref={bottomSheetModalRef}
					index={1}
					snapPoints={snapPoints}
					backgroundStyle={{
						backgroundColor: '#000000',
					}}>
					<View className='w-full flex flex-col'>
						<View className='px-4 pb-8'>
							<Text className='text-2xl font-bold text-white'>Kanał</Text>
						</View>
						<Text className='text-white text-base px-4'>Jasność światła</Text>
						<Text className='text-zinc-400 text-sm px-4 mb-4'>Minimalna wartość oznacza wyłączenie urządzenia</Text>
						<View className='px-4'>
							<View className='w-full flex flex-row items-center justify-center bg-zinc-700 px-1 py-4 rounded-xl'>
								<View className='w-1/12 mr-2'>
									<Ionicons
										name='bulb-outline'
										size={25}
										color='#ffffff'
									/>
								</View>
								<View className='w-8/12'>
									<HSlider
										width={200}
										value={sliderValue2}
										onChange={setSliderValue2}
									/>
								</View>
								<Text className='w-2/12 text-white'>{Math.floor(sliderValue2)} %</Text>
							</View>
						</View>
						<Text className='text-white text-base px-4 mt-6'>Kolor oświetlenia</Text>
						<View className='mt-4 px-4'>
							<FlatList
								className='-px-2'
								horizontal={true}
								showsHorizontalScrollIndicator={false}
								data={colors}
								renderItem={(item: any, index: number) => {
									return (
										<View
											className='px-1'
											key={index}>
											<Pressable
												onPress={() => alert(item.item)}
												className={`w-8 h-8 relative rounded-xl`}
												style={{ backgroundColor: `#${item.item}` }}>
												<Ionicons
													name='checkmark-circle-outline'
													size={24}
													color='#ffffff'
													style={{ position: 'absolute', top: 3, left: 4.5 }}
												/>

												<Text className='text-transparent'>Lol</Text>
											</Pressable>
										</View>
									);
								}}
							/>
						</View>
					</View>
				</BottomSheetModal>
			</BottomSheetModalProvider>
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
