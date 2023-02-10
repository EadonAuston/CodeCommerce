// Will render either login or signup
import React from "react";
import SignupLogin from "../SignupLogin/SignupLogin";

class Authentication extends React.Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   render() {
      return (
         <SignupLogin changePage={this.props.changePage} getMail={this.props.getMail}/>
      )
   }
}

export default Authentication;