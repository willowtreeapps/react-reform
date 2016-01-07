/*eslint func-style:0*/
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const links = [
	{ link: 'getting-started', title: 'Getting Started' },
	{ link: 'guides', title: 'Guides' },
	{ link: 'examples', title: 'Examples' },
	{ link: 'api', title: 'API' }
];

function scrollToId(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function renderSublinks(subLinks, activeSublink) {
    return <ul>
        {subLinks.map(({ title, link, subsections }) => {

            const formattedTitle = activeSublink === link ?
                                   <strong>{title}</strong> : title;

            return <li key={link}>
                <span className="a" onClick={scrollToId.bind(this, link)}>
                    {formattedTitle}
                </span>
                {subsections && renderSublinks(subsections, activeSublink)}
            </li>
        })}
    </ul>
}

export default function Sidebar({ subLinks=[], style, activePath, activeSublink }) {
    activePath = activePath.split('/').pop();

    const navLinks = links.map(({ link, title }) =>
        <li key={link}>
            <Link to={`/${link}`} activeClassName="active">
                {title}
            </Link>

            {activePath === link && renderSublinks(subLinks, activeSublink)}
        </li>
    );

    return <nav className="sidebar" style={style}>
		<ul>
            {navLinks}
		</ul>
    </nav>;
}

Sidebar.propTypes = {
    subLinks: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        link: PropTypes.string
    })).isRequired,
    style: PropTypes.object,
    activeSublink: PropTypes.string
};
