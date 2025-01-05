import PropTypes from "prop-types";
import "./HelpPage.css";

const HelpPage = ({ onBack }) => {
    return (
        <div className="help-page">
            <h1>Help</h1>
            <h2>Instructions</h2>
            <ol>
                <li>
                    If you already have an account, log in with your credentials. If not, create a new account by
                    following the on-screen registration process.
                </li>
                <li>
                    Upon logging in, you will be directed to the homepage. At the top of the page, you’ll find your
                    public key. You can view and download this key.
                </li>
                <li>
                    Your private key will appear below the public key, but it will only be shown once. Make sure to
                    download and save your private key immediately, as you won’t be able to view it again once you leave
                    this page.
                </li>
                <li>
                    In the top-right corner of the page, you’ll see a download button for the Google Chrome extension.
                    Click this button to download the extension to your browser. Once downloaded, proceed with the
                    installation of the extension.
                </li>
                <li>
                    To install the extension, you must unzip the the archive. Then, open your Chrome browser, type chrome://extensions in your address bar and click enter. On top right of the page you will see a switch named Developer Mode, enable it. After that click the Load Unpacked button and select the folder you have unzipped. You have successfully installed the extension, you can enable or disable it as you wish.
                </li>
                <li>
                    After the extension has been installed, click on the extension icon in your browser. Log in using
                    the same credentials you used when creating your account on the website.
                </li>
                <li>
                    Next, you will need to upload the private key that you downloaded earlier. This key is required to
                    decrypt emails and ensure the security of your communications.
                </li>
                <li>
                    Once the private key is uploaded successfully, the app will be ready to decrypt any encrypted emails
                    you receive. You can now view the contents of your incoming encrypted emails.
                </li>
                <li>
                    To send an encrypted email, go to mail.google.com and simply fill out the usual fields like you would with a regular email
                    (recipient, subject, body, etc.).
                </li>
                <li>
                    Before clicking the Send button, you’ll notice a button named Encrypt&Send next to it. Click this
                    button to enable encryption for your email. Once the email is encrypted, you can send it securely to
                    your recipient.
                </li>
            </ol>

            <div>
                <h2>FAQ</h2>
                <ul>
                    <li>
                        <strong>What happens if I lose my private key?</strong><br/>
                        It is very important to securely store your private key. You must download it when it is first created and ensure that it is not lost. If you lose your private key and create a new one, you will not be able to view any previously received encrypted emails because the encrypted emails can only be opened with your private key.
                    </li>
                    <li>
                        <strong>What does the &#34;Delete Key Record&#34; button do?</strong><br/>
                        The &#34;Delete Key Record&#34; button permanently deletes your currently active public key from our server. This action is irreversible, so please be careful before proceeding with this step.
                    </li>
                    <li>
                        <strong>Is this service free to use?</strong><br/>
                        Yes, our service is completely free. You can use our encrypted email service unlimitedly and securely encrypt your emails.
                    </li>
                    <li>
                        <strong>While using the Google Chrome extension, are my emails still secure from Google or other third parties?</strong><br/>
                        Yes, your emails will never be read by Google or any other third party. This system provides end-to-end encryption. Your public key is stored on our servers, while your private key is securely stored by you. Only you can view the encrypted emails.
                    </li>
                    <li>
                        <strong>How do I generate a new private key?</strong><br/>
                        To generate a new private key, go to the homepage of the app, and follow the steps to create a new key pair. Make sure to download and securely store the new private key as it will only be shown once.
                    </li>
                    <li>
                        <strong>Can I use this service to send emails to people who don’t use it?</strong><br/>
                        Yes, you can send encrypted emails to anyone, even if they don’t use this service. However, the recipient will need the corresponding private key to decrypt and read your message.
                    </li>
                    <li>
                        <strong>How do I know if my email has been encrypted?</strong><br/>
                        When composing an email, you will see an option to encrypt the email. Once you click the encryption option, the email will be encrypted before it’s sent.
                    </li>
                    <li>
                        <strong>Can I delete my account?</strong><br/>
                        Yes, you can delete your account at any time from the settings page. Please note that deleting your account will also remove all associated keys and data, and this action cannot be undone.
                    </li>
                    <li>
                        <strong>Is it safe to store my private key on my computer?</strong><br/>
                        While storing your private key on your computer is generally safe, we recommend keeping it in a secure location, such as an encrypted folder or password manager, to prevent unauthorized access.
                    </li>
                    <li>
                        <strong>What should I do if someone gains access to my private key?</strong><br/>
                        If you believe someone has gained access to your private key, it is essential to generate a new key pair immediately. Make sure to delete the compromised key and update the encryption settings for your email account.
                    </li>
                </ul>
            </div>
            <button onClick={onBack}>Back to Home</button>
        </div>
    );
};

HelpPage.propTypes = {
    onBack: PropTypes.func.isRequired,
};

export default HelpPage;