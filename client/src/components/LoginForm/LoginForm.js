import React, { useState, useRef } from 'react';
import { throttle } from 'lodash';
import './LoginForm.css';
import logo from '../Navbar/logo.png';

const LoginForm = (props) => {
	const passwordEl = useRef(null);
	const usernameEl = useRef(null);
	const faceEl = useRef(null);
	const showPasswordEl = useRef(null);
	const [buttonEye, setButtonEye] = useState("fa fa-eye-slash")

	const rotateFace = () => {
		const length = Math.min(usernameEl.current.selectionEnd - 16, 19);
		faceEl.current.style.setProperty('--rotate-head', `${-length}deg`);
	};

	const unrotateFace = () => {
		faceEl.current.style.setProperty('--rotate-head', '0deg');
	};

	const showPassword = () => {
		if (passwordEl.current.type === 'text') {
			passwordEl.current.type = 'password';
			setButtonEye("fa fa-eye-slash")
		} else {
			passwordEl.current.type = 'text';
			setButtonEye("fa fa-eye")
		}
	};

	const moveFace = (event) => {
		const length = Math.min(event.target.value.length - 16, 19);
		faceEl.current.style.setProperty('--rotate-head', `${-length}deg`);
	};

	return (
		<>
			<div className="center">
				<div className="fixedrino">
					<div className="cloud large cloud-1">
						<div /><div /><div /><div />
					</div>
					<div className="cloud normal cloud-2">
						<div /><div /><div /><div />
					</div>
					<div className="cloud small cloud-3">
						<div /><div /><div /><div />
					</div>
					<div className="cloud tiny cloud-4">
						<div /><div /><div /><div />
					</div>
					<div className="cloud large cloud-5">
						<div /><div /><div /><div />
					</div>
					<div className="cloud normal cloud-6">
						<div /><div /><div /><div />
					</div>
					<div className="cloud small cloud-7">
						<div /><div /><div /><div />
					</div>
					<div className="cloud tiny cloud-8">
						<div /><div /><div /><div />
					</div>
					<div className="cloud small cloud-9">
						<div /><div /><div /><div />
					</div>
					<div className="cloud normal cloud-10">
						<div /><div /><div /><div />
					</div>
					<div className="cloud tiny cloud-11">
						<div /><div /><div /><div />
					</div>
					<div className="cloud small cloud-12">
						<div /><div /><div /><div />
					</div>
				</div>
				<div ref={faceEl} className="face">
					<div>
						<img
							alt=""
							src={logo}
							width="55"
							height="55"
							className="d-inline-block align-top"
						/>
					</div>
					<div className="eyes">
						<div className="eye eye--right">
							<div className="plane-container-opp">
								<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1131.53px" height="379.304px" viewBox="0 0 1131.53 379.304" enableBackground="new 0 0 1131.53 379.304" xmlSpace="preserve" className="plane">
									<polygon fill="#D8D8D8" points="72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223  " />
									<polygon fill="#C4C4C3" points="1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102   " />
								</svg>
							</div>
						</div>
					</div>
					<div className="plane-container">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="1131.53px" height="379.304px" viewBox="0 0 1131.53 379.304" enableBackground="new 0 0 1131.53 379.304" xmlSpace="preserve" className="plane">
							<polygon fill="#D8D8D8" points="72.008,0 274.113,140.173 274.113,301.804 390.796,221.102 601.682,367.302 1131.53,0.223  " />
							<polygon fill="#C4C4C3" points="1131.53,0.223 274.113,140.173 274.113,301.804 390.796,221.102   " />
						</svg>
					</div>
				</div>
				<div className="login">
					<label>
						<div className="fa fa-envelope" />
						<input ref={usernameEl} onInput={(e) => { moveFace(e); }} onFocus={(e) => { rotateFace(); }} onBlur={(e) => { unrotateFace(); }} className="username" type="text" autoComplete="on" placeholder="Email" />
					</label>
					<label>
						<div className="fa fa-lock" />
						<input ref={passwordEl} className="password" type="password" autoComplete="off" placeholder="Password" />
						<button type="button" ref={showPasswordEl} onClick={throttle((e) => { showPassword(); }, 100)} className="password-button"><span className={buttonEye} /></button>
					</label>
					<button type="button" className="login-button">Login</button>
				</div>
				<div className="social-buttons">
					<div className="social">
						<div className="fa fa-google" />
					</div>
					<div className="social">
						<div className="fa fa-linkedin" />
					</div>
					<div className="social">
						<div className="fa fa-instagram" />
					</div>
				</div>
				<div className="footer"><strong>Register</strong></div>
			</div>
		</>
	);
};

export default LoginForm;
