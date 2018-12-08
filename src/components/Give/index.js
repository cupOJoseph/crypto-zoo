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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from 'reactstrap';
import './style.css';
import web3 from '../web3';
import heritageABI from '../heritageABI';
const heritageContractAddress = '0xBca55E153d08d77BFac33e7153dC6eC12e42Bd49';
const noWeb3ErrorMessage =
  'Could not connect to your web3 wallet, is it enabled?';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: [
        {
          name: 'Susan',
          image: 'http://petmd.com/sites/default/files/pekingese-dog.jpg',
          subtitle: 'Pekingese | Rare',
          description: 'Meet Susan!'
        },
        {
          name: 'Sam',
          image:
            'https://www.gannett-cdn.com/-mm-/d8427785073ef3bf0463f168465a2564fdd37ce8/c=160-0-1440-1280/local/-/media/USATODAY/USATODAY/2013/11/24//1385325676002-GAN-TALKING-DOG-112413-3.jpg?width=200&height=200&fit=crop',
          subtitle: 'Border Collie Mix',
          description: 'A little more info'
        },
        {
          name: 'Judy',
          image:
            'https://www.gannett-cdn.com/-mm-/f5e7476e511e59f9d0afe1c95bb1814272fbd5ca/c=0-80-480-560/local/-/media/2018/01/15/Phoenix/Phoenix/636516421787547649-maxthedog2.jpg?width=200&height=200&fit=crop',
          subtitle: 'a little info',
          description: 'A little more info'
        },
        {
          name: 'lil Bob and Bub',
          image:
            'http://www.circlekennelclub.com/uploads/6/8/0/9/6809340/we-are-too-cute_orig.jpg',
          subtitle: 'a little info',
          description: 'A little more info'
        },
        {
          name: 'Betty',
          image: 'http://artspoodlegrooming.com/img/cube5.jpg',
          subtitle: 'valuable info here',
          description: 'description info here'
        },
        {
          name: 'Jason',
          image:
            'https://i0.wp.com/mainetoday.com/wp-content/uploads/2015/07/portland-dogs200.jpg?w=210',
          subtitle: 'description',
          description: 'more text here'
        },
        {
          name: 'Ryan',
          image:
            'https://camielscutsforpups.com/wp-content/uploads/2017/05/grady-nash-cuts-for-pups-grooming-los-angeles-hollywood-mobile-cats-dogs-van-200x200.jpg',
          subtitle: 'token text',
          description: 'more text'
        },
        {
          name: 'Sarah',
          image: 'https://wdfw.wa.gov/enforcement/kbd/graphics/savute_head.jpg',
          subtitle: 'text here',
          description: 'even more text here'
        }
      ],
      // UI Logic
      displayDonateModal: false,
      errorMessage: false,
      //web3
      donationId: 0,
      donationAmount: 0,
      metamaskEnabled: false,
      accounts: []
    };
  }
  componentDidMount = () => {
    this.enableWeb3();
  };
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  enableWeb3 = () => {
    try {
      window.ethereum.enable().then(() => {
        window.web3.eth.getAccounts((err, accounts) => {
          this.setState({ metamaskEnabled: true, accounts });
        });
      });
    } catch (e) {
      // console.log(e);
    }
  };
  toggleDonateModal = () => {
    this.setState({
      displayDonateModal: !this.state.displayDonateModal,
      errorMessage: false
    });
  };
  handleDonateETH = () => {
    let { donationId, donationAmount, accounts } = this.state;
    donationAmount = '0.1'; // ETH

    try {
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
    } catch (err) {
      this.setState({ errorMessage: noWeb3ErrorMessage });
      // console.log(err);
    }
  };
  renderAnimalCards() {
    const { displayDonateModal } = this.state;
    let animalCards = [];
    this.state.animals.forEach((animal, i) => {
      animalCards.push(
        <Col className="token-card" sm="3" key={i}>
          <Card>
            <CardImg top src={animal.image} alt="Card image cap" />
            <CardBody>
              <CardTitle>{animal.name}</CardTitle>
              <CardSubtitle>{animal.subtitle}</CardSubtitle>
              <CardText className="card-description-text">
                {animal.description}
              </CardText>
              <Button
                className="card-donate-button"
                onClick={() => {
                  this.toggleDonateModal();
                  this.setState({ donationId: i });
                }}
              >
                Donate
              </Button>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return <Row>{animalCards}</Row>;
  }
  render() {
    return (
      <div className="container">
        {this.renderAnimalCards()}
        <Modal
          isOpen={this.state.displayDonateModal}
          toggle={this.toggleDonateModal}
          className="modal-donate"
        >
          <ModalHeader toggle={this.toggleDonateModal}>
            Choose a payment method
          </ModalHeader>
          <ModalBody>Ethereum, DAI, Credit Card</ModalBody>
          <ModalFooter>
            <Button
              className="card-donate-button"
              onClick={() => {
                this.handleDonateETH();
              }}
            >
              ETH
            </Button>
            <Button className="card-donate-button" onClick={() => {}}>
              DAI
            </Button>
            <Button className="card-donate-button" onClick={() => {}}>
              Credit Card
            </Button>
          </ModalFooter>
          {this.state.errorMessage}
        </Modal>
      </div>
    );
  }
}

export default App;
