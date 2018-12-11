import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import './style.css';
import web3 from '../web3';
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
      animals: [],
      accounts: [],
      metamaskEnabled: false,
      errorMessage: false,
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
            debugger;
            this.setState({ metamaskEnabled: true, accounts }, () => {
              this.getTokenList();
            })
          });
        });
      } catch (e) {
        // console.log(e);
      }
    }
  };

  getTokenList() {
    let {
      accounts,
      metamaskEnabled
    } = this.state;

     try {
       if (!metamaskEnabled) {
         this.setState({ errorMessage: noWeb3WalletFound });
       } else {
         let account = accounts[0];
         debugger;
         fetch(`https://heritage-api.glitch.me/api/user?address=${account}`)
         .then(({ results }) => this.setState({ tokens: results }));
       }
     } catch (err) {
       this.setState({ errorMessage: noWeb3ErrorMessage });
     }
  }

  render() {
    return (
      <div className="container">
        <Row>
          {this.state.animals.map(function(animal, i) {
              return <Col className="token-card" sm="3" key={ i }>
                  <Card>
                    <CardImg top src={animal.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{animal.name}</CardTitle>
                      <CardSubtitle className="card-description-text">{animal.subtitle}</CardSubtitle>
                      <CardText>{animal.description}</CardText>
                    </CardBody>
                  </Card>
                </Col>
          })}
        </Row>
      </div>
    );
  }
}

export default App;
