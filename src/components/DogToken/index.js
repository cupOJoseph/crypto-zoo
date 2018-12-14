import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import heritageABI from '../heritageABI';
import web3 from '../web3';
const heritageContractAddress = '0xf30fe881912d8b0c5453048683fc5c91c107461d';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accounts: [],
      metamaskEnabled: false,
      errorMessage: false,
      dogImage: null,
    };
  }

  componentWillMount() {
    this.enableWeb3();
  }

  enableWeb3 = () => {
    if (window.ethereum) {
      try {
        window.ethereum.enable().then(() => {
          window.web3.eth.getAccounts((err, accounts) => {
            console.log('metamask enabled!');
            this.setState({ metamaskEnabled: true, accounts }, () => {
              this.getDogImage();
            })
          });
        });
      } catch (e) {
        // console.log(e);
      }
    }
  };

  getDogImage() {
    var currentThis = this;
    try {
      let fundraiserId;
      const heritage = new web3.eth.Contract(
        heritageABI,
        heritageContractAddress
      );

      heritage.methods.getDonation(this.props.animal.TokenID).call().then((token) => {
        fundraiserId = token._originalDonationId;
        var dogImage = "/dog" + fundraiserId + ".jpg";
        currentThis.setState({ dogImage })
      })
    } catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Col className="token-card" sm="3" key={ this.props.i }>
        <Card>
          <CardTitle>#{this.props.animal.TokenID}</CardTitle>
          <CardImg top src={this.state.dogImage} alt="Card image cap" />
          <CardBody>
            <CardText>{this.props.animal.description}</CardText>
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default App;
