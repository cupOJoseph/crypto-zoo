import React, { Component } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import CarouselComponent from '../CarouselComponent/index.js'

import './style.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="image">
          <div className="landing-info">
            <h1>Collect, Trade and Build your Collection of Dog Tokens</h1>
            <p className="hero-title">100% of the proceeds go to Muttville Senior Dog Rescue.</p>
            <Button className="muttville-yellow-button">Explore Pets</Button>{' '}
          </div>
        </div>

        <div className="white">
          <div className="padded-container">
            <h2 className="center header">Start your Rescue Efforts</h2>

          </div>
        </div>

        <div className="gray">
          <h1 className="center header">FAQ</h1>
          <Container className="faq-section">
            <Row>
              <Col sm={{ size: 4, offset: 0 }}>
                <h5>Why support Muttville?</h5>
                <p>Every day, older dogs in good health with wonderful personalities are euthanized. Muttville is working hard to change this by striving to care for and help senior and special needs dogs find loving homes.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>How does it work?</h5>
                <p>When you make a donation, you can select a token representing a dog of your choice and our system will send funds directly to Muttville via blockchain technology.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>If I pay with a credit card can I still receive an animal token?</h5>
                <p>Yes! You have the option to add an Ethereum address (which you receive when installing Metamask). We will wait to send your token until your credit card has been processed. You may need to wait several days.</p>
              </Col>
            </Row>
            <Row className="md-padding-top">
              <Col sm={{ size: 4, offset: 0 }}>
                <h5>What is Metamask and how do I set it up? Are there any additional fees associated with this?</h5>
                <p>Metamask helps our internet browser, like Chrome or Firefox, read from Ethereum’s blockchain.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>What will happen with my donated money?</h5>
                <p>All funds will go to Muttville to support animals needs from vaccinations to food and grooming</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>I’m new to cryptocurrency, do I need to have a special wallet or account to get started?</h5>
                <p>Yes, you will need somewhere to keep your animals safe. We recommend <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">Metamask Chrome</a> or <a href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/">Firefox extension</a>.</p>
              </Col>
            </Row>
          </Container>
        </div>

        <div class="footer">
          <h1>Save a Dog Today</h1>
          <Row className="call-to-action-row">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <p>Look through our database of adorable dogs and select your own personalized dog token. This token is yours forever on the blockchain and a reminder of your support to Muttville’s rescue efforts!</p>
            </Col>
          </Row>
          <Button outline className="muttville-outline-color-button">See Dogs</Button>
        </div>
      </div>
    );
  }
}

export default App;
