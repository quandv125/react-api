import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import routes from './routes';
// import { TransitionGroup, CSSTransition } from "react-transition-group";

class App extends Component {
	showContentMenu = (routes,location) => {
		// console.log(location);
		var result = null;
		if(routes.length > 0){
			result = routes.map((route, index) => {
				return (
					<Route 
						key={index} 
						path={route.path} 
						exact={route.exact} 
						component={route.main} 
					/>
				);
			})
		}
		return result;
	}
	render() {
		
		return (
			<Router>
				<Route render={({ location }) => (
					
				<div className="App" style={styles.content}>
					<Menu />
					{/* <TransitionGroup>
					<CSSTransition key={location.key}  classNames="fade" timeout={100}> */}
                	<Switch location={location}>
				
						{this.showContentMenu(routes,location)}

					 </Switch>
					{/* </CSSTransition>
					</TransitionGroup> */}
				</div>
				)}/>
			</Router>
		);
	}
	
}
const styles = {};

styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};

styles.content = {
  ...styles.fill,
  top: "0px",
//   textAlign: "center"
};

styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};

styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "0px"
};

styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};

styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
export default App;
