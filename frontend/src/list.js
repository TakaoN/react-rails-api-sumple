import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const REQUEST_URL = 'http://localhost:3000/messages.json'
const REQUEST_URL_DELETE = 'http://localhost:3000/messages/'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    };
  }
  // renderが呼ばれる前にDataをfetchする処理を発火する。
  componentWillMount() {
    this.fetchData()
  }

  fetchData() {
    // fetchで非同期処理を実行する。
    fetch(REQUEST_URL)
      .then((response) => {
      // 4xx系, 5xx系エラーのときには response.ok = false になる
       if (!response.ok) {
         throw Error(response.statusText);
       }
       return response;
      })
      // レスポンスボディをJSONとしてパースする
      .then((response) => response.json())
      // responseDataをmessagesにsetする
      // setStateが行われる度にrenderが呼ばれ、表示が変わる
      .then((responseData) => {
        this.setState({
          messages: responseData
        })
      })
      // エラーをcatchする
      .catch((err) => {
        console.error(err);
      });
  }

  hundleDestroy = (event, message_id) => {
    event.preventDefault();
    // stateのmessagesを取得する
    const messages = this.state.messages;
    // 渡ってきたmessage_idとmessage.idが等しいメッセージをspliceする
    const removeMessage = (msg, i) => {
      if (msg.id==message_id) messages.splice(i,1);
    }
    messages.some(removeMessage);
    // 削除されなかったmessagesをsetStateする
    this.setState({
      messages: messages
    })

    fetch(REQUEST_URL_DELETE + message_id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      this.props.history.push('/');
    })
    .catch((err) => {
      console.error(err);
    });
  }

  render(){
    const { messages } = this.state;
    return(
      <div>
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>content</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { messages.map((message) => {
              return (
               <tr key={ message.id }>
                 <td>{ message.title }</td>
                 <td>{ message.content }</td>
                 <td><Link to={ '/message/' + message.id }>Show</Link></td>
                 <td><Link to={ '/message/' + message.id + '/edit' }>Edit</Link></td>
                 <td><a href="javascript:void(0)" onClick={ () => { if (window.confirm('本当に削除しますか?')) this.hundleDestroy(event, message.id) } }>destroy</a></td>
               </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default List;
