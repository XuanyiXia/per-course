import React, { Component } from "react";
import axios from "axios";

class Add extends Component {
  state = {
    params: {
      name: "",
      price: 0,
      unit: "",
      url: "",
    },
    tip: "",
    listData: [],
    isHave: false,
  };
  componentDidMount() {
    this.getOrderList();
  }
  getOrderList = () => {
    axios.get("http://localhost:8080/goods").then((res) => {
      this.setState({
        listData: res.data,
      });
    });
  };
  toAddGoods = (event) => {
    event.preventDefault();
    if (this.state.isHave) {
      alert("该商品名已存在，请换个名字输入");
      this.setState({
        isHave: false,
        params: {
          ...this.state.params,
          name: "",
        },
      });
      return;
    }
    axios
      .post("http://localhost:8080/goods", this.state.params)
      .then(() => {
        this.props.history.push("/");
        alert("添加商品成功");
        this.setState({
          params: {
            name: "",
            price: 0,
            unit: "",
            url: "",
          },
          tip: "添加商品成功",
        });
      })
      .catch(() => {
        alert("添加商品失败，请稍后重试");
        this.setState({
          tip: "添加商品失败，请稍后重试",
        });
      });
  };
  handleChange = (event) => {
    if (event.target.name === "price" && event.target.value < 0) {
      alert("请输入大于或等于0的数字");
      return;
    }
    if (event.target.name === "name") {
      this.state.listData.forEach((res) => {
        if (res.name === event.target.value) {
          this.setState({
            isHave: true,
          });
        }
      });
    }
    this.setState({
      params: {
        ...this.state.params,
        [event.target.name]: event.target.value,
      },
    });
  };
  render() {
    return (
      <div className="add">
        <form>
          <div className="form-group">
            <label forhtml="name">名 称：</label>
            <input
              name="name"
              value={this.state.params.name}
              className="form-control"
              id="name"
              placeholder="请输入商品名称,英文"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label forhtml="price">价 格：</label>
            <input
              name="price"
              value={this.state.params.price}
              className="form-control"
              id="price"
              placeholder="请输入商品价格"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label forhtml="unit">单 位：</label>
            <input
              name="unit"
              value={this.state.params.unit}
              className="form-control"
              id="unit"
              placeholder="请输入商品单位，英文"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label forhtml="url">图 片：</label>
            <input
              name="url"
              value={this.state.params.url}
              className="form-control"
              id="url"
              placeholder="请输入商品图片地址"
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              this.state.params.name === "" ||
              this.state.params.price < 0 ||
              this.state.params.unit === "" ||
              this.state.params.url === ""
            }
            onClick={this.toAddGoods}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Add;
