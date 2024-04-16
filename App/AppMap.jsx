import { NavigationContainer } from "@react-navigation/native"
import { useAuthStore } from "./hooks/useAuthStore"
import { TabButtom } from "./Map/Components/TabsButtom"
import { AuthNavigate } from "./Auth/AuthNavigate/AuthNavigate"
import { useEffect } from "react"
import { Text } from "react-native"

export const AppMap = () => {

    const {status,data_auth, checkAuthToken} = useAuthStore()
    
   console.log(status, data_auth)
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