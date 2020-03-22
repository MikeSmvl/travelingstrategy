import * as React from 'react';
import PropTypes from 'prop-types';
import './Frame.css';

const Frame = props => {
	const {username = '', geolocation = '', img = ''} = props;
	return (
		<div class='zoom-on-hover'>
			<a href={`https://www.instagram.com/${username}/`}>
				<div class='frame'>
					<div className='frameHeader'>
						<div className='profilePic'>
							<img src='https://nappstarrocks.com/wp-content/uploads/2017/09/Instagram-circle-icon-1.png' />
						</div>
						<div className='picInfo'>
							<div className='infoTitle'>{username}</div>
							<div className='infoSubtitle'>{geolocation}</div>
						</div>
					</div>
					<img src={img} />
					<div class='frameCaption'>
						<img
							align='left'
							src='https://cdn3.iconfinder.com/data/icons/user-interface-3-5/34/261-512.png'
						/>
						<img
							align='left'
							src='https://img.pngio.com/chat-comment-instagram-media-social-social-media-icon-instagram-comment-png-512_512.png'
						/>
						<img
							align='left'
							src='https://cdn.clipart.email/1f1cc400a515e78d411485569eb2c2cf_instagram-sets-share-icon_512-512.png'
						/>
						<img
							align='right'
							src='https://cdn0.iconfinder.com/data/icons/harmonicons-02/64/bookmark-512.png'
						/>
					</div>
				</div>
			</a>
		</div>
	);
};

Frame.propTypes = {
	username: PropTypes.string,
	geolocation: PropTypes.string,
	img: PropTypes.string
};

export default Frame;
