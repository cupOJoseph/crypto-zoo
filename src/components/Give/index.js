import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Row, Col, Button} from 'reactstrap';
import { Modal, } from 'react-bootstrap'
import './style.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeDonateModal: null,
      animals: [],
    };

    this.hideDonateModal = this.hideDonateModal.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentWillMount() {
    var animals =  [{
      name: 'Susan',
      image: 'http://petmd.com/sites/default/files/pekingese-dog.jpg',
      subtitle: 'Pekingese | Rare',
      description: 'Meet Susan!'
    }, {
      name: 'Sam',
      image: 'https://www.gannett-cdn.com/-mm-/d8427785073ef3bf0463f168465a2564fdd37ce8/c=160-0-1440-1280/local/-/media/USATODAY/USATODAY/2013/11/24//1385325676002-GAN-TALKING-DOG-112413-3.jpg?width=200&height=200&fit=crop',
      subtitle: 'Border Collie Mix',
      description: 'A little more info'
    }, {
      name: 'Judy',
      image: 'https://www.gannett-cdn.com/-mm-/f5e7476e511e59f9d0afe1c95bb1814272fbd5ca/c=0-80-480-560/local/-/media/2018/01/15/Phoenix/Phoenix/636516421787547649-maxthedog2.jpg?width=200&height=200&fit=crop',
      subtitle: 'a little info',
      description: 'A little more info'
    }, {
      name: 'lil Bob and Bub',
      image: 'http://www.circlekennelclub.com/uploads/6/8/0/9/6809340/we-are-too-cute_orig.jpg',
      subtitle: 'a little info',
      description: 'A little more info'
    }, {
      name: 'Betty',
      image: 'http://artspoodlegrooming.com/img/cube5.jpg',
      subtitle: 'valuable info here',
      description: 'description info here'
    }, {
      name: 'Jason',
      image: 'https://i0.wp.com/mainetoday.com/wp-content/uploads/2015/07/portland-dogs200.jpg?w=210',
      subtitle: 'description',
      description: 'more text here'
    }, {
      name: 'Ryan',
      image: 'https://camielscutsforpups.com/wp-content/uploads/2017/05/grady-nash-cuts-for-pups-grooming-los-angeles-hollywood-mobile-cats-dogs-van-200x200.jpg',
      subtitle: 'token text',
      description: 'more text'
    }, {
      name: 'Sarah',
      image: 'https://wdfw.wa.gov/enforcement/kbd/graphics/savute_head.jpg',
      subtitle: 'text here',
      description: 'even more text here'
    }]

    this.setState({animals: animals})
  }

  clickHandler(e, index) {
    this.setState({ activeDonateModal: index })
  }

  hideDonateModal() {
    this.setState({ activeDonateModal: null })
  }

  render() {
    var self = this;
    return (
      <div className="container">
        <Row>
          {this.state.animals.map(function(animal, i) {
              return <Col className="token-card" sm="3" key={ i }>
                  <Card>
                    <CardImg top src={animal.image} alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{animal.name}</CardTitle>
                      <CardSubtitle>{animal.subtitle}</CardSubtitle>
                      <CardText className="card-description-text">{animal.description}</CardText>
                      <Button onClick={e => self.clickHandler(e, i)} className="card-donate-button">Donate</Button>

                      <Modal id={i} show={self.state.activeDonateModal === i} onHide={self.hideDonateModal}>
                        <Modal.Header closeButton>
                          <Modal.Title>{animal.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {animal.description}
                         </Modal.Body>
                        <Modal.Footer>
                          <Button className="card-donate-button">Buy Token</Button>
                        </Modal.Footer>
                      </Modal>
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
