import PropTypes from "prop-types";
import "./HelpPage.css";

const HelpPage = ({ onBack }) => {
    return (
        <div className="help-page">
            <h1>Help</h1>
            <p>Welcome to the help section. I&#39;ll write the help section soon :D</p>
            <button onClick={onBack}>Back to Home</button>
        </div>
    );
};

HelpPage.propTypes = {
    onBack: PropTypes.func.isRequired, // Expect onBack to be a function and required
};

export default HelpPage;