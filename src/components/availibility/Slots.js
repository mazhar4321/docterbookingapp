import { StyleSheet, Text, View , TouchableOpacity} from 'react-native'
import React from 'react'
import SlotsIcon from '../../assets/assets/slots.svg'
import { responsiveScreenHeight } from 'react-native-responsive-dimensions'

const Slots = ({date, slots, handlePress}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textlg}>{date} </Text>
        <View style={{flexDirection:"row", gap: 8, alignItems:"center"}}>
            <SlotsIcon/>
            <Text style={styles.textslot}>{slots}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlePress} style={styles.btn}>
                 <Text style={styles.btnText}>Edit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Slots

const styles = StyleSheet.create({
    container:{
        borderColor:"#F5F5F5",
        borderWidth: 1,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent:"space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: responsiveScreenHeight(1.5)
    },
    textlg:{
               fontFamily:"PlusJakartaSans-SemiBold",
               fontSize: 14,
               color: "#000",
               marginBottom: 5
    },
    textslot:{
           fontFamily:"PlusJakartaSans-Medium",
           fontSize: 10,
           color: "#0B0A07"
    },
    btn:{
        backgroundColor:"#E5F3E3",
        borderRadius: 8,
        height: 30,
        alignItems:"center",
        justifyContent:"center"
    },
    btnText:{
        color:"#77BE6C",
        fontFamily:"PlusJakartaSans-Medium",
        fontSize: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
    }
})