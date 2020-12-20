import React, {useState} from 'react';
import {View, ScrollView, StatusBar, Dimensions, StyleSheet} from 'react-native';
import {ButtonGroup} from 'react-native-elements';
import {LineChart, PieChart} from 'react-native-svg-charts';

const lineChartPoints = () => {
  const xPoints = [...Array(121).keys()].map(i => (i - 60) / 10);
  return xPoints.map(x => Math.E ** x);
}

const pieParts = [35, 40, 25].map((value, index) => ({
  value,
  svg: {
    fill: ['#34eb5c', '#ebe534', '#eb4034'][index]
 },
  key: `pie-${index}`
}));

const Charts = () => {
  const [chartTab, setChartTab] = useState(0);

  const lineChart = (
    <LineChart
      style={styles.chart}
      data={lineChartPoints()}
      svg={{stroke: '#dc2222'}}
      showGrid={false}
      animate
    />
  );
  const pieChart = <PieChart style={styles.chart} data={pieParts} />;

  const charts = [
    {title: 'y = e^x, xЄ[-6;6]', component: lineChart},
    {title: 'PIE: 35/40/25', component: pieChart},
  ];

  return (
    <ScrollView contentContainerStyle={styles.chartTab}>
      <ButtonGroup
        onPress={setChartTab}
        selectedIndex={chartTab}
        buttons={charts.map((chart) => chart.title)}
        containerStyle={styles.buttons}
      />
      <View style={styles.chartContainer}>
        {charts[chartTab].component}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chartTab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: StatusBar.currentHeight + 12.5
 },
  buttons: {
    width: Dimensions.get('screen').width * 0.875,
    marginBottom: 12.5
 },
  chartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('screen').height * 0.5,
    marginBottom: 75,
    paddingHorizontal: 12.5,
    borderRadius: 7.5,
    backgroundColor: 'white',
    color: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1
   },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5
 },
  chart: {
    width: Dimensions.get('screen').width * 0.8,
    height: 225
 }
});

export default Charts;
