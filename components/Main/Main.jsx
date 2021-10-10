import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from 'native-base';
import Form from '../Form/Form';
import CountdownList from "../CountdownList/CountdownList";

const palette = {
    primary: '#1565c0',
    primaryLight: '#5e92f3',
    primaryDark: '#003c8f'
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  countdownListContainer: {
    flex: 9
  },

  formButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10
  },

  formButton: {
    backgroundColor: palette.primary
  },

  form: {
	  width: '100%'
  }

});

const Main = (props) => {

	const [renderForm, setRenderForm] = useState(false);
	const [formData, setFormData] = useState(null);

	const handleAddCounterClick = () => {
		setRenderForm(true);
	}

	const goBackFromForm = () => {
		setRenderForm(false);
		setFormData(null);
	}

	const handleEditPress = (countdownData) => {
		setFormData(countdownData);
		setRenderForm(true);
	}

	if (renderForm) {
		return (
			<Form 
				goBack={goBackFromForm}
				style={styles.form}
				id={formData ? formData.id : null}
				oldTitle={formData ? formData.title : null}
				oldDate={formData ? formData.date : null}
			/>
		)
	}

  	return (

		<View style={styles.container}>
			<View style={styles.countdownListContainer}>
				<CountdownList handleEditPress={handleEditPress}/>
			</View>

			<View style={styles.formButtonContainer}>
				<Button 
					size="lg"
					style={styles.formButton}
					onPress={() => handleAddCounterClick()}
				>
					Add Counter
				</Button>
			</View>
			
		</View>
	);
}

export default Main;
