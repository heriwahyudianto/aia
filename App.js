import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
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

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator/> : (
        
      )}
    </View>
  );
};
