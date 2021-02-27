import './App.css';
import React, {Component} from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    super(props);
    // 생성자 내부에서는 this.setState()를 사용할 필요없다.
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      welcome: {title: 'Welcome', desc: 'Hello, React!'},
      contents: [
        {id: 1, title: 'HTML', desc: 'HTML is for information'},
        {id: 2, title: 'CSS', desc: 'CSS is for design'},
        {id: 3, title: 'JavaScript', desc: 'JavaScript is for interative'},
      ]
    }
  }

  getReadContent () {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i++;
    }
  }

  getContent () {
    let _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />

    } else if (this.state.mode === 'read') {
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />

    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // state 원본을 변경하지 않는 것이 좋다.
        let _contents = Array.from(this.state.contents);
        _contents.push({id: ++this.max_content_id, title: _title, desc: _desc});
        this.setState({
          mode: 'read',
          contents: _contents,
          selected_content_id: this.max_content_id
        });
      }.bind(this)} />

    } else if (this.state.mode === 'update') {
      let _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {
          let _contents = Array.from(this.state.contents);
          let i = 0;
          while (i < _contents.length) {
            if (_contents[i].id === _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i++;
          }
          this.setState({
            mode: 'read',
            contents: _contents
          });
        }.bind(this)} />
    }

    return _article;
  }

  // 리액트에서는 state가 바뀌면 render 함수가 다시 호출되면서 화면을 state에 맞게 다시 그린다.
  // render : 어떤 html을 그릴 것인가를 결정하는 함수
  render() {
    return (
      <div className="App">
        <Subject
            title={this.state.subject.title}
            sub={this.state.subject.sub}
            onChangePage={function (){
              this.setState({ mode: 'welcome' });
            }.bind(this)}
        />

        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        />

        <Control onChangeMode={function (_mode) {
          if (_mode === 'delete') {
            if (window.confirm('really?')) {
              let _contents = Array.from(this.state.contents);
              let i = 0;
              while (i < _contents.length) {
                if (_contents[i].id === this.state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
                i++;
              }
              this.setState({
                mode: 'welcome',
                contents: _contents
              });
              alert('deleted!');
            }
          }
          this.setState({mode: _mode})
        }.bind(this)}
        />

        {this.getContent()}

      </div>
    );
  }
}

export default App;
