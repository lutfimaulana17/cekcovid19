import React, {Component} from 'react'
import { Container, Button, Link } from 'react-floating-action-button'

class Fab extends Component {
    render() {
      return (
        <Container>
            <Link href="tel:117"
                tooltip="Call Center 117"
                icon="fa fa-phone" />
            <Link href="https://wa.me/6281133399000"
                tooltip="Chat COVID-19"
                icon="fa fa-whatsapp"/>
            <Button
                icon="fa fa-plus"
                rotate={true}
                className="btn-fab" />
        </Container>
      );
    }
  }
  
  export default Fab;