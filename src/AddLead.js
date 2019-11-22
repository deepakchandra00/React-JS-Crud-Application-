
import React from 'react';
import { Row, Form, Col, Button, Modal } from 'react-bootstrap';

class AddLead extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      id: '',
      first_name: '',
      last_name: '',
      mobile: '',
      email: '',
      location_type: '',
      location_string: '',
    }

    if(props.data){
      this.state = props.data
    } else {
      this.state = this.initialState;
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    let datas = this.state;
    event.preventDefault();
    const apiUrl = 'http://localhost:8080/api/leads/';
    
    const options = {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body: JSON.stringify(datas)
    };

    //console.log(JSON.stringify(datas))

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(result => {
        this.setState({
          response: result
        })
        window.confirm('Lead is added successfully')
      },
      (error) => {
        this.setState({ error });
      }
    )
    this.setState(this.initialState); 
  }

  render() {
    return(
      <Modal
      {...this.props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
        <Modal.Header closeButton>
          <Modal.Title>Add Lead</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleChange}
                  placeholder="First Name"/>
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleChange}
                  placeholder="Last Name"/>
              </Form.Group>

              <Form.Group controlId="mobile">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  name="mobile"
                  value={this.state.mobile}
                  onChange={this.handleChange}
                  placeholder="Mobile"/>
              </Form.Group>
              
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  placeholder="Email"/>
              </Form.Group>

              <Form.Group controlId="locationType">
                <Form.Label>Location Type</Form.Label>
                <Form.Control
                  type="text"
                  name="location_type"
                  value={this.state.location_type}
                  onChange={this.handleChange}
                  placeholder="Location Type"/>
              </Form.Group>

              <Form.Group controlId="locationString">
                <Form.Label>Location String</Form.Label>
                <Form.Control
                  type="text"
                  name="location_string"
                  value={this.state.location_string}
                  onChange={this.handleChange}
                  placeholder="Location String"/>
              </Form.Group>
              <Form.Group>
                <Button variant="success" type="submit">Save</Button>
              </Form.Group>
              </Form>
        </Modal.Body>
        
        <Modal.Footer>
        
        <Button onClick={this.props.onHide}>Close</Button>
          
        </Modal.Footer>
        
      </Modal>

    )
  }
}

export default AddLead;
