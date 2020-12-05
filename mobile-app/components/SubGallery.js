import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const SubGallery = ({gallery, w, h}) => {
  const p = {width: w, height: h};
  const p2 = {width: w * 2, height: h * 2};

  const SGImage = (uri, cls = p) => (
    <Image style={cls} source={uri} />
  );

  return (
    <>
      <View style={styles.horizontal}>
        <View style={styles.vertical}>
          {gallery[0] && SGImage(gallery[0])}
          {gallery[3] && SGImage(gallery[3])}
        </View>
        {gallery[1] && SGImage(gallery[1], p2)}
        <View style={styles.vertical}>
          {gallery[2] && SGImage(gallery[2])}
          {gallery[4] && SGImage(gallery[4])}
        </View>
      </View>
      <View style={styles.horizontal}>
        {gallery[5] && SGImage(gallery[5], p2)}
        <View style={styles.vertical}>
          {gallery[6] && SGImage(gallery[6])}
          {gallery[8] && SGImage(gallery[8])}
        </View>
        <View style={styles.vertical}>
          {gallery[7] && SGImage(gallery[7])}
          {gallery[9] && SGImage(gallery[9])}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export default SubGallery;
