import React, { useState, useRef, useEffect, useCallback } from 'react';
import { throttle } from 'lodash';
import { Modal, Button, Spinner, Row, Toast } from 'react-bootstrap';
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
	const [verifyEmail, setVerifyEmail] = useState('');
	const [loginError, setLoginError] = useState('');
	const [showToast, setShowToast] = useState(false);

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
							verified
						}
					}`
				})
			})
				.then((res) => res.json())
				.then((res) => {
					try {
						event.preventDefault();
						res.data.getUser && setConfirmation(res.data.getUser.email);
						if (res.data.getUser.email === 'true' && res.data.getUser.password === 'true' && res.data.getUser.verified === 1) {
							window.location.reload();
						} else if (res.data.getUser.verified === 0) {
							setVerifyEmail('Please verify email!');
						} else {
							setLoginError('Incorrect login!');
						}
						setIsLoading(false);
					} catch (e) {
						setLoginError('Email does not exist!');
						setIsLoading(false);
					}
				});
		} else if (showRegister && validEmail && email !== '' && password !== '' && confirmedPass !== '' && (password === confirmedPass)) {
			event.preventDefault();
			setIsLoading(true);
			setConfirmation('');
			setError('');
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
				.then((res) => res.json())
				.then((res) => {
					try {
						res.data.addUser && setConfirmation(res.data.addUser.email);
						setShowRegister(false);
						setShowToast(true);
					} catch (e) {
						setIsLoading(false);
					}
					try {
						res.errors && setError(res.errors[0].message);
					} catch (e) {
						setIsLoading(false);
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
			<Modal id="modal-login" show={show} onHide={handleClose} centered>
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
							{verifyEmail && <span className="success-validation"><i className="fa fa-check-circle" /> Please confirm your email.</span>}
							{loginError && <span className="error-validation"><i className="fa fa-times-circle" /> Wrong email and/or password!</span>}
						</Row>
						<Row className="justify-content-center">
							{showRegister && confirmation && <span className="success-validation"><i className="fa fa-check-circle" /> Thanks for signing up! Please confirm your email.</span>}
							{showRegister && error && <span className="error-validation"><i className="fa fa-times-circle" /> Email already exists!</span>}
						</Row>
					</form>
					<div className="social-buttons">
						<div className="social">
							<div className="fa fa-google" />
						</div>
					</div>
					<Toast id={`loginToast${showToast}`} onClose={() => setShowToast(false)} show={showToast} delay={8000} autohide>
						<Toast.Header>
							<img
								src="holder.js/20x20?text=%20"
								className="rounded mr-2"
								alt=""
							/>
							<strong className="mr-auto">TravelingStrategy</strong>
							<small>just now</small>
						</Toast.Header>
						<Toast.Body><br /><Row className="justify-content-center"><svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg></Row><br /><Row>Thank you for joining TravelingStrategy! To finish signing up, please check your inbox for a confirmation email. </Row></Toast.Body>
					</Toast>
					<button
						onClick={() => {
							setValidEmail(true);
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
