import React, { Component } from 'react';
// This prevents page refresh 
class App extends Component {
  state = {
    name: '',
    age: '',
    users: [],
    message: '',
    editMode: false,
    userIdx: null
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.name && this.state.age) {
      if (this.state.editMode) {
        const editedUser = { name: this.state.name, age: this.state.age };
        this.setState({ users: this.replaceItemInArray(this.state.users, editedUser, this.state.userIdx) }, () => {
          this.setState({ name: '', age: '', message: '', editMode: false });
        });
      } else {
        this.setState({ users: this.state.users.concat({ name: this.state.name, age: this.state.age }) }, () => {
          this.setState({ name: '', age: '', message: '' });
        });
      }
    } else {
      this.setState({ message: 'Please enter the user data' });
    }
  }

  replaceItemInArray(arr, item, idx) {
    return [
      ...arr.slice(0, idx),
      item,
      ...arr.slice(idx + 1)
    ];
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  handleAgeChange = (event) => {
    this.setState({ age: event.target.value });
  }

  handleEdit = (idx) => {
    const user = this.state.users[idx];
    this.setState({ name: user.name, age: user.age, editMode: true, userIdx: idx });
  }

  handleDelete = (idx) => {
    const users = this.state.users;
    users.splice(idx, 1);
    this.setState({ users: users });
  }

  render() {
    return <div className="container">
      <h1>Welcome to React</h1>

       <form onSubmit={this.handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Age</label>
          <input type="number" className="form-control" placeholder="Age" value={this.state.age} onChange={this.handleAgeChange}/>
        </div>
        
        {this.state.message && <div className="panel panel-danger">
          <div className="panel-body">
            {this.state.message}
          </div>
        </div>}

        <button type="submit" className="btn btn-default">{this.state.editMode ? 'Update' : 'Create'}</button>
      </form>

      <hr/>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user, idx) => {
            return <tr key={idx}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={() => this.handleEdit(idx)}>Edit</button>&nbsp;
                <button className="btn btn-sm btn-danger" onClick={() => this.handleDelete(idx)}>Delete</button>
              </td>
            </tr>
          })}
          {this.state.users.length === 0 && <tr>
            <td colSpan="3" className="text-center">No users exist</td>
          </tr>}
        </tbody>
      </table>
    </div>;
  }
}

export default App;