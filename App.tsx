import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { API_BASE_URL } from "./src/default";
import { shuffleList } from "./src/utils";
import "react-native-url-polyfill/auto";
import server from "./src/devServer";

server.listen({onUnhandledRequest:"bypass"});

type User = {
  name: {
    first: string,
    last: string
  },
  picture: {
    large: string
  },
  phone: string,
  login:{
    uuid: string
  }
}

export default function App() {

  const [refreshing, setRefreshing] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch(`${API_BASE_URL}?take=8`)
        .then(data => data.json())
        .then((res) => {
          setUsers(res.results);
        });
  }, []);

  const onRefresh = React.useCallback(() => {
    
    setRefreshing(true);
    
    fetch(`${API_BASE_URL}?take=8`)
        .then(data => data.json())
        .then((res) => {
          
          const shuffled: [] = shuffleList(res.results);
          
          setUsers(shuffled);
          setRefreshing(false);
        });
  }, []);

  return (
      <View>
        <StatusBar/>
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }
        >
          {users.map((user: User) => (
              <View key={user.login.uuid} style={styles.userCard}>
                <Image
                    style={styles.userImage}
                    source={{uri: user.picture?.large}}
                />
                <View style={styles.userCardRight}>
                  <Text style={{fontSize: 18, fontWeight: '500', color: '#fff'}}>
                    {`${user.name.first} ${user.name.last}`}
                  </Text>
                  <Text style={{color: '#fff'}}>{`${user?.phone}`}</Text>
                </View>
              </View>
          ))}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingTop: "10%",
  },
  userCard: {
    justifyContent:"space-between",
    backgroundColor: '#1ec4d3',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 10,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 100,
  },
  userCardRight: {
    paddingHorizontal: 10,
  },
});
