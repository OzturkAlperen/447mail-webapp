import PropTypes from "prop-types";
import { useState } from "react";
import "./Header.css";

const Header = ({ logoPath, logoAlt, links }) => {
    Header.propTypes = {
        logoPath: PropTypes.string.isRequired,
        logoAlt: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                iconSrc: PropTypes.string.isRequired,
                type: PropTypes.oneOf(["dropdown", "link", "download"]).isRequired,
                href: PropTypes.string,
                dropdownItems: PropTypes.arrayOf(
                    PropTypes.shape({
                        label: PropTypes.string.isRequired,
                        iconSrc: PropTypes.string.isRequired,
                        href: PropTypes.string.isRequired,
                        onClickHandler: PropTypes.func,
                    })
                ),
            })
        ).isRequired,
    };

    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown((prev) => (prev === index ? null : index));
    };

    return (
        <header className="header">
            <a href="/">
                <img src={logoPath} alt={logoAlt} className="logo"/>
            </a>

            <nav>
                <ul className="header-menu">
                    {links.map((link, index) => {
                        if (link.type === "dropdown") {
                            return (
                                <li
                                    key={index}
                                    className={`dropdown ${
                                        activeDropdown === index ? "active" : ""
                                    }`}
                                    onClick={() => toggleDropdown(index)}
                                >
                                    <img
                                        src={link.iconSrc}
                                        alt={`${link.label} Icon`}
                                        className="menu-icon"
                                    />
                                    {activeDropdown === index && (
                                        <ul className="dropdown-menu">
                                            {link.dropdownItems.map((item, idx) => (
                                                <li key={idx} onClick={item.onClickHandler}>
                                                    {item.label}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        } else if (link.type === "download") {
                            return (
                                <li key={index}>
                                    <a href={link.href} download>
                                        <img
                                            src={link.iconSrc}
                                            alt={`${link.label} Icon`}
                                            className="menu-icon"
                                        />
                                    </a>
                                </li>
                            );
                        } else if (link.type === "link") {
                            return (
                                <li key={index} onClick={link.onClickHandler}>
                                        <img
                                            src={link.iconSrc}
                                            alt={`${link.label} Icon`}
                                            className="menu-icon"
                                        />
                                </li>
                            );
                        }
                        return null;
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default Header;