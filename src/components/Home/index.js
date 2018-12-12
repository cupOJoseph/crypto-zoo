import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';

import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="image">
          <div className="landing-info">
            <h1>Collect, Trade and Build your Collection of Mutt Tokens</h1>
            <p className="hero-title">100% of the proceeds go to Muttville Senior Dog Rescue.</p>
            <Link to="/give">
              <Button className="muttville-yellow-button">Explore Mutts</Button>
            </Link>
          </div>
        </div>

        <div className="white">
          <div className="padded-container">
            <h2 className="center header">Start your Rescue Efforts</h2>
              <p>For over 10 years Muttville has helped senior dogs who were deemed “unadoptable”,
              find loving homes. This year Muttville is collaborating with A-Cubed to offer a modernized
              donation experience that allows users to donate in both traditional and cryptocurrency to
              support their efforts in helping these sweet dogs find their forever homes. </p>
          </div>
        </div>

        <div className="gray">
          <h2 className="center header">Get Started</h2>
          <Row className="step-row">
            <Col sm={{ size: 1, offset: 2 }}>
              <img width="100" className="chrome-logo" src="chrome_icon.png"/>
            </Col>
            <Col className="step-description" sm="7">
              <p><b>Step 1</b> Install Metamask Chrome, Firefox or Brave extension (if you’re donating using ETH)  or select “pay with a credit card” if you’re using traditional currency</p>
            </Col>
          </Row>

          <Row className="step-row">
            <Col sm={{ size: 1, offset: 2 }}>
              <img width="110" className="dog-logo" src="dog_icon.png"/>
              </Col>
              <Col className="step-description" sm="7">
              <p><b>Step 2</b> Select a mutt you’d like to base your unique animal tokens on and begin collecting</p>
            </Col>
          </Row>

          <Row className="step-row">
            <Col sm={{ size: 1, offset: 2 }}>
              <img width="90" className="eth-logo" src="eth_icon.png"/>
            </Col>
            <Col className="step-description" sm="7">
              <p><b>Step 3</b> Donate</p>
            </Col>
          </Row>

          <Row className="step-row">
            <Col sm={{ size: 1, offset: 2 }}>
              <img width="100" className="friend-logo" src="friend_icon.png"/>
            </Col>
            <Col className="step-description" sm="7">
              <p><b>Step 4</b> Share with family and friends and start trading animal tokens while supporting Muttville’s rescue efforts</p>
            </Col>
          </Row>
        </div>

        <div className="white">
          <h1 className="center header">FAQ</h1>
          <Container className="faq-section">
            <Row>
              <Col sm={{ size: 4 }}>
                <h5>Why support Muttville?</h5>
                <p>Every day, older dogs in good health with wonderful personalities are euthanized. Muttville is working hard to change this by striving to care for and help senior and special needs dogs find loving homes.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>What are Mutt tokens?</h5>
                <p>Each token is special non-fungible collectible, similar to a trading card. Our tokens are represented by a dog like the ones your donation are supporting, a unique description, and permanent proof of your donation stored on the Ethereum blockchain. Our tokens follow ERC-721.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>What’s ERC-721?</h5>
                <p>It’s a programming standard for a popular type of collectable blockchain token, where each token is provably unique, tradable, and permanent. We use this standard to integrate more services with our tokens.</p>
              </Col>
            </Row>
            <Row className="md-padding-top">
              <Col sm={{ size: 4 }}>
                <h5>How does it work?</h5>
                <p>You make a donation using our platform and can select a token of your choice representing one of Muttville’s dogs. Funds will then be sent directly to Muttville via Ethereum’s blockchain.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>If I pay with a credit card can I still receive a Mutt token?</h5>
                <p>Yes! You have the option to add an Ethereum address (which you receive when installing Metamask). We will wait to send your token until your credit card has been processed. You may need to wait several days.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>I’m new to cryptocurrency, do I need to have a special wallet or account to get started?</h5>
                <p>Yes, you will need somewhere to keep your Mutt tokens safe. We recommend <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask Chrome</a> or <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">Firefox extension</a>.</p>
              </Col>
            </Row>
            <Row className="md-padding-top">
              <Col sm={{ size: 4 }}>
                <h5>What is Metamask and how do I set it up? Are there any additional fees associated with this?</h5>
                <p>Metamask is a chrome extension that allows donors using ETH to access their tokens, cryptocurrency via their browser quick and easy.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>What will happen with my donated money?</h5>
                <p>All funds will go to Muttville to support animals needs from vaccinations to food and grooming!</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>How long is this fundraiser running?</h5>
                <p>Donations can be made from today until December 30th.</p>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="footer">
          <h1>Save a Mutt Today</h1>
          <Row className="call-to-action-row">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <p>Look through our database of adorable mutts and select your own personalized mutt token. This token is yours forever on the blockchain and a reminder of your support to Muttville’s rescue efforts!</p>
            </Col>
          </Row>
          <Link to="/give">
            <Button outline className="muttville-outline-color-button">See Mutts</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
