import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: [{
        name: 'Rover',
        image: 'https://images.pexels.com/photos/8700/wall-animal-dog-pet.jpg?cs=srgb&dl=animal-collar-dog-8700.jpg&fm=jpg'
      }, {
        name: 'Sam',
        image: 'https://images.pexels.com/photos/33287/dog-viszla-close.jpg?cs=srgb&dl=animal-photography-animals-close-up-33287.jpg&fm=jpg'
      }, {
        name: 'Judy',
        image: 'https://images.pexels.com/photos/460823/pexels-photo-460823.jpeg?cs=srgb&dl=animal-beagle-canine-460823.jpg&fm=jpg'
      }]
    };
  }

  render() {
    return (
      <div className="App">
        {this.state.animals.map(function(animal, i) {
            return <div key={ i }>
              <Card>
                <CardImg top width="100%" src={animal.image} width="200" alt="Card image cap" />
                <CardBody>
                  <CardTitle>{animal.name}</CardTitle>
                  <CardSubtitle>Card subtitle</CardSubtitle>
                  <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>

                  <Button>Button</Button>
                </CardBody>
              </Card>
            </div>
        })}
      </div>
    );
  }
}

export default App;
