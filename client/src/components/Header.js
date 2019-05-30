import './styles/Header.css';
import React from 'react';

class Header extends React.Component {
	render() {
		return (
			<div>
				<nav className='navbar navbar-expand-md bg-dark navbar-dark'>
					<a className='navbar-brand' href='https://www.reactos.org/'>
						<img src='https://reactos.org/wiki/images/thumb/0/02/ReactOS_logo.png/300px-ReactOS_logo.png' />
					</a>

					<button
						className='navbar-toggler'
						type='button'
						data-toggle='collapse'
						data-target='#collapsibleNavbar'
					>
						<span className='navbar-toggler-icon' />
					</button>

					<div className='collapse navbar-collapse' id='collapsibleNavbar'>
						<ul className='navbar-nav'>
							<li className='nav-item'>
								<a className='nav-link'>Link</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link'>Link</a>
							</li>
							<li className='nav-item'>
								<a className='nav-link'>Link</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		);
	}
}
export default Header;
