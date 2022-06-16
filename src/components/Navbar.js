import React, { Comp } from 'react';

class Navbar extends Comp {
    render() {
        return (
            <nav className='navbar'>
                <a>Testing Staking</a>
                <ul>
                    <li>
                        <small>Acc Number :
                            <br />
                            <h1>{this.props.account}</h1>
                        </small>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default Navbar;