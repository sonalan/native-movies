import { StyleSheet, Image, View, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

interface Props{
    onPress: () => {},
    placeholder: string
}

const SearchBar = ({onPress, placeholder}: Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image 
            source={icons.search} 
            className='w-5' 
            resizeMode='contain' 
            tintColor='#ab8bff' 
        />
        <TextInput 
            onPress={onPress}
            onChangeText={() => {}}
            placeholder={placeholder}
            value=''
            placeholderTextColor='#a8b5db' 
            className='flex-1 ml-2 text-white' 
        />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({})