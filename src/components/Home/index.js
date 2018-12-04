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
            <h1>Collect, Trade and Build your Collection of Pets</h1>
            <p className="hero-title">100% of funds support Muttville.</p>
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
              <Col sm={{ size: 4, offset: 2 }}>
                <h5>How does it work?</h5>
                <p>When you buy a token, our smart contract will send 100% of the funds directly to Muttville.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>Why Support Muttville?</h5>
                <p>Every day, older dogs in good health with wonderful personalities are euthanized. Muttville reaches out to senior and special needs rescue dogs.</p>
              </Col>
            </Row>
            <Row className="md-padding-top">
              <Col sm={{ size: 4, offset: 2 }}>
                <h5>How does it work?</h5>
                <p>When you buy a token, our smart contract will send 100% of the funds directly to Muttville.</p>
              </Col>
              <Col sm={{ size: 4 }}>
                <h5>Where can I find the smart contracts?</h5>
                <p>We're open sourced and you can take a look <a href="https://github.com/Heritage-Aero/heritage">here</a>.</p>
              </Col>
            </Row>
          </Container>
        </div>

        <div class="footer">
          <h1>Save a Dog Today</h1>
          <Button outline className="muttville-outline-color-button">See Dogs</Button>
        </div>
      </div>
    );
  }
}

export default App;
