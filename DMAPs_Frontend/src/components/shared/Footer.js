import React, { Component } from 'react'
import DMAPLogo from '../../assets/images/DMAPLogo.png';
import './Footer.scss';

export class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
        {/* <hr/> */}
          <p className="footertext">  
          <span className="powered-by">Powered by </span>
          <a href="https://DMAP.ai" target="_blank"><img className="footerlogopos" src={DMAPLogo} alt="image not found"/></a>
          </p>
        </footer>
      </div>
    )
  }
}

export default Footer
