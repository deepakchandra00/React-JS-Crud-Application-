import React from 'react';
import loader from './loader.gif';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'react-bootstrap';

import './App.css';
import AddLead from './AddLead';
import EditLead from './EditLead';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      isLoading: false,
      error: null,
      response: {},
      editModalShow:false,
      addModalShow:false
    }
  }
  componentDidMount(){
    this.setState({ isLoading: true });
    this.refreshList();
  }

  componentDidUpdate(){
    this.refreshList();
  }

  refreshList(){
    fetch("http://localhost:8080/api/leads/?location_string=India")
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong ...');
      }
    })
    .then(datas => this.setState({ data: datas, isLoading: false }))
    .catch(error => this.setState({ error, isLoading: false }));
  }


  deleteUser(id) {
    const { data } = this.state;
    if(window.confirm('Are you sure?'))
    {
      const apiUrl = 'http://localhost:8080/api/leads/';
      const apiruls = apiUrl + id;
      fetch(apiruls, {
        method: 'DELETE'
      }).then(() => {
         console.log(apiruls);
      }).then(
              (result) => {
                this.setState({
                  response: result,
                  data: data.filter(users => users.id !== id)            
                });
              }).catch(err => {
        console.error(err)
      })
    }
  }


  render(){
    const { data, isLoading, error, userid, communication } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }

    if (isLoading) {
      return <img src={loader} className="App-logo" alt="logo" />;
    }

    let addModalClose = () => this.setState({addModalShow:false } );

    // let userForm;
    //   userForm = <AddUser show={this.state.addModalShow} onHide={addModalClose} onFormSubmit={this.onFormSubmit} user={this.state.data} />

    let editModalClose = () => this.setState({editModalShow:false } );



    return(
      <div>
        <Button variant="primary" onClick={() => this.setState({addModalShow:true})}>Add Lead</Button>
        <AddLead show={this.state.addModalShow} onHide={addModalClose} user={this.state.data} />
        <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Num</th>
                <th>Location Type</th>
                <th>Location String</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map(users => (
                <tr key={users.id}>
                  <td>{users.first_name }&nbsp; {users.last_name }</td>
                  <td>{users.email}</td>
                  <td>{users.mobile}</td>
                  <td>{users.location_type}</td>
                  <td>{users.location_string}</td>
                  <td>
                    <Button variant="info"  onClick={() => this.setState({editModalShow:true, userid:users.id,  communication:users.communication})}>Edit</Button>
                    &nbsp;<Button variant="danger" onClick={() => this.deleteUser(users.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <EditLead show={this.state.editModalShow} onHide={editModalClose} userid={userid} communication={communication} />
      </div>
    )
  }
}

export default App;
