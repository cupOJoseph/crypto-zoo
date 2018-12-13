import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import './style.css';
import ReactGA from 'react-ga';
import heritageABI from '../heritageABI';
import web3 from '../web3';
var $ = require ('jquery');
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
      animals: [],
      accounts: [],
      metamaskEnabled: false,
      errorMessage: false,
      dogId: null,
      dog: null,
      dogTokens: [],
    };
  }

  componentWillMount() {
    this.enableWeb3();
    this.initializeReactGA();
  }

  initializeReactGA() {
    ReactGA.initialize('UA-130917169-1');
    ReactGA.pageview('/profile');
  }

  enableWeb3 = () => {
    if (window.ethereum) {
      try {
        window.ethereum.enable().then(() => {
          window.web3.eth.getAccounts((err, accounts) => {
            console.log('metamask enabled!');
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
         let user = accounts[0];
         var accountToCheck = window.web3.toChecksumAddress(user);
         let requestURL = 'https://heritage-api.glitch.me/api/user?address=' + accountToCheck;
         const self = this;

         $.ajax({
             url: requestURL,
             type: 'GET',
             cache: false,
             dataType: 'json',
             success: function (response) {

               self.setDogState(response.tokenArray);
               // self.setState({ animals: response.tokenArray });
             //   let dogs = response.tokenArray;
             //   // var results = new Promise((resolve, reject) => {
             //   debugger;
             //     dogs.forEach((dog) => {
             //       try {
             //         let fundraiserId;
             //         const heritage = new web3.eth.Contract(
             //           heritageABI,
             //           heritageContractAddress
             //         );
             //         var imgstring;
             //
             //         heritage.methods.getDonation(dog.TokenID).call().then((token) => {
             //           fundraiserId = token._originalDonationId;
             //           // debugger;
             //           // imgstring = "/dog" + fundraiserId + ".jpg";
             //           // resolve();
             //         })
             //       } catch(e) {
             //         console.log(e);
             //       }
             //     })
             //
             //   // self.setState({ dogs });
             },
             error: function (error) {
              console.log(error)
             }
         });
       }
     } catch (err) {
       this.setState({ errorMessage: noWeb3ErrorMessage });
     }
  }

  setDogState(dogs) {
    var currentThis = this;

    

    // var results = new Promise((resolve, reject) => {
    //   dogs.forEach((dog) => {
    //     let fundraiserId;
    //         // currentThis.setState({dog})
    //     //     debugger;
    //         var imgstring;
    //         const heritage = new web3.eth.Contract(
    //           heritageABI,
    //           heritageContractAddress
    //         );
    //
    //         heritage.methods.getDonation(dog.TokenID).call().then((token) => {
    //           fundraiserId = token._originalDonationId;
    //           debugger;
    //           // currentThis.setState({dogId: fundraiserId})
    //           // var dog = currentThis.state.dog
    //           // var dogId = currentThis.state.dogId
    //           // dog['fundraiserImage'] = "/dog" + dogId + ".jpg";
    //           // console.log(dog);
    //           // debugger;
    //           resolve()
    //         })
    //   })
    // });

    // results.then(() => {
    //   debugger;
    // })

    try {

    } catch(e) {
      console.log(e);
    }

      // try {
        // let fundraiserId;
        // var results = new Promise((resolve, reject) => {
        //   dogs.forEach((dog) => {
        //     currentThis.setState({dog})
        //     debugger;
        //     var imgstring;
        //     const heritage = new web3.eth.Contract(
        //       heritageABI,
        //       heritageContractAddress
        //     );
        //
        //   heritage.methods.getDonation(dog.TokenID).call().then((token) => {
        //     fundraiserId = token._originalDonationId;
        //     currentThis.setState({dogId: fundraiserId})
        //     var dog = currentThis.state.dog
        //     var dogId = currentThis.state.dogId
        //     dog['fundraiserImage'] = "/dog" + dogId + ".jpg";
        //     console.log(dog);
        //     debugger;
        //     resolve()
        //   })
        // });
        //
        //  results.then(() => {
        //    debugger;
        //  })

        //
        //
        // heritage.methods.getDonation(dog.TokenID).call().then((token) => {
        //   fundraiserId = token._originalDonationId;
        //   currentThis.setState({dogId: fundraiserId})
        //   debugger;
        //   var dog = currentThis.state.dog
        //   var dogId = currentThis.state.dogId
        //   dog['fundraiserImage'] = "/dog" + dogId + ".jpg";
        //   console.log(dog)
        //   console.log(dogId)
        //
        //   debugger;
        // })
      // } catch(e) {
      //   console.log(e);
      // }
    // })
  }

  render() {
    return (
      <div className="container">
        <Row>
          {this.state.dogTokens.map(function(animal, i) {
              return <Col className="token-card" sm="3" key={ i }>
                  <Card>
                    <CardTitle>#{animal.TokenID}</CardTitle>
                    <CardImg top src={animal.fundraiserImage} alt="Card image cap" />
                    <CardBody>
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
