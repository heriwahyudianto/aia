import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { parseString } from "react-native-xml2js";

export default App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.flickr.com/services/feeds/photos_public.gne')
      .then((response) => response.text())
      .then((json) => {
        parseString(json, function (err, result) {
          setData(result.feed.entry);
        });
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, padding: 24 }}>
        <ActivityIndicator/>
      </View>
    );
  } else {
    var flickrs = [];
    for (let index = 0; index < data.length; index++) {
      flickrs.push(
        <View key={index}>
          <View>
            <Text>{data[index].author[0].name[0]}</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flex: 1, padding: 24 }}>
        {flickrs}
      </View>
    );
  }
};
