import "../util/App.css";

function About() {
    return (
        <div className="about-container">
            <div className="header">
                <p className="title">Envora - Sustainable Travel</p>
            </div>

            <div className="about-section">
                <h2 className="section-title">Mission</h2>
                <p className="mission-text">
                    At Envora, we aim to empower individuals to make sustainable choices by rewarding them and providing them with tools to track and reduce their carbon footprint. We aim to create a community of eco-conscious travelers, making sustainability easy, engaging, and impactful for everyone. 🌍✨
                </p>
            </div>

            <div className="about-section">
                <h2 className="section-title">Vision</h2>
                <p className="vision-text">
                    Our vision is to inspire a global movement of sustainable travel and living, where every individual is equipped to make mindful choices that protect the planet. We want to support a future where sustainability is the norm, not the exception. 🌱🌍
                </p>
            </div>
        </div>
    );
}

export default About;