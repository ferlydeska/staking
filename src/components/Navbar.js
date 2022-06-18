import React, { Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className='navbar'>
                <h3>Testing Staking</h3>
                <ul>
                    <li>
                        <small>Account Active :
                            <br />
                            <b><label>{this.props.akun}</label></b>
                        </small>
                    </li>
                    <li>
                        <small>Owner:
                            <br />
                            <b><label>{this.props.akunOwner}</label></b>
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;