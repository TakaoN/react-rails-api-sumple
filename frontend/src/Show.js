import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// RailsAPIのURL
const REQUEST_URL_SHOW = 'http://localhost:3000/messages/';

class Show extends Component {
  constructor(props) {
    super(props)
    // this.props.match.params.idでパラメータのidを取得する
    const message_id = parseInt(this.props.match.params.id, 10) // (1)
    // message_idをstateにセットする
    this.state = {
      id: message_id,
      message: ''
    };
  }
  // New.jsと同様にrenderされる前にfetchDataを走らせる
  componentWillMount() {
    this.fetchData()
  }

  // RailsAPIをたたく
  fetchData() {
    fetch(REQUEST_URL_SHOW + this.state.id) // (2)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.json()) // (3) jsonへパースする
      // 返ってきたデータを　this.state.message にセットする
      // setState することでレンダリングされる
      .then((responseData) => {
        this.setState({
          message: responseData　// (4)
        })
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render(){
    const { message } = this.state;
    return(
      <div key={message.id}>
        <div>
          <b>Title</b>
          <div>{ message.title }</div>
        </div>
        <div>
          <b>Content</b>
          <div>{ message.content }</div>
        </div>
        <div><Link to={ '/message/' + message.id + '/edit' }>edit</Link></div>
      </div>
    );
  }
}

export default Show;
