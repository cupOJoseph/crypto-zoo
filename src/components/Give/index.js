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

    this.hideDonateModal = this.hideDonateModal.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillMount() {
    // need to grab each image for each dog here in a loop and display it in a render?
    // for each dog 1 to 230
    this.importDogTokenImages();

    // var animals = [
    //   {
    //     name: 'Susan',
    //     image: 'http://petmd.com/sites/default/files/pekingese-dog.jpg',
    //     subtitle: 'Pekingese | Rare',
    //     description: 'Meet Susan!'
    //   },
    //   {
    //     name: 'Sam',
    //     image:
    //       'https://www.gannett-cdn.com/-mm-/d8427785073ef3bf0463f168465a2564fdd37ce8/c=160-0-1440-1280/local/-/media/USATODAY/USATODAY/2013/11/24//1385325676002-GAN-TALKING-DOG-112413-3.jpg?width=200&height=200&fit=crop',
    //     subtitle: 'Border Collie Mix',
    //     description: 'A little more info'
    //   },
    //   {
    //     name: 'Judy',
    //     image:
    //       'https://www.gannett-cdn.com/-mm-/f5e7476e511e59f9d0afe1c95bb1814272fbd5ca/c=0-80-480-560/local/-/media/2018/01/15/Phoenix/Phoenix/636516421787547649-maxthedog2.jpg?width=200&height=200&fit=crop',
    //     subtitle: 'a little info',
    //     description: 'A little more info'
    //   },
    //   {
    //     name: 'lil Bob and Bub',
    //     image:
    //       'http://www.circlekennelclub.com/uploads/6/8/0/9/6809340/we-are-too-cute_orig.jpg',
    //     subtitle: 'a little info',
    //     description: 'A little more info'
    //   },
    //   {
    //     name: 'Betty',
    //     image: 'http://artspoodlegrooming.com/img/cube5.jpg',
    //     subtitle: 'valuable info here',
    //     description: 'description info here'
    //   },
    //   {
    //     name: 'Jason',
    //     image:
    //       'https://i0.wp.com/mainetoday.com/wp-content/uploads/2015/07/portland-dogs200.jpg?w=210',
    //     subtitle: 'description',
    //     description: 'more text here'
    //   },
    //   {
    //     name: 'Ryan',
    //     image:
    //       'https://camielscutsforpups.com/wp-content/uploads/2017/05/grady-nash-cuts-for-pups-grooming-los-angeles-hollywood-mobile-cats-dogs-van-200x200.jpg',
    //     subtitle: 'token text',
    //     description: 'more text'
    //   },
    //   {
    //     name: 'Sarah',
    //     image: 'https://wdfw.wa.gov/enforcement/kbd/graphics/savute_head.jpg',
    //     subtitle: 'text here',
    //     description: 'even more text here'
    //   }
    // ];
    //
    // this.setState({ animals: animals });
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
      debugger;
      animals.push(dog);
      i++;
    }

    debugger;

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
        heritage.methods
          .makeDonation(donationId)
          .send({
            from: accounts[0],
            value: web3.utils.toWei(donationAmount, 'ether')
          })
          .then(response => {
            console.log('Metamask response' + response.toString());
          })
          .catch(err => {
            this.setState({ errorMessage: noWeb3ErrorMessage });
            // console.log(err);
          });
      }
    } catch (err) {
      this.setState({ errorMessage: noWeb3ErrorMessage });
      // console.log(err);
    }
  };

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
