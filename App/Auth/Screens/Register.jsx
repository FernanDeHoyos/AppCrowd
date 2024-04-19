import { TextInput,  Text, StyleSheet, View} from 'react-native';
import { useForm } from '../../hooks/useForm';
import { Button } from 'react-native-elements';
import { supabase } from '../../lib/supabase';

export const Register = ({ navigation }) => {

  const {handleChange, resetForm, values} = useForm({
    phone: '',
    password:''
})

const {phone, password, } = values;
 

  const handleRegister = async() => {
const { data, error } = await supabase.auth.signUp({
  phone: phone,
  password: password,
  options: {
    channel: 'sms'
  }
})
     console.log(error); 
}

const SignIn = () => {
  console.log('first')
}

  

  return (
    <View style={styles.container}>
    
     <Text style={styles.title}>Welcome to MyApp!</Text>

    <View style={styles.containerButtom}>
    <Text style={styles.TextInput}>SignUp</Text>
    <View style={styles.containerBoxInput}>

  

    <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone</Text>
        <TextInput 
            style={styles.Input}
            placeholder='Enter your phone'
            onChangeText={(text) => handleChange('phone', text)}
            value={phone}
        />
    </View>

<View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput 
            style={styles.Input}
            onChangeText={(text) => handleChange('password', text)}
            placeholder='Enter your password'
            value={password}
            secureTextEntry={true}
        />
    </View>

   <View>
   <Button 
    title='Register'
    onPress={handleRegister}
     > </Button>
   </View>
    
    </View>
    <Button titleStyle={{ marginHorizontal: 20, color: 'black' }} onPress={() => navigation.navigate('Login')} title={'Ya tengo cuenta'} type='clear'/>
    </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#117C6F', 
        paddingTop: 100
      },
    containerButtom: {
      flex: 1,
      width: '100%',
      backgroundColor: '#f6f6f6',
      alignItems: "center",
      justifyContent: 'space-evenly',
      borderTopLeftRadius: 80,
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    TextInput:{
        fontSize: 30,
    },
    containerTop:{
        backgroundColor: '#000',
        height: 80
    },
    containerBoxInput:{
        width: '80%',
        justifyContent: 'space-between',
        gap: 15,
    },
    Input: {
        width: '100%', 
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15, 
        paddingVertical: 10, 
        backgroundColor: '#FFF',
    },

    inputContainer: {
        padding: 5,
        backgroundColor: '#FFF',
        borderRadius: 10,

    },
    label: {
        color: '#000',
        paddingLeft: 5
    }, 
 
   
  });
