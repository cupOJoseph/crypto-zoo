import React, { Component } from 'react';
// import { Modal, } from 'react-bootstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: false
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  hideDonateModal() {
    this.setState({ activeDonateModal: null })
  }

  render() {
    return (
      <div className="container">
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.animal.name}</ModalHeader>
          <ModalBody>
            {this.props.animal.description}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="muttville-donate-button" onClick={this.toggle}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
