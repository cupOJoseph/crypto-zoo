import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button } from 'reactstrap';
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: [{
        name: 'Rover',
        image: 'http://petmd.com/sites/default/files/pekingese-dog.jpg',
        subtitle: 'Valuable',
        description: 'A little more info'
      }, {
        name: 'Sam',
        image: 'https://www.gannett-cdn.com/-mm-/d8427785073ef3bf0463f168465a2564fdd37ce8/c=160-0-1440-1280/local/-/media/USATODAY/USATODAY/2013/11/24//1385325676002-GAN-TALKING-DOG-112413-3.jpg?width=200&height=200&fit=crop',
        subtitle: 'Rare dog breed',
        description: 'A little more info'
      }]
    };
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
