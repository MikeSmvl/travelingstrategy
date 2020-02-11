import React, { useState, useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import { Modal, Button, Spinner, Row } from 'react-bootstrap';
import './LoginForm.css';
import logo from '../Navbar/logo.png';

const LoginForm = (props) => {
	const [show, setShow] = useState(false);
	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);
	const usernameEl = useRef(null);
	const faceEl = useRef(null);
	const password1 = useRef(null);
	const password2 = useRef(null);
	const [buttonEye1, setButtonEye1] = useState('fa fa-eye-slash');
	const [buttonEye2, setButtonEye2] = useState('fa fa-eye-slash');
	const [showRegister, setShowRegister] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPass, setConfirmedPass] = useState('');
	const [buttonName, setButton] = useState('Register');
	const [isLoading, setIsLoading] = useState(false);
	const [confirmation, setConfirmation] = useState('');
	const [error, setError] = useState('');
	const rotateFace = () => {
		const length = Math.min(usernameEl.current.selectionEnd - 16, 19);
		faceEl.current.style.setProperty('--rotate-head', `${-length}deg`);
	};
	const [validEmail, setValidEmail] = useState(true);
	const [passMatch, setPassMatch] = useState(true);
	let showRegisterClass;
	let buttonText;
	if (showRegister) {
		showRegisterClass = 'showIt';
		buttonText = 'Register';
	} else {
		showRegisterClass = 'hideIt';
		buttonText = 'Login';
	}

	const validateEmail = (anEmail) => {
		if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(anEmail))) setValidEmail(false);
		else setValidEmail(true);
	};

	const comparePasswords = useCallback(() => {
		if (confirmedPass === password) setPassMatch(true);
		else setPassMatch(false);
	}, [password, confirmedPass]);

	const unrotateFace = () => {
		faceEl.current.style.setProperty('--rotate-head', '0deg');
	};

	const showPassword1 = () => {
		if (password1.current.type === 'text') {
			password1.current.type = 'password';
			setButtonEye1('fa fa-eye-slash');
		} else {
			password1.current.type = 'text';
			setButtonEye1('fa fa-eye');
		}
	};

	const showPassword2 = () => {
		if (password2.current.type === 'text') {
			password2.current.type = 'password';
			setButtonEye2('fa fa-eye-slash');
		} else {
			password2.current.type = 'text';
			setButtonEye2('fa fa-eye');
		}
	};

	const moveFace = (event) => {
		const length = Math.min(event.target.value.length - 16, 19);
		faceEl.current.style.setProperty('--rotate-head', `${-length}deg`);
	};

	const handleSubmit = (event) => {
		if (validEmail && email !== '' && password !== '' && !showRegister) {
			event.preventDefault();
			setIsLoading(true);
			fetch('http://localhost:4000/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					query: `{
						getUser(email:"${email}" password: "${password}") {
							email
							password
						}
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					res.data.getUser && setConfirmation(res.data.getUser.email);
					setIsLoading(false);
					if (res.data.getUser.email && res.data.getUser.password) {
						window.location.reload();
					}
				});
		} else if (showRegister && validEmail && email !== '' && password !== '' && confirmedPass !== '' && (password === confirmedPass)) {
			event.preventDefault();
			setIsLoading(true);
			fetch('http://localhost:4000/graphql', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({
					query: `mutation {
						addUser(email: "${email}" password: "${password}") {
							email
						}
					}`
				})
			})
				.then((res) => {
					res.json();
				})
				.then((res) => {
					try {
						res.data.addUser && setConfirmation(res.data.addUser.email);
					} catch (e) {
						setError('Email already exists!');
					}

					setIsLoading(false);
					// window.location.reload();
				});
		}
	};

	useEffect(() => {
		if (confirmedPass) comparePasswords();
	}, [password, confirmedPass, comparePasswords]);

	return (
		<>
			<Button variant="outline-primary" onClick={handleShow}><strong>Login</strong></Button>
			<Modal show={show} onHide={handleClose} centered>
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
								width="75"
								height="75"
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
					<form className="login" onSubmit={(e) => handleSubmit(e)}>
						<label>
							<div className="fa fa-envelope" />
							<input required ref={usernameEl} onInput={(e) => { moveFace(e); }} onFocus={(e) => { rotateFace(); }} onBlur={(e) => { unrotateFace(); validateEmail(e.target.value); setEmail(e.target.value); }} className="username" type="text" autoComplete="on" placeholder="Email" />
						</label>
						<Row className="justify-content-center">
							{!validEmail ? <span className="error-validation"><i className="fa fa-times-circle" /> Email is not valid</span> : <span className="validation" />}
						</Row>
						<label>
							<div className="fa fa-lock" />
							<input required ref={password1} className="password" type="password" autoComplete="off" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
							<button type="button" onClick={throttle((e) => { showPassword1(); }, 100)} className="password-button"><span className={buttonEye1} /></button>
						</label>
						<span className="validation" />
						{showRegister && (
							<label className={showRegisterClass}>
								<div className="fa fa-lock" />
								<input required ref={password2} className="password" type="password" autoComplete="off" placeholder="Confirm password" onBlur={(e) => setConfirmedPass(e.target.value)} />
								<button type="button" onClick={throttle((e) => { showPassword2(); }, 100)} className="password-button"><span className={buttonEye2} /></button>
							</label>
						)}
						{showRegister && !passMatch && <Row className="justify-content-center"><span className="error-validation"><i className="fa fa-times-circle" /> Passwords don&apos;t match</span></Row>}
						{isLoading
							? (<button type="submit" className="login-button"><Spinner size="sm" animation="border" /></button>)
							: (<button type="submit" className="login-button"><strong>{buttonText}</strong></button>)}
						<Row className="justify-content-center">
							{showRegister && confirmation && <span className="success-validation"><i className="fa fa-check-circle" /> Account created!</span>}
							{showRegister && error && <span className="error-validation"><i className="fa fa-times-circle" /> Email already exists!</span>}
						</Row>
					</form>
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
					<button
						onClick={() => {
							setShowRegister(!showRegister);
							if (showRegister) { showRegisterClass = 'showIt'; setButton('Register'); } else { showRegisterClass = 'hideIt'; setButton('Login'); }
						}}
						className="register-button"
						type="button"
					>
						<strong>{buttonName}</strong>
					</button>
				</div>
			</Modal>
		</>
	);
};

export default LoginForm;
