import React, { Component } from 'react';
import Post from './Post.js';
import Form from './Form.js';

import samplePosts from './posts.json';
import './App.css';

class App extends Component {
  constructor() {
    super ();
    
    this.fetchData = this.fetchData.bind(this);
    this.addPost = this.addPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);

    this.state = {
      posts: [],
      title: '',
      text: '',
      tag: '',
      formErrors: {title: '', text: ''},
      titleValid: false,
      textValid: false,
      tagValid: false,
      formValid: false
    };
  }

  componentWillMount() {
    localStorage.getItem('posts') && this.setState({
      posts: JSON.parse(localStorage.getItem('posts'))
    })
  }

  componentDidMount() {
    if(!this.state.posts.length) {
      this.fetchData();
    } else {
      console.info("You are using local storage");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('posts', JSON.stringify(nextState.posts));
    localStorage.setItem('timestamp', Date.now());
  }

  fetchData() {
    this.setState({
      posts: samplePosts,
    })
  }

  addPost(post) {
    const posts = [...this.state.posts, post];
    this.setState({ 
      posts: posts, 
      formValid: false
    });
  }

  deletePost(key) {
    const posts = [...this.state.posts];
    posts.splice(key, 1);
    this.setState({ posts: posts });
  }

  handleUserInput (e) {
    const value = e.target.value;
    const title = e.target.name;
    this.setState({[title]: value}, () => {this.validateField(title, value)});
  }

  validateField(name, value) {
    let errors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let textValid = this.state.textValid;
    let tagValid = this.state.tagValid;

    switch(name) {
      case 'title': 
        titleValid = value.length > 3;
        errors.text = titleValid ? '' : 'Слишком короткий загловок';
        break;
      case 'text': 
        textValid = value.length > 14;
        errors.text = textValid ? '' : 'Слишком короткая запись';
        break;
      case 'tag':
        tagValid = !value.match(/(\w+\s)/i) && value.length !== 0;
        errors.text = tagValid ? '' : 'Вводите теги через запятую с пробелом';
    }
    this.setState({
      titleValid: titleValid,
      textValid: textValid,
      tagValid: tagValid,
      formValid: titleValid && textValid && tagValid
    });
  }

  render() {
    return (
      <div>
        <div className="container-fluid d-flex justify-content-center title">
          <h1>Simpals App</h1>
        </div>
        <div className="container">
          <ul className="posts-list">
          {
            Object
              .keys(this.state.posts)
              .map(key => <Post key={key} index={key} details={this.state.posts[key]} deletePost={this.deletePost}/>)
          }
          </ul>
          <Form 
            addPost={this.addPost} 
            formErrors={this.state.formErrors}
            handleUserInput={this.handleUserInput}
            formValid={this.state.formValid}
          />
        </div>
      </div>
    );
  }
}

export default App;
