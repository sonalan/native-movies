
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { ImageBackground, Image, Text, View } from 'react-native'

const TabIcon = ({focused, icon, title} : {focused: boolean, icon: any, title: string}) => {
    if(focused){
        return (
            <ImageBackground
                source={images.highlight}
                className='flex flex-row w-full flex-1 items-center justify-center min-w-[112px] min-h-14 mt-4 rounded-full overflow-hidden'
            >
                <Image 
                    source={icon} 
                    tintColor="#151312"
                    className="size-5"
                />
                <Text
                    className='text-secondary text-base font-semibold'
                >{title}</Text>
            </ImageBackground>
          )
    }else{
        return (
            <View>
                <Image 
                    source={icon} 
                    tintColor="#A8B5DB"
                    className="size-5"
                />
            </View>
          )
    }
  
}

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name='index' 
        options={{ 
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({focused}) => (
                <TabIcon focused={focused} icon={icons.home} title="Home" />
            )
        }} 
        
      />
      <Tabs.Screen 
        name='search' 
        options={{ 
            title: 'Search',
            headerShown: false, 
            tabBarIcon: ({focused}) => (
                <TabIcon 
                    focused={focused} 
                    icon={icons.search} 
                    title="Search" 
                />
            )
        }} 
      />
      <Tabs.Screen 
        name='saved' 
        options={{ 
            title: 'Saved',
            headerShown: false, 
            tabBarIcon: ({focused}) => (
                <TabIcon 
                    focused={focused} 
                    icon={icons.save} 
                    title="Saved" 
                />
            )
        }} 
      />
      
      <Tabs.Screen 
        name='profile' 
        options={{ 
            title: 'Search',
            headerShown: false, 
            tabBarIcon: ({focused}) => (
                <TabIcon 
                    focused={focused} 
                    icon={icons.person} 
                    title="Profile"
                />
            )
        }} 
      />
    </Tabs>
  )
}

export default TabsLayout
