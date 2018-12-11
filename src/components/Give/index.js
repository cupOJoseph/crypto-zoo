import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Button
} from 'reactstrap';
import { Modal } from 'react-bootstrap';
import { Form } from 'semantic-ui-react';
import './style.css';
import firebase from '../../firebase.js'
import web3 from '../web3';
import heritageABI from '../heritageABI';
const ethereumLogo = require('../../assets/ethereum.png');
const creditCard = require('../../assets/creditCard.png');
const heritageContractAddress = '0xBca55E153d08d77BFac33e7153dC6eC12e42Bd49';
const noWeb3ErrorMessage =
  'Could not connect to your web3 wallet. Please ensure your wallet is unlocked, and you are using the "Main Ethereum Network". ';
const noWeb3WalletFound = (
  <div>
    It looks like you do not have an ethereum wallet, or it is not enabled. In
    order to claim your token, please install{' '}
    <a href="http://metamask.io" target="_blank">
      Metamask
    </a>{' '}
    and refresh the page.
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDonateModal: null,
      animals: [],
      // UI Logic
      errorMessage: false,

      //web3
      donationAmount: 0,
      metamaskEnabled: false,
      accounts: []
    };

    this.firebase = firebase.database().ref();

    this.hideDonateModal = this.hideDonateModal.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillMount() {
    this.importDogTokenImages();
  }

  componentDidMount = () => {
    this.enableWeb3();
  };

  importDogTokenImages() {
    var animals = [];

    var i = 1;
    while (i < 230) {
      var dog = {
        name: `Dog Token ${i}`,
        image: `tokenImg/dog${i}.jpg`
      }
      animals.push(dog);
      i++;
    }

    this.setState({animals: animals});
  }

  clickHandler(e, index) {
    this.setState({ activeDonateModal: index });
  }

  hideDonateModal() {
    this.setState({ activeDonateModal: null, errorMessage: false });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value, errorMessage: false });
  };

  enableWeb3 = () => {
    if (window.ethereum) {
      try {
        window.ethereum.enable().then(() => {
          window.web3.eth.getAccounts((err, accounts) => {
            console.log('metamask enabled!');
            this.setState({ metamaskEnabled: true, accounts });
          });
        });
      } catch (e) {
        // console.log(e);
      }
    }
  };

  handleDonateETH = () => {
    let {
      donationAmount,
      accounts,
      activeDonateModal,
      metamaskEnabled
    } = this.state;
    donationAmount = '0.1'; // ETH
    const donationId = activeDonateModal;

    try {
      if (!metamaskEnabled) {
        this.setState({ errorMessage: noWeb3WalletFound });
      } else {
        const heritage = new web3.eth.Contract(
          heritageABI,
          heritageContractAddress
        );

        this.sendDonaterInfo();

        // heritage.methods
        //   .makeDonation(donationId)
        //   .send({
        //     from: accounts[0],
        //     value: web3.utils.toWei(donationAmount, 'ether')
        //   })
        //   .then(response => {
        //     console.log('Metamask response' + response.toString());
        //     this.sendDonaterInfo();
        //   })
        //   .catch(err => {
        //     this.setState({ errorMessage: noWeb3ErrorMessage });
        //     // console.log(err);
        //   });
      }
    } catch (err) {
      this.setState({ errorMessage: noWeb3ErrorMessage });
      // console.log(err);
    }
  };

  sendDonaterInfo() {
    var email = this.state.donorEmail;
    var name = this.state.donorName;

    debugger;

    this.firebase.push({
      email,
      name
    })
  }

  render() {
    var self = this;

    return (
      <div className="container">
        <Row>
          {this.state.animals.map(function(animal, i) {
            return (
              <Col className="token-card" sm="3" xs="10" key={i}>
                <Card>
                  <CardImg top src={animal.image} alt="Card image cap" />
                  <CardBody>
                    <CardTitle className="center-text">{animal.name}</CardTitle>
                    <Button
                      onClick={e => self.clickHandler(e, i)}
                      className="card-donate-button"
                    >
                      Donate
                    </Button>
                    <Modal
                      id={i}
                      show={self.state.activeDonateModal === i}
                      onHide={self.hideDonateModal}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title>{animal.name}</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          Name:{' '}
                          <Form.Input
                            required
                            type="text"
                            name="donorName"
                            value={self.state.donorName}
                            onChange={self.handleChange}
                          />
                          Email Address:{' '}
                          <Form.Input
                            required
                            type="email"
                            name="donorEmail"
                            value={self.state.donorEmail}
                            onChange={self.handleChange}
                          />
                          <p>
                            This info is for use to issue tax receipts for
                            Muttville.
                          </p>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer className="modal-footer">
                        <Row className="modal-payment-options">
                          <Col>
                            <img id="eth" src={ethereumLogo} height="80" />
                            <Button
                              className="card-donate-button"
                              onClick={() => {
                                console.log(
                                  self.state.donorName + self.state.donorEmail
                                );
                                if (
                                  !self.state.donorName ||
                                  !self.state.donorEmail
                                ) {
                                  self.setState({
                                    errorMessage:
                                      'Please enter your name and email.'
                                  });
                                } else self.handleDonateETH();
                              }}
                            >
                              Donate with ETH
                            </Button>
                          </Col>
                          <Col>
                            <img id="card" src={creditCard} height="80" />
                            <Button
                              as="a"
                              className="card-donate-button"
                              href="https://raisedonors.com/muttville/heritage"
                              target="_blank"
                            >
                              Donate with Credit Card
                            </Button>
                          </Col>
                        </Row>
                      </Modal.Footer>
                      <div className="errorMessage">
                        {self.state.errorMessage}
                      </div>
                      {self.state.successMessage}
                    </Modal>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default App;
