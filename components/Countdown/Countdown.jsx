import React, { useState } from "react";
import { Text, View, StyleSheet} from "react-native";
import { Icon } from 'react-native-elements';
import CountdownCore from "../CountdownCore/CountdownCore";
import CountdownService  from '../../services/CountdownService/CountdownService';
import { Divider } from "native-base";

const palette = {
    primary: '#1565c0',
    primaryLight: '#5e92f3',
    primaryDark: '#003c8f'
}

const styles = StyleSheet.create({

	container: {
		backgroundColor: '#bdbdbd',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		padding: 20
    },

	settingsView: {
		flexDirection: 'row'
	},

    title: {
		fontWeight: 'bold',
		fontSize: 15,
		flex: 15,
		flexDirection: 'row'
    },

	button: {
		flex: 2,
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},

	menu: {
		maxWidth: 200,
		marginRight: 55,
		paddingTop: 0,
		paddingBottom: 0,
		flexDirection:'column',
		justifyContent: 'flex-start',
		borderColor: 'white',
		borderRadius: 5
	},

	countdownDigit: {
		backgroundColor: palette.primaryLight
	},

	countdownDigitTxt: {
		color: '#FFF'
	}
  
})

const Countdown = ({ date, title, id, handleEditPress } = {}) => {
	
	if (!date || !title) {
		return (null);
	}

	const [seconds, setSeconds] = useState(getSecondsUntil(date));

	function getSecondsUntil(date) {
		date = new Date(date);

		let now = new Date();
		let seconds = (date.getTime() - now.getTime()) / 1000;

		return seconds;
	}

	const onFinish = () => {
	}

	const onPress = () => {
		alert("onPress")
	}

	const onEdit = () => {
		if (handleEditPress && typeof(handleEditPress) == "function") {
			handleEditPress({date, title, id});
		}
	}

	const onDelete = () => {	
		CountdownService.removeCountdown(id)
			.then(data => alert("removed!"))
			.catch(error => console.log(error));
	}

	return (

		<View style={styles.container} >

			<View style={styles.settingsView}>
				<Text style={styles.title}>
					{title}
				</Text>
				
				<View style={styles.button}>
					<Icon
						material='material'
						name='delete'
						color={palette.primaryDark}
						onPress={() => onDelete()} 
					/>
					<Icon
						material='material'
						name='edit'
						color={palette.primaryDark}
						onPress={() => onEdit()}
					/>
				</View>

			</View>
			
			<Divider my={2} />

			<CountdownCore
				until={seconds}
				onFinish={() => onFinish()}
				onPress={() => onPress}
				size={30}
				digitStyle={styles.countdownDigit}
				digitTxtStyle={styles.countdownDigitTxt}
			/>
		</View>
	);
  
}

export default Countdown;
