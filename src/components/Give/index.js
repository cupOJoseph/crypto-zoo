import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: [{
        name: 'Rover',
        image: 'http://petmd.com/sites/default/files/pekingese-dog.jpg'
      }, {
        name: 'Sam',
        image: 'https://www.gannett-cdn.com/-mm-/d8427785073ef3bf0463f168465a2564fdd37ce8/c=160-0-1440-1280/local/-/media/USATODAY/USATODAY/2013/11/24//1385325676002-GAN-TALKING-DOG-112413-3.jpg?width=200&height=200&fit=crop'
      }, {
        name: 'Judy',
        image: 'https://www.gannett-cdn.com/-mm-/f5e7476e511e59f9d0afe1c95bb1814272fbd5ca/c=0-80-480-560/local/-/media/2018/01/15/Phoenix/Phoenix/636516421787547649-maxthedog2.jpg?width=200&height=200&fit=crop'
      }]
    };
  }

  render() {
    return (
      <div className="App">
        <Card>
        {this.state.animals.map(function(animal, i) {
            return <Col sm="2" key={ i }>
                    <CardImg top src={animal.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{animal.name}</CardTitle>
                      <CardSubtitle>Card subtitle</CardSubtitle>
                      <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                      <Button>Button</Button>
                    </CardBody>
                </Col>
        })}
        </Card>
      </div>
    );
  }
}

export default App;
