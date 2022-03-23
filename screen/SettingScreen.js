import React , {useState, useEffect}  from 'react';
import { View, Text , StyleSheet} from 'react-native';
import { NativeModules } from 'react-native';


function SettingScreen() {

  const [idPhone, setPhone] = useState('');
  const { IdPhone } = NativeModules;

  const getId = async () => {
    IdPhone.getPhoneID()
      .then((id) => {
        setPhone(id);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  useEffect(() => {
    getId(); 
  }, []);

  return (
    <View  style={styles.viewID}>
      <Text style={styles.textID}>ID du terminal</Text>
      <Text style={styles.textID}>{idPhone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewID: {
    marginTop: 30,
    flexDirection:'row',
    justifyContent: 'space-between',
    padding: 15,
  },
 textID:{
   fontSize: 15,
 }
});

export default SettingScreen;

