import React, { Component } from "react";
import UserItem from "../Users/UserItem";
import axios from "axios";
import Loading from "../../pages/loading";

class AllUsers extends Component {
  state = {
    users: [],
    loading: true,
  };

  reload = () => {
    axios.get("/dash/users").then((data) => {
      this.setState({
        users: data.data,
        loading: false,
      });
      console.log(data.data);
    });
  };
  componentDidMount = () => {
    axios
      .get("/dash/users")
      .then((data) => {
        this.setState({
          users: data.data,
          loading: false,
        });
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  render() {
    if (this.state.loading) {
      return <Loading loader="2" />;
    }
    return (
      <div>
        <div className="p-3 bg-blueish c-blue-">
          <h4 className="mb-0  c-blue bold">All Users</h4>
          <div className="mb-0 ">
            Showing everyone who can log in to your store
          </div>
        </div>
        <div>
          <div className="bg-white card border-bottom-0 mt-3 text-center">
            <div className="d-flex flex-wrap c-blue- ml-table-header py-3  col-12 border-bottom">
              <div className="col-3">Name</div>
              <div className="col-3">Email</div>
              <div className="col-3">Active</div>
              <div className="col-3">Auth Level</div>
            </div>
            {this.state.users.map((x, index) => (
              <UserItem
                id={index}
                reload={() => this.reload()}
                key={index}
                x={x}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AllUsers;
