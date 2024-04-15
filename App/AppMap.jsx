import { NavigationContainer } from "@react-navigation/native"
import { userAuthStore } from "./Helpers/userAuthStore"
import { TabButtom } from "./Map/Components/TabsButtom"
import { AuthNavigate } from "./Auth/AuthNavigate/AuthNavigate"
import { useEffect } from "react"
import { Text } from "react-native"

export const AppMap = () => {

    const {status, checkAuthToken} = userAuthStore()

    useEffect(() => {
        checkAuthToken()
      },[])
      
        if(status === 'checking'){
            return  <><Text>Cargando...</Text></>
        }
  
    return (
      
      <NavigationContainer>
      { (status === 'authenticated') ? < TabButtom/> : <AuthNavigate />}
      </NavigationContainer>
    )

}