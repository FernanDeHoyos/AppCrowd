import { View } from "react-native"
import { useAuthStore } from "../../hooks/useAuthStore"
import { Button } from "react-native"

export const Settings = () => {

    const {startLogout} = useAuthStore()

    const onLogout = async() => {
        await startLogout()
    }

  return (
    <View>
        <Button title={'Logout'} onPress={onLogout}> </Button>
    </View>
  )
}
