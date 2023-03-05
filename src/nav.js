import React, { Component } from 'react';
import { NavDropdown } from 'react-bootstrap';

class MyNavbar extends Component {
  render() {
    const dropdownStyle = {
      backgroundColor: '#2A303C',
      
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      fontSize: '20px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 'bolder',
      color: 'white',
      textDecoration: 'none'
    };
      
    const dropdownItemStyle = {
      color: '#cfd7dd',
      fontFamily: 'Inter, sans-serif',
      padding: '0.5rem 1rem',
    };
 
    return (
      <div style={dropdownStyle}>
        <a href="https://give.unrefugees.org/220922wint_eoywint_d_3000/?utm_medium=referral&utm_source=donate.unhcr.org&utm_campaign=US_PS_EN_WINTER2022___230103&utm_content=rf1198176&SF_monthly=7011K000002NscXQAS&SF_onetime=7011K000002NscSQAS" target="_blank" style={dropdownItemStyle}>Support refugees!</a>
        <span style={dropdownItemStyle}>All data sourced from UNHCR.</span>
        <a href="mailto:rohinphukan@gmail.com" target="_blank" style={dropdownItemStyle}>Contact me!</a>
        
      </div>
    );
  }
}

export default MyNavbar;
