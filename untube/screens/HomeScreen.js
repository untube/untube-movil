import React from 'react';
import List from '../components/List';
import Header from '../components/Header';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';

import {
  StyleSheet,
  View,
} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props){
		super(props)
		this.state = {
			isOpen: false
		}
	}

	toggle(){
		this.setState({
			isOpen: !this.state.isOpen
		})
	}

	updateMenu(isOpen){
		this.setState({isOpen})
	}

	static navigationOptions = {
    header: null,
  };
	render() {
    return (
			<View style={[{flex:1} ,styles.container]}>
				<SideMenu
					menu={<Menu/>}
					isOpen={this.state.isOpen}
					onChange={(isOpen) => this.updateMenu(isOpen)}
					>
							<Header toggle={this.toggle.bind(this)}/>
							<List/>
				</SideMenu>
			</View>
		);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
