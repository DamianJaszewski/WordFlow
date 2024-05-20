import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const GetImage = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = () => {
      const options = {}; // Możesz dostosować opcje wyboru obrazu
  
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          // Użytkownik anulował wybór obrazu
        } else if (response.error) {
          // Błąd związany z wyborem obrazu
        } else {
          // Zaktualizuj wybrany obrazek
          setSelectedImage({ uri: response.uri });
        }
      });
    };

    const changeHandler = (e) => {
      const { files } = e.target
      for (let i = 0; i < files.length; i++) {
        debugger;
        const file = files[i]; // OR const file = files.item(i);
      }
    }
  

    return (
    <View>
      <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
      <Button title="Upload Image" onPress={handleImageUpload} />
      <input type="file" accept="image/*" multiple />
      <input
        type="file"
        id="file"
        onChange={changeHandler}
        accept="image/*"
        multiple
      />
    </View>
  );
}

export default GetImage