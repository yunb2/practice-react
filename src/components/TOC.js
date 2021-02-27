const {Component} = require("react");

class TOC extends Component {
  render() {
    const lists = [];
    const data = this.props.data;
    let i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            // data-id={data[i].id}
            onClick={function (id, e) {
              // e.target -> a 태그를 가르킴
              e.preventDefault();
              // this.props.onChangePage(e.target.dataset.id);
              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
          >{data[i].title}</a>
        </li>);
      i = i + 1;
    }
    return (
      <nav>
        <ul>
          {lists}
        </ul>
      </nav>
    );
  }
}

export default TOC;