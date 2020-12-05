import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, StatusBar, Dimensions, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import SubGallery from './SubGallery';

const arraySubSplitter = (arr = [], subArrSize = 10) => {
  const result = [];

  for (let i = 0; i < Math.ceil(arr.length / subArrSize); i++) {
    result[i] = arr.slice(i * subArrSize, (i * subArrSize) + subArrSize);
  }

  return result;
};

const NAV_HEIGHT = 45;

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [particleSize, setParticleSize] = useState({
    width: Dimensions.get('window').width / 4,
    height: (Dimensions.get('window').height - NAV_HEIGHT) / 4
  });

  useEffect(() => {
    (async () => {
      const {status} = await ImagePicker.requestCameraRollPermissionsAsync();

      if (status !== 'granted') {
        alert('Please turn on the permission');
      }
    })();
  }, []);

  const pickImage = async () => {
    const pickedItem = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1
    });

    if (!pickedItem.cancelled) {
      setGallery(prevState => [...prevState, { uri: pickedItem.uri }]);
    }
  };

  const isPortrait = () => {
    const dimension = Dimensions.get('window');
    return dimension.height >= dimension.width;
  };

  Dimensions.addEventListener('change', () => {
    const currentDimension = Dimensions.get('window');
    setParticleSize({
      width: currentDimension.width / (isPortrait() ? 4 : 4),
      height: (currentDimension.height - NAV_HEIGHT) / (isPortrait() ? 4 : 2)
    });
  });

  const galleryComponent = arraySubSplitter(gallery).map(
    subGallery => (
      <SubGallery
        key={subGallery[0].uri}
        gallery={subGallery}
        w={particleSize.width}
        h={particleSize.height}
      />
    )
  );

  return (
    <View style={styles.header}>
      <View style={styles.picker}><Button title='Tap to choose an image' onPress={pickImage} /></View>
      {gallery.length !== 0 && (
        <ScrollView style={styles.gallery}>
          {galleryComponent}
        </ScrollView>
      )}
      {gallery.length === 0 && <View style={styles.noShow}><Text>No content</Text></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  picker: {
    alignSelf: 'center',
    width: '100%',
  },
  noShow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});

export default Gallery;
