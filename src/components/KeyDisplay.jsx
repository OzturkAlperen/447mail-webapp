import PropTypes from "prop-types";
import "./KeyDisplay.css";

const KeyDisplay = ({ keyData, isPrivateKey = false, keyControls = null}) => {

    return (
        <div className="key-display">
            <h3>Your {isPrivateKey ? "Private" : "Public"} Key:</h3>
            {keyData ? (
                    <div>
                        <pre>{JSON.stringify(keyData, null, 2)}</pre>
                        <button className="key-adjustment-button" onClick={keyControls.onDownload}>
                            Download {isPrivateKey ? "Private" : "Public"} Key
                        </button>
                        {!isPrivateKey && (
                            <div className="key-settings-grid">
                                <input
                                    type="file"
                                    accept="application/json"
                                    onChange={keyControls.onFileSelect}
                                />
                                <button
                                    className="restore-button"
                                    onClick={keyControls.onRestoreClick}
                                    disabled={!keyControls.selectedFile}
                                >
                                    Restore Public Key
                                </button>
                                <button className="key-adjustment-button" onClick={keyControls.onGenerate}>Generate New Keys</button>
                                <button className="key-adjustment-button" onClick={keyControls.onDelete}>Delete Key Record</button>
                            </div>)}
                    </div>
                ) :
                (
                    <div>
                        <p>Couldn&#39;t find {isPrivateKey ? "private" : "public"} key.</p>
                        <button className="key-adjustment-button" onClick={keyControls.onGenerate}>Generate New Keys
                        </button>
                        <div className="key-settings-grid">
                            <input
                                type="file"
                                accept="application/json"
                                onChange={keyControls.onFileSelect}
                            />
                            <button
                                className="restore-button"
                                onClick={keyControls.onRestoreClick}
                                disabled={!keyControls.selectedFile}
                            >
                                Restore Public Key
                            </button>
                        </div>
                    </div>
                )
            }

        </div>
    )
        ;
};

KeyDisplay.propTypes = {
    keyData: PropTypes.object,
    isPrivateKey: PropTypes.bool,
    keyControls: PropTypes.shape({
        onDownload: PropTypes.func.isRequired,
        onDelete: PropTypes.func.isRequired,
        onGenerate: PropTypes.func.isRequired,
        onRestoreClick: PropTypes.func.isRequired,
        onFileSelect: PropTypes.func.isRequired,
        selectedFile: PropTypes.object,
    })
};

export default KeyDisplay;