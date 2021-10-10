import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon } from 'react-native-elements';
import CountdownService  from '../../services/CountdownService/CountdownService';
import DateTimePicker from '@react-native-community/datetimepicker'

import {
  FormControl,
  Input,
  Button,
  Pressable
} from "native-base"

const palette = {
    primary: '#1565c0',
    primaryLight: '#5e92f3',
    primaryDark: '#003c8f'
}

const styles = {
    main: StyleSheet.create({
        container: {
            width: "90%",
            padding: 20,
            margin: 20,
            backgroundColor: "#eaeaea"
        },
        saveButton: {
            marginTop: 50,
            backgroundColor: palette.primary
        },
        discardButton: {
            marginTop: 10,
            backgroundColor: 'red'
        }
    }),
    
    formControlTitle: StyleSheet.create({
        input: {
            backgroundColor: 'white'
        }
    }),
    formControlDatetime: StyleSheet.create({
        container: {
            marginTop: 20
        },
        mainView: {
            flexDirection: 'row'
        },
        iconView: {
            paddingTop: 10, 
            flex: 2, 
            alignItems: 'center', 
            justifyContent: 'flex-start'
        },
        inputView: {
            flex: 8
        },
        input: {
            backgroundColor: 'white'
        }
    }),
};

const Form = ({goBack, oldTitle, oldDate, id} = {}) => {

    const [validTitle, setValidTitle] = useState(oldTitle ? true : false);
    const [title, setTitle] = useState(oldTitle ? oldTitle : "");
    const [date, setDate] = useState(oldDate ? new Date(oldDate) : new Date());

    const [renderDatePicker, setRenderDatePicker] = useState(false);
    const [renderTimePicker, setRenderTimePicker] = useState(false);

    const onChangeTitle = (text = "") => {

        setTitle(text); 
        setValidTitle(false);

        if (text && text.length >= 4 && text.length <= 30) {
            setValidTitle(true);
        }

    }

    const onDatePress = () => {
        setRenderDatePicker(true);
    }

    const onDateChange = (event, date) => {
        setRenderDatePicker(false);
        
        if (date) {
            setDate(date);
            setRenderTimePicker(true);
        
        } else {
            setDate(new Date());
        }
    }

    const onTimeChange = (event, date) => {
        
        setRenderTimePicker(false);

        if (date) {
            setDate(date);
        
        } else {
            setRenderDatePicker(true);
        }

    }
    
    const onSavePress = () => {

        let text = title.trim()
            .toLowerCase()
            .replace(/\b\w/g, char => char.toUpperCase());

        if (!text) {
            setValidTitle(false);
            return;
        }

        if (!date) {
            return;
        }

        const countdown = {
            id: id ? id : Date.now().toString(),
            date: date.getTime(),
            title: text
        }

        if (id) {
            CountdownService.editCountdown(countdown)
                .then(data =>{if (goBack) goBack()})
                .catch(error => console.log(error));

        } else {
            CountdownService.addCountdown(countdown)
                .then(data =>{if (goBack) goBack()})
                .catch(error => console.log(error));
        }

    }

    const printFormatedDate = (date) => {

        const zeroPad = (num) => String(num).padStart(2, '0');

        let hours = zeroPad(date.getHours());
        let minutes = zeroPad(date.getMinutes());

        let day = zeroPad(date.getDate());
        let month = zeroPad((date.getMonth() + 1));
        let year = zeroPad(date.getFullYear());

        return `${day}/${month}/${year} - ${hours}:${minutes}`;
    }
    
    
    if (renderDatePicker) {
        return (
            <DateTimePicker
                value={date}
                minimumDate={new Date()}
                mode={'date'}
                /*display="default"*/
                onChange={onDateChange}
            />
        )
    }

    if (renderTimePicker) {
        return (
            <DateTimePicker
                value={date}
                minimumDate={date}
                mode={'time'}
                onChange={onTimeChange}
            />
        )
    }

    return (
        <View style={styles.main.container}>
            
            <FormControl 
                isInvalid={!validTitle}
                isRequired 
            >
                <Input autoCapitalize="none" secureTextEntry={true} keyboardType={"visible-password"} style={styles.formControlTitle.input} value={title} placeholder="Title" onChangeText={onChangeTitle} />
                <FormControl.HelperText>
                    Min 4 character. Max 30
                </FormControl.HelperText>
                <FormControl.ErrorMessage>
                    Something is wrong.
                </FormControl.ErrorMessage>

            </FormControl>

            <FormControl 
                style={styles.formControlDatetime.container} 
                isInvalid={!date}
                isRequired
            >

                <View style={styles.formControlDatetime.mainView}>

                    <View style={styles.formControlDatetime.iconView}>
                        <Icon
                            material='material'
                            name='event'
                            onPress={() => onDatePress()} 
                            size={35}
                        />
                    </View>
                    
                    <View style={styles.formControlDatetime.inputView}>
                        <Pressable onPress={() => onDatePress()}>
                            <Input 
                                style={styles.formControlDatetime.input} 
                                isReadOnly 
                                value={date != null ? printFormatedDate(date) : ""} 
                                placeholder="Datetime" 
                            />
                        </Pressable>    
                        <FormControl.HelperText>
                            Click and select a date
                        </FormControl.HelperText>
                        <FormControl.ErrorMessage>A date must be selected.</FormControl.ErrorMessage>
                    </View>
                </View>

            </FormControl>

            <Button 
                size="lg"
                style={styles.main.saveButton}
                onPress={() => onSavePress()}
            >
                {id ? "Modify" : "Save"}
            </Button>
            <Button 
                size="lg"
                style={styles.main.discardButton}
                onPress={() => {if (goBack) goBack()}}
            >
                Discard
            </Button>
        </View>
    );
}

export default Form;
