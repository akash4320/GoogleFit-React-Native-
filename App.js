/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GoogleFit from 'react-native-google-fit';
import OAuthManager from 'react-native-oauth';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepCount: '0',
      caloriesBurnt: '0',
      distance: '0',
      height: '0',
      weight: '0'
    }

  }

  google_fit_restApi = () => {
    console.log('entered function')

    userobject = {
      "aggregateBy": [{
        // com.google.step_count.delta
        // com.google.distance.delta
        // com.google.heart_rate.bpm
        // com.google.calories.expended

        "dataTypeName": "com.google.step_count.delta"
      }],
      "bucketByTime": { "durationMillis": 86400000 },
      "startTimeMillis": 1548613800000,
      "endTimeMillis": 1548937800000
    }
  
  fetch('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ya29.GluiBqYzjbYxxPjn_EHpLzCYYUS0qe864Kn-dPKrkhIr0qZO-FrvLuSlNU_z30JqBwsLcHagF1zcHkmNVd2B-Oj73-IIlUVhbeaPFJpSlJjCrjEglF20BZZ4aUtW'
      },
    body: JSON.stringify(userobject)
    }).then(response => response.json())
  .then(responseJson => console.log('Response>>', responseJson))
  .catch(error => console.log('err>>', error))
  }

google_fit_func = () => {
  
  GoogleFit.authorize();
  // GoogleFit.onAuthorize(() => {
  //   alert('AUTH SUCCESS')
  // });

  // GoogleFit.onAuthorizeFailure(() => {
  //   alert('AUTH ERROR');
  // });

  options = {
    startDate: "2019-01-01T00:00:17.971Z", // required ISO8601Timestamp
    endDate: new Date().toISOString() // required ISO8601Timestamp
  };

  GoogleFit.getDailyStepCountSamples(options, (err, res) => {
    if (err) {
      throw err;
    }
    this.setState({ stepCount: res[0].steps[res[0].steps.length - 1].value })
    console.log("Daily steps >>>", res);
  });

  GoogleFit.getDailyCalorieSamples(options, (err, res) => {
    if (err) {
      throw err;
    }
    this.setState({ caloriesBurnt: res[res.length - 1].calorie })
    console.log("Calories Burnt >>>", res);
  });

  GoogleFit.getDailyDistanceSamples(options, (err, res) => {
    if (err) {
      throw err;
    }
    this.setState({ distance: res[res.length - 1].distance })
    console.log("Daily Distance >>>", res);
  });

  opt = {
    unit: "kg", // required; default 'kg'
    startDate: "2019-01-01T00:00:17.971Z", // required
    endDate: new Date().toISOString(), // required
    ascending: false // optional; default false
  };

  GoogleFit.getWeightSamples(opt, (err, res) => {
    this.setState({ weight: res[0].value })
    console.log('Weight>> ', res);
  });

  opt1 = {
    startDate: "2019-01-01T00:00:17.971Z", // required
    endDate: new Date().toISOString(), // required
  };

  GoogleFit.getHeightSamples(opt1, (err, res) => {
    this.setState({ height: res[0].value })
    console.log('Height>>', res);
  });

  options1 = {
    startDate: new Date(2018, 9, 17).valueOf(), // simply outputs the number of milliseconds since the Unix Epoch
    endDate: new Date(2018, 9, 18).valueOf()
  };
  GoogleFit.getActivitySamples(options1, (err, res) => {
    console.log('Activity>>', res);
  });

}

render() {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={this.google_fit_restApi}>
        <Text style={styles.welcome}>Google Fit React Native!</Text>
        <Text style={styles.welcome}> Fit Step count: {this.state.stepCount}</Text>
        <Text style={styles.welcome}> Fit Calories Burnt: {this.state.caloriesBurnt}</Text>
        <Text style={styles.welcome}> Daily Distance: {this.state.distance}</Text>
        <Text style={styles.welcome}> Weight: {this.state.weight}</Text>
        <Text style={styles.welcome}> Height: {this.state.height}</Text>
      </TouchableOpacity>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
