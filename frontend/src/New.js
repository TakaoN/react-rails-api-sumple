import React, { Component } from 'react';
import Form from './Form';

// Request を送るURLを指定（RailsのAPIサーバ）
const REQUEST_URL = 'http://localhost:3000/messages.json'

class New extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: '',
      content: ''
    };
  }

  handleInputValue = (event) => {
    const field = event.target.name;
    this.state[field] = event.target.value;
    this.setState({
      [field]: this.state[field]
    });
  }

  // submitがクリックされた時の処理
  handleSubmit = (event) => {
    // デフォルトの遷移を抑制する
    event.preventDefault();
    // $.ajax()に代替する fetch
    // 結果がPromiseで返される
    fetch(REQUEST_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      //  JSON.stringifyで　JSON 文字列に変換する
      body: JSON.stringify({
        message: {
          title: this.state.title,
          content: this.state.content
        }
      })
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      // 一覧コンポーネントを表示する
      this.props.history.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render() {
   const { title, content } = this.state;
   return (
     <div>
       <p>New Message</p>
       <Form
          submitValue='Submit'
          title={ title }
          content={ content }
          parentSubmit={ this.handleSubmit }
          parentInputValue={ this.handleInputValue } />
     </div>
   );
 }
}

export default New;
