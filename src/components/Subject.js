const {Component} = require("react");

class Subject extends Component {
  render() {
    return (
      // 컴포넌트는 하나의 최상위 태그를 사용해야한다.
      <header>
        <h1><a href="/" onClick={function (e) {
          e.preventDefault();
          this.props.onChangePage();
        }.bind(this)}>{this.props.title}</a></h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;