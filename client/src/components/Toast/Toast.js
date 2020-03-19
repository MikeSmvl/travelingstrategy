import * as React from 'react';
import { Toast as RBToast } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Toast.css';


const Toast = (props) => {
    const {
        title = '',
        headerIcon = '',
        type = 'default'
    } = props;
    const [showToast, setShowToast] = React.useState(true);
    const toggleShowToast = () => setShowToast(!showToast);
    let alertClassName;
    type === 'alert' ? alertClassName = 'alertToast' : alertClassName = ''
    return (
        <RBToast show={showToast} onClose={toggleShowToast} className={`TSToast ${alertClassName}`}>
            <RBToast.Header>
                <strong className={`mr-auto ${headerIcon}`}>  {title}</strong>
            </RBToast.Header>
            <RBToast.Body>{props.children}</RBToast.Body>
        </RBToast>
    )
}

Toast.propTypes = {
    iconName: PropTypes.string,
    title: PropTypes.string,
    type: "alert" | "default"
};

export default Toast;