import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-swipeable';
import axios from 'axios';
import { BackHeader, SubHeader } from '../../common';
import IncompleteAnalysisDetail from './IncompleteAnalysisDetail';
import { deleteIncompleteAnalysis } from '../../../actions';

class IncompleteAnalysisList extends Component {
  static navigationOptions = {
    header: null
  }

  state = { deleted: false, modalVisible: false, selected: {}, currentlyOpenSwipeable: null };

  onDelete(id) {
     for (const analysis of this.props.incomplete) {
       if (id === analysis.AnalysisId) {
         this.props.deleteIncompleteAnalysis(this.props.incomplete.indexOf(analysis));
         this.setState({ deleted: !this.state.deleted });
         axios.delete('http://localhost:8888/greenmortgage/wp-json/gmma/v1/analyses/' + id,{ headers: {'Token' : this.props.token}})
         .then(() => console.log('Delete done!'))
         .catch(error => {
           console.log(error.response);
           if ( error.response.status === 404 ) {
             this.props.navigation.navigate('InvalidToken');
           }
         });
       }
     }
   }

   onDeletePress(analysis) {
     this.setState({ selected: analysis, modalVisible: true });
   }

   renderAnalyses() {
     const { buttonStyle, buttonTextStyle } = styles;

     return this.props.incomplete.map(analysis =>
       <View key={analysis.AnalysisId}>
         <Swipeable
          onRef={ref => this.swipeable = ref}
          onRightButtonsOpenRelease={
            (event, gestureState, swipeable) => {
              this.setState({
                currentlyOpenSwipeable: swipeable
              });
            }
          }
           rightButtons={[
             <TouchableOpacity style={buttonStyle} onPress={() => this.onDeletePress(analysis)}>
               <Text style={buttonTextStyle}>Delete</Text>
             </TouchableOpacity>
           ]}
           rightButtonWidth={100}
         >
           <IncompleteAnalysisDetail analysisProp={analysis} />
         </Swipeable>
       </View>
     );
   }

   onModalOK() {
     this.onDelete(this.state.selected.AnalysisId);
     this.setState({ currentlyOpenSwipeable: null, modalVisible: false });
   }

   onModalCancel() {
     this.state.currentlyOpenSwipeable.recenter();
     this.setState({ currentlyOpenSwipeable: null, modalVisible: false });
   }

   renderModal() {
     const {
       modalContainerStyle,
       modalContentContainerStyle,
       nameContainerStyle,
       closeContainerStyle,
       okContainerStyle
     } = styles;

     return (
       <Modal
         animationType={'fade'}
         transparent
         visible={this.state.modalVisible}
         onRequestClose={() => console.log('Closed')}
         supportedOrientations={['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']}
       >
         <View style={modalContainerStyle}>
           <View style={{ flex: 1 }} />
           <View style={modalContentContainerStyle}>
             <View style={nameContainerStyle}>
               <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>Are you sure you want to delete?</Text>
             </View>
             <View style={closeContainerStyle}>
               <TouchableOpacity onPress={() => this.onModalCancel()}>
                 <View>
                   <Text style={{ fontSize: 18, fontWeight: '400' }}>Cancel</Text>
                 </View>
               </TouchableOpacity>
             </View>
             <View style={okContainerStyle}>
               <TouchableOpacity onPress={() => this.onModalOK()}>
                 <View>
                   <Text style={{ fontSize: 18, fontWeight: '500' }}>Yes</Text>
                 </View>
               </TouchableOpacity>
             </View>
           </View>
           <View style={{ flex: 2 }} />
         </View>
       </Modal>
     );
   }

  render() {
    const { containerStyle, textContainerStyle, textStyle } = styles;

    return (
      <View style={containerStyle}>
        <BackHeader headerText='Analyses In Progress' onPress={() => this.props.navigation.goBack()} />
        {this.renderModal()}
        <ScrollView>
        <SubHeader subheaderText='INCOMPLETE!' />
          <View style={textContainerStyle}>
            <Text style={textStyle}>
              If you no longer need these, simply swipe left to delete them
            </Text>
          </View>
            {this.renderAnalyses()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textStyle: {
    marginLeft: 15,
    fontSize: 16
  },
  textContainerStyle: {
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    height: 80,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 20
  },
  buttonStyle: {
   justifyContent: 'center',
   backgroundColor: 'red',
   paddingLeft: 30,
   flex: 1
  },
  buttonTextStyle: {
   fontSize: 18,
   color: '#fff'
 },
 modalContainerStyle: {
   flex: 1,
   justifyContent:'center',
   alignItems: 'center',
   backgroundColor: 'rgba(120, 120, 120, 0.5)'
 },
 modalContentContainerStyle: {
   width: 300,
   height: 275,
   backgroundColor: '#fafafa',
   borderRadius: 10,
   borderColor: '#fafafa'
 },
 nameContainerStyle: {
   flex: 12,
   margin: 15,
   justifyContent: 'center',
   alignItems: 'center'
 },
 closeContainerStyle: {
   flex: 3,
   borderBottomWidth: 0.5,
   borderTopWidth: 0.5,
   borderColor: '#bbb',
   justifyContent: 'center',
   alignItems: 'center'
 },
 okContainerStyle: {
   flex: 4,
   borderTopWidth: 0.5,
   borderColor: '#bbb',
   justifyContent: 'center',
   alignItems: 'center'
 }
};

const mapStateToProps = state => {
  return {
    incomplete: state.analyses.incomplete,
    token: state.token.token
   };
};

export default connect(mapStateToProps, { deleteIncompleteAnalysis })(IncompleteAnalysisList);
