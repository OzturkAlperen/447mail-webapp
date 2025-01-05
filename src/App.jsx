import { useState, useEffect } from "react";
import { auth, db } from "./configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, deleteUser, signOut }
    from "firebase/auth";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import AuthForm from "./components/AuthForm";
import KeyDisplay from "./components/KeyDisplay";
import HelpPage from "./components/HelpPage";
import { generateKeyPair, exportPublicKey } from "./utils/cryptoUtils";
import FileSaver from 'file-saver';
import "./App.css";
import Header from "./components/Header.jsx";

const App = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState("");
    const [publicKey, setPublicKey] = useState(null);
    const [privateKeyJwk, setPrivateKeyJwk] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [page, setPage] = useState("home");


    const handleGenerateNewKeys = async () => {
        if (!user) return;
        const { publicKey, privateKey } = await generateKeyPair();
        const jwkPublic = await exportPublicKey(publicKey);
        const jwkPrivate = await window.crypto.subtle.exportKey('jwk', privateKey);
        setPrivateKeyJwk(jwkPrivate); // Set private key for one-time display
        await setDoc(doc(db, "users", user.email), { publicKey: jwkPublic });
        setPublicKey(jwkPublic);
        setMessage("New keys generated and uploaded. Below is your new private key. Download it now, it won't be shown again.");
    };

    const handleDownloadKey = (isPrivateKey) => {
        if (isPrivateKey ? !privateKeyJwk : !publicKey) {
            setMessage("No key available to download.");
            return;
        }
        const blob = new Blob([JSON.stringify(isPrivateKey ? privateKeyJwk : publicKey)], { type: "application/json" });
        FileSaver.saveAs(blob, `${isPrivateKey ? "privateKey" : "publicKey"}.json`);
        setMessage(`${isPrivateKey ? "privateKey" : "publicKey"} key downloaded.`);
    };

    const restorePublicKey = async (restoredKey) => {
        if (!user) {
            setMessage("You must be logged in to restore your public key.");
            return;
        }
        try {
            if (!restoredKey.kty || !restoredKey.n || !restoredKey.e) {
                setMessage("Invalid key file. Please upload a valid public key in JWK format.");
                return;
            }
            await setDoc(doc(db, "users", user.email), { publicKey: restoredKey });
            setPublicKey(restoredKey);
            setPrivateKeyJwk(null);
            setMessage("Public key successfully restored!");
        } catch (error) {
            setMessage("Failed to restore public key. Error: " + error.message);
        }
    };

    const handleDeleteKeyRecord = async () => {
        if (!user) return;
        await deleteDoc(doc(db, "users", user.email));
        setPublicKey(null);
        setPrivateKeyJwk(null);
        setMessage("Your key record has been deleted. Your account still exists.");
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleRestoreClick = async () => {
        if (!selectedFile) {
            alert("No file selected.");
            return;
        }
        try {
            const fileContent = await selectedFile.text();
            const restoredKey = JSON.parse(fileContent);
            if (restorePublicKey) {
                await restorePublicKey(restoredKey);
                setSelectedFile(null);
            } else {
                alert("Restore handler not provided.");
            }
        } catch (error) {
            alert("Failed to restore the key. Error: " + error.message);
        }
    };

    const keyControlSet = {
        onDownload: handleDownloadKey,
        onDelete: handleDeleteKeyRecord,
        onGenerate: handleGenerateNewKeys,
        onRestoreClick: handleRestoreClick,
        onFileSelect: handleFileSelect,
        selectedFile: selectedFile,
    }


    const handleLogout = async () => {
        await signOut(auth);
        setUser(null);
        setPublicKey(null);
        setPrivateKeyJwk(null);
        setMessage("Logged out.");
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        await deleteDoc(doc(db, "users", user.email));
        await deleteUser(user);
        setUser(null);
        setPublicKey(null);
        setPrivateKeyJwk(null);
        setMessage("Your account has been deleted completely.");
    };

    const links = [
        {
            label: "Profile",
            iconSrc: "/profile.png",
            type: "dropdown",
            dropdownItems: [
                { label: "Logout", iconSrc:"", onClickHandler: handleLogout },
                { label: "Delete Account", iconSrc:"", onClickHandler: handleDeleteAccount},
            ],
        },
        {
            label: "Download",
            iconSrc: "/download.png",
            type: "download",
            href: "https://drive.usercontent.google.com/download?id=1-EOEJOPrf5esVYnge5ITGghtUcvKPAVl&export=download",
        },
        {
            label: "Help",
            iconSrc: "/help.png",
            type: "link",
            onClickHandler: () => setPage("help"),
        },
    ];


    useEffect(() => {
        onAuthStateChanged(auth, async (u) => {
            setUser(u);
            if (u) {
                const pkDoc = await getDoc(doc(db, "users", u.email));
                if (pkDoc.exists()) {
                    setPublicKey(pkDoc.data().publicKey);
                } else {
                    setPublicKey(null);
                }
            } else {
                setPublicKey(null);
                setPrivateKeyJwk(null);
            }
        });
    }, []);

    const handleSignup = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setMessage("Account created successfully!");

            const { publicKey, privateKey } = await generateKeyPair();
            const jwkPublic = await exportPublicKey(publicKey);
            const jwkPrivate = await window.crypto.subtle.exportKey('jwk', privateKey);
            setPrivateKeyJwk(jwkPrivate);

            await setDoc(doc(db, "users", userCredential.user.email), { publicKey: jwkPublic });
            setPublicKey(jwkPublic);
            setMessage("Account created and keys generated. Below is your new private key. Download it now, it won't be shown again.");
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setMessage("Logged in successfully!");
            setPrivateKeyJwk(null);
        } catch (error) {
            setMessage(error.message);
        }
    };


    return (
        <div>
            {user ? (
                <div>
                    <Header logoPath="/logo@0.5x.png" logoAlt="447 Mail Logo" links={links} />
                    <main >
                        {page === "home" && (
                            <div className="user-section">
                                <h2>Welcome, {user.email}</h2>
                                <KeyDisplay keyData={publicKey} keyControls={keyControlSet} />
                                {message && <p className="status-message">{message}</p>}
                                {privateKeyJwk && (
                                    <KeyDisplay
                                        keyData={privateKeyJwk}
                                        keyControls={keyControlSet}
                                        isPrivateKey={true}
                                    />
                                )}
                            </div>
                        )}
                        {page === "help" && <HelpPage onBack={() => setPage("home")} />}
                    </main>
                </div>
                ) : (
                <div className="auth-section">
                    <img src="/logo@0.5x.png" alt="447 Mail Logo" style={{width: "300px", height: "auto"}}/>
                    <AuthForm onSignup={handleSignup} onLogin={handleLogin} message={message}/>
                </div>
            )}
        </div>
    );
};

export default App;