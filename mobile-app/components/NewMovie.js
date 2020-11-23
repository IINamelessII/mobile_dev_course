import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function NewRecord({onAddMovie}) {
  const [releaseDate, setReleaseDate] = useState(new Date());
  const [isPickerShown, setIsPickerShown] = useState(false);
  const [type, setType] = useState('');
  const [isTypeValid, setIsTypeValid] = useState(false);
  const [title, setTitle] = useState('');
  const [isTitleValid, setIsTitleValid] = useState(false);

  const navigation = useNavigation();
  const onPickerChange = (event, newReleaseDate) => {
    setIsPickerShown(false);
    setReleaseDate(newReleaseDate || releaseDate);
  };

  const onTypeChange = newType => {
    setType(newType);

    newType = newType.trim();
    setIsTypeValid(newType.length >= 3 && newType.length <= 15);
  };

  const onTitleChange = newTitle => {
    setTitle(newTitle);

    newTitle = newTitle.trim();
    setIsTitleValid(newTitle.length >= 3 && newTitle.length <= 30);
  };

  const onAddItemHandler = () => {
    onAddMovie({
      Title: title,
      Type: type,
      Released: moment(releaseDate).format('D MMMM YYYY'),
      Year: moment(releaseDate).format('YYYY'),
      imdbID: `tt${Math.random()}`,  // let's believe in it XD
    });

    setTitle('');
    setType('');
    setReleaseDate(new Date());
    setIsTitleValid(false);
    setIsTypeValid(false);

    navigation.navigate('Movies');
  };

  const fieldIsValid = isValid => isValid ? <Text style={{color: '#3cb371'}}>✔</Text> : <Text style={{color: 'red'}}>✘</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Enter a Title:  {fieldIsValid(isTitleValid)}</Text>
      <TextInput
        style={styles.textInput}
        numberOfLines={1}
        autoCapitalize='none'
        autoCorrect={false}
        clearButtonMode='always'
        placeholder='Movie Title (up to 30 characters)'
        value={title}
        onChangeText={onTitleChange}
      />
      <Text style={styles.label}>Enter a Type:  {fieldIsValid(isTypeValid)}</Text>
      <TextInput
        style={styles.textInput}
        numberOfLines={1}
        autoCapitalize='none'
        autoCorrect={false}
        clearButtonMode='always'
        placeholder='Movie Type (up to 15 characters)'
        value={type}
        onChangeText={onTypeChange}
      />
      <Text style={styles.label}>Select a Release Date:</Text>
      <Button title={moment(releaseDate).format('MMMM D, YYYY')} onPress={() => setIsPickerShown(true)} />
      {isPickerShown && (
        <DateTimePicker
          mode='date'
          value={releaseDate}
          onChange={onPickerChange}
          maximumDate={new Date(2050, 0, 0)}
          minimumDate={new Date(1895, 2, 22)}
        />
      )}
      {isTitleValid && isTypeValid && (
        <Button
          buttonStyle={styles.addButton}
          TouchableComponent={TouchableWithoutFeedback}
          title='Add Movie'
          type='clear'
          onPress={onAddItemHandler}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginHorizontal: 13,
  },
  label: {
    paddingVertical: 12.5,
    marginHorizontal: 4.5,
    fontSize: 18
  },
  textInput: {
    marginHorizontal: 4.5,
    paddingVertical: 6.5,
    paddingHorizontal: 12.5,
    borderRadius: 7.5,
    backgroundColor: 'black',
    color: 'white',
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
    fontSize: 17
  },
  addButton: {
    marginVertical: 12.5
  }
});
