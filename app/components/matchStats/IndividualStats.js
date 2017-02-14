// Dependencies
import React, {Component} from 'React';
import {View,Text} from 'react-native';
// Styles
import {objects} from '../../themes';

export default function MatchStats({players}) {
  return (
    <View>
      <View style={[objects.listitems.header, {flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}]} >
        <Text style={[objects.listitems.headerText, {textAlign:'center',fontSize:16}]} >Individuell statistik:</Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Mål: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'goals') }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Assist: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'assists') }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Avslut: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'shots') }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Gula kort: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'yellow') }</Text></Text>
      </View>
      <View style={[objects.listitems.container, {minHeight:56, height:undefined, paddingVertical:5, justifyContent:'flex-start'}]} >
        <Text style={[objects.listitems.text]} >Röda kort: <Text style={{fontWeight:'400'}} >{ getPlayersWithStat(players,'red') }</Text></Text>
      </View>
    </View>
  );
}

function getPlayersWithStat(players,stat) {
  const playersWithStat = players.filter(player => player[stat] > 0)
    .sort((a,b) => b[stat] -  a[stat])
    .map(player => player[stat] > 1 ? `${player.name} ${player[stat]}` : player.name)
    .join(', ');
  return playersWithStat;
}
