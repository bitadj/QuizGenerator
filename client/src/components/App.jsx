import React, { Component } from 'react';
import Navbar from './Navbar.jsx';
const UserService = require('./../classes/UserService');
const userService = new UserService();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      loggedIn: false, // change this back to false
      user: null,
    };
    this.updateState = this.updateState.bind(this);
    this.getState = this.getState.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.logout = this.logout.bind(this);
    this.createQuiz = this.createQuiz.bind(this);
  }

  getState() {
    return this.state;
  }

  updateState(stateObj) {
    this.setState(stateObj);
  }

  componentDidMount() {
    fetch('/api/quizzes')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // console.log(data);
        this.setState({ quizzes: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Method called from SignUp.jsx.
  signUp(e) {
    let email = e.target.email.value;
    let password = e.target.password.value;
    userService.signUp(email, password)
      .then((data) => {
        if (data.id) {
          let updateStateData = {
              user: data,
              loggedIn: true,
          };
          this.setState(updateStateData, () => {
            this.props.router.push('/quizzes');
          });
        } else {
          console.log('Signup Error');
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // Method called from Signin.jsx.
  login(e) {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    userService.login(email, password)
      .then((data) => {
        if (data.id) {
            let updateStateData = {
                user: data,
                loggedIn: true,
            };
            this.setState(updateStateData, () => {
              this.props.router.push('/quizzes');
            });
        } else {
            console.log('LOGIN FAILED');
            e.target.password.value = 'wrong password';
        }
      })
      .catch((err) => {
        console.log('Error logging in', err);
      });
  }

  logout() {
    this.setState({
      loggedIn: false,
      user: null,
    });
  }

  createQuiz(e, localState) {
    // console.log(localState);
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        name: localState.quizTitle,
        description: localState.quizDesc,
        questions: localState.questions,
        answers: localState.answers,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    return fetch('/api/quizzes', data)
      .then(response => response.json()) // update state and redirect to another page
      .then((data) => {
        const updatedQuizzes = this.state.quizzes.slice();
        updatedQuizzes.push(data);
        this.setState({
          quizzes: updatedQuizzes,
        }, () => {
          this.props.router.push('/quizzes');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Navbar loggedIn={this.state.loggedIn} />
        {React.cloneElement(this.props.children, {
          quizzes: this.state.quizzes,
          loggedIn: this.state.loggedIn,
          updateState: this.updateState,
          getState: this.getState,
          login: this.login,
          signUp: this.signUp,
          logout: this.logout,
          createQuiz: this.createQuiz,
        })}
      </div>
    );
  }
}

export default App;
