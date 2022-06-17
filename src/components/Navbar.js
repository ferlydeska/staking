import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className='navbar'>
                <a href='?n=1'>Testing Staking</a>
                <ul>
                    <li>
                        <small>Acc Number :
                            <br />
                            <b><label>{this.props.akun}</label></b>
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;