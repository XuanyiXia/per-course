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
  };
  toAddGoods = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8080/goods", this.state.params)
      .then(() => {
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
        this.setState({
          tip: "添加商品失败，请稍后重试",
        });
      });
  };
  handleChange = (event) => {
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
              placeholder="请输入商品名称"
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
              placeholder="请输入商品单位"
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
            onClick={this.toAddGoods}
          >
            Submit
          </button>
        </form>
        <div id="myModal" class="modal fade" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              {this.state.tip}
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Add;
