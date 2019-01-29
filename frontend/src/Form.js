import React, { Component } from 'react';

class Form extends Component {
  constructor(props){
    super(props);
  }

  render() {
    // New.js, Edit.jsのpropsをセットします。
    const { title, content, submitValue } = this.props;
    return (
      // this.props.xxxx という記述で親コンポーネントの関数実行します。
      <div onSubmit={ this.props.parentSubmit }>
        <form>
          <label>title:</label>
          <input type="text" name="title" defaultValue={ title } onChange={ this.props.parentInputValue } />
          <label>content:</label>
          <textarea name="content" value={ content } onChange={ this.props.parentInputValue } />
          <input type="submit" value={ submitValue } />
        </form>
      </div>
    );
  }
}

export default Form;
