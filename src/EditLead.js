
import React from 'react';
import { Row, Form, Col, Button, Modal } from 'react-bootstrap';

class EditLead extends React.Component {
  constructor(props) {
    super(props);

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

  handleSubmit(event){
    event.preventDefault();
    let datas = this.state;
    const apiUrl = 'http://localhost:8080/api/mark_lead/';
    const apiruls = apiUrl + event.target.userid.value;

    console.log(apiruls);

    const options = {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(datas)
    }
    console.log(options);
    fetch(apiruls, options)
      .then(response => {
              return response.json()
      }).then(result => {
        console.log(result)
        this.setState({data: result})
        window.confirm('Lead is marked')
      },
      (error) => {
        this.setState({ error });
      }
      )
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
          <Modal.Title>Mark Communication</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
        <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="userid">
              <Form.Label>user id</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  disabled
                  defaultValue={this.props.userid}
                  onChange={this.handleChange}
                  placeholder="User ID"/>
              </Form.Group>
              <Form.Group controlId="communication">
                <Form.Label>Communication</Form.Label>
                <Form.Control
                  type="textarea"
                  name="communication"
                  defaultValue={this.props.communication}
                  onChange={this.handleChange}
                  placeholder="Communication"/>
              </Form.Group>
              <Form.Group>
                <Button variant="success" type="submit">Mark Communication</Button>
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

export default EditLead;
